// Temporary Instagram Redirect for Party Launch
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Detect if user is on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Instagram links
    const instagramApp = 'instagram://user?username=mixordiamusic';
    const instagramWeb = 'https://www.instagram.com/mixordiamusic';
    
    if (isMobile) {
      // Try to open Instagram app, fallback to web if app not installed
      window.location.href = instagramApp;
      setTimeout(() => {
        window.location.href = instagramWeb;
      }, 500);
    } else {
      // Desktop: redirect to Instagram web
      window.location.href = instagramWeb;
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <div>
        <h1>Redirecting to Mixordia Instagram...</h1>
        <p>If you are not redirected, <a href="https://www.instagram.com/mixordiamusic" style={{color: '#fff'}}>click here</a></p>
      </div>
    </div>
  );
}

export default App;
