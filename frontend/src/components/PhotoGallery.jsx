import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/PhotoGallery.css";

const PhotoGallery = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from backend on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/images');
        const data = await response.json();
        
        console.log('API Response:', data); // Debug log
        
        if (data.success) {
          // Prepend backend URL to each image URL
          const imageUrls = data.images.map(img => `http://localhost:5000${img.url}`);
          console.log('Image URLs:', imageUrls); // Debug log
          setImages(imageUrls);
          setError(null);
        } else {
          setError(data.error || 'Failed to load images');
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to connect to backend');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openImage = (index) => {
    setCurrentIndex(index);
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
    document.body.classList.remove('lightbox-open');
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (selectedIndex !== null) {
          closeImage();
        } else {
          onClose();
        }
      }
      if (event.key === "ArrowRight" && selectedIndex !== null) nextImage();
      if (event.key === "ArrowLeft" && selectedIndex !== null) prevImage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, onClose]);

  // Add/remove class when lightbox opens/closes
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.classList.add('lightbox-open');
    }
    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [selectedIndex]);

  // Show loading state
  if (loading) {
    return (
      <div className="photo-gallery-in-screen">
        <div className="photo-gallery-container">
          <button className="gallery-close-btn" onClick={onClose}>
            ✕
          </button>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            color: 'white',
            fontSize: '1.5rem'
          }}>
            Loading images...
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="photo-gallery-in-screen">
        <div className="photo-gallery-container">
          <button className="gallery-close-btn" onClick={onClose}>
            ✕
          </button>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            color: 'red',
            fontSize: '1.2rem',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div>Error: {error}</div>
            <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
              Make sure the backend server is running
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="photo-gallery-in-screen">
        <div className="photo-gallery-container">
          <button className="gallery-close-btn" onClick={onClose}>
            ✕
          </button>

          <div className="gallery-grid">
            {images.map((img, index) => (
              <button
                key={index}
                className="gallery-grid-item"
                onClick={() => openImage(index)}
                aria-label={`Open image ${index + 1}`}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${index + 1}`}
                  onError={(e) => {
                    console.error('Failed to load image:', img);
                    e.target.style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('Image loaded:', img)}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedIndex !== null && createPortal(
        <div className="gallery-lightbox" onClick={closeImage}>
          <div
            className="gallery-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="gallery-lightbox-close" onClick={closeImage}>
              ✕
            </button>

            <button className="gallery-lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              ‹
            </button>

            <img
              src={images[selectedIndex]}
              alt={`Gallery ${selectedIndex + 1}`}
              className="gallery-lightbox-image"
            />

            <button className="gallery-lightbox-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              ›
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PhotoGallery;
