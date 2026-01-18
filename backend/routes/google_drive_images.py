from flask import Blueprint, jsonify, send_file, Response
from googleapiclient.discovery import build
import os
from datetime import datetime, timedelta
import requests
from io import BytesIO

google_drive_bp = Blueprint('google_drive', __name__)

# Cache for images to minimize API calls
cache = {
    'images': [],
    'last_fetched': None,
    'cache_duration': timedelta(hours=1)  # Cache for 1 hour
}

# Cache for downloaded image files
image_file_cache = {
    # file_id: {'data': bytes, 'content_type': str, 'cached_at': datetime}
}

def get_google_drive_images():
    """
    Fetch images from Google Drive folder.
    Uses caching to minimize API requests - only fetches from API if cache is expired.
    """
    now = datetime.now()
    
    # Check if cache is valid
    if (cache['last_fetched'] and 
        cache['images'] and 
        now - cache['last_fetched'] < cache['cache_duration']):
        print("Returning cached images")
        return cache['images']
    
    # Fetch from Google Drive API
    api_key = os.getenv('GOOGLE_DRIVE_API_KEY')
    folder_id = os.getenv('GOOGLE_DRIVE_FOLDER_ID')
    
    if not api_key or not folder_id:
        raise ValueError("Missing Google Drive credentials in environment variables")
    
    try:
        # Build the Drive API service
        service = build('drive', 'v3', developerKey=api_key)
        
        # Query for image files in the specified folder
        query = f"'{folder_id}' in parents and (mimeType contains 'image/')"
        results = service.files().list(
            q=query,
            pageSize=100,
            fields="files(id, name, mimeType, thumbnailLink, webContentLink)"
        ).execute()
        
        files = results.get('files', [])
        
        # Format image URLs - use direct download link
        images = []
        for file in files:
            # Use backend proxy URL instead of direct Google Drive link
            image_url = f"/api/images/proxy/{file['id']}"
            images.append({
                'id': file['id'],
                'name': file['name'],
                'url': image_url,
                'thumbnailUrl': file.get('thumbnailLink', image_url)
            })
        
        print(f"Images fetched: {[{'name': img['name'], 'url': img['url']} for img in images]}")
        
        # Update cache
        cache['images'] = images
        cache['last_fetched'] = now
        
        print(f"Fetched {len(images)} images from Google Drive API")
        return images
    
    except Exception as e:
        print(f"Error fetching images from Google Drive: {str(e)}")
        # Return cached images if available, even if expired
        if cache['images']:
            print("Returning expired cache due to API error")
            return cache['images']
        raise

@google_drive_bp.route('/api/images', methods=['GET'])
def get_images():
    """
    Endpoint to get images from Google Drive.
    Returns cached images if available to minimize API calls.
    """
    try:
        images = get_google_drive_images()
        return jsonify({
            'success': True,
            'images': images,
            'count': len(images),
            'cached': cache['last_fetched'] is not None
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@google_drive_bp.route('/api/images/refresh', methods=['POST'])
def refresh_images():
    """
    Endpoint to force refresh the image cache.
    Use this when you add new images to the Drive folder.
    """
    try:
        # Clear cache to force refresh
        cache['last_fetched'] = None
        cache['images'] = []
        
        images = get_google_drive_images()
        return jsonify({
            'success': True,
            'message': 'Cache refreshed successfully',
            'images': images,
            'count': len(images)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@google_drive_bp.route('/api/images/proxy/<file_id>', methods=['GET'])
def proxy_image(file_id):
    """
    Proxy endpoint to serve Google Drive images and avoid CORS issues.
    Downloads the image from Google Drive and caches it in memory.
    Subsequent requests serve from cache for instant loading.
    """
    try:
        now = datetime.now()
        
        # Check if image is in cache and not expired (cache for 1 hour)
        if file_id in image_file_cache:
            cached = image_file_cache[file_id]
            if now - cached['cached_at'] < timedelta(hours=1):
                print(f"Serving cached image: {file_id}")
                return Response(
                    cached['data'],
                    mimetype=cached['content_type'],
                    headers={
                        'Cache-Control': 'public, max-age=3600',
                        'Access-Control-Allow-Origin': '*'
                    }
                )
        
        # Image not in cache or expired - fetch from Google Drive
        print(f"Downloading image from Google Drive: {file_id}")
        google_drive_url = f"https://drive.google.com/uc?export=download&id={file_id}"
        
        # Fetch the image from Google Drive
        response = requests.get(google_drive_url, timeout=10)
        
        if response.status_code == 200:
            # Get the content type from the response
            content_type = response.headers.get('Content-Type', 'image/jpeg')
            image_data = response.content
            
            # Store in cache
            image_file_cache[file_id] = {
                'data': image_data,
                'content_type': content_type,
                'cached_at': now
            }
            
            # Return the image with proper headers
            return Response(
                image_data,
                mimetype=content_type,
                headers={
                    'Cache-Control': 'public, max-age=3600',  # Cache for 1 hour
                    'Access-Control-Allow-Origin': '*'
                }
            )
        else:
            return jsonify({
                'success': False,
                'error': f'Failed to fetch image from Google Drive: {response.status_code}'
            }), response.status_code
    
    except Exception as e:
        print(f"Error proxying image {file_id}: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
