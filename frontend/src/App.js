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
      // Direct app open - let the OS handle fallback
      window.location.href = instagramApp;
      
      // Only fallback to web if user is still on page after 2.5 seconds
      // (meaning app didn't open)
      const fallbackTimer = setTimeout(() => {
        if (!document.hidden) {
          window.location.href = instagramWeb;
        }
      }, 2500);
      
      // Clean up timer if user leaves (app opened)
      window.addEventListener('blur', () => clearTimeout(fallbackTimer));
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
