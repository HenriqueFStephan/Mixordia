// Temporary Instagram Redirect for Party Launch
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Detect if user is on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Instagram links
    const instagramApp = 'instagram://user?username=mixordiamusic'; // Opens in app
    const instagramWeb = 'https://www.instagram.com/mixordiamusic'; // Opens in browser
    
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
        <p>If you're not redirected, <a href="https://www.instagram.com/mixordiamusic" style={{color: '#fff'}}>click here</a></p>
      </div>
    </div>
  );
}

export default App;
  const {
      showForm,
      setShowForm,
      showImages,
      setShowImages,

      preferredContact,
      email,
      phone,
      cpf,
      fullName,
      birthDate,
      cityState,
      favoriteDrink,
      favoriteArtist,

      onPreferredContactChange,
      onEmailChange,
      onPhoneChange,
      onCpfChange,
      onFullNameChange,
      onBirthDateChange,
      onCityStateChange,
      onFavoriteDrinkChange,
      onFavoriteArtistChange,

      citySuggestions, 

      onSubmit,
    } = HookNewsletterForm();

  return (
    <>
      <Header />
      <TVEffect setShowForm={setShowForm} setShowImages={setShowImages} />

      {showForm && (
        <NewsletterForm
          setShowForm={setShowForm}
          onSubmit={onSubmit}
          preferredContact={preferredContact}
          email={email}
          phone={phone}
          cpf={cpf}
          fullName={fullName}
          birthDate={birthDate}
          cityState={cityState}
          favoriteDrink={favoriteDrink}
          favoriteArtist={favoriteArtist}
          onPreferredContactChange={onPreferredContactChange}
          onEmailChange={onEmailChange}
          onPhoneChange={onPhoneChange}
          onCpfChange={onCpfChange}
          onFullNameChange={onFullNameChange}
          onBirthDateChange={onBirthDateChange}
          onCityStateChange={onCityStateChange}
          onFavoriteDrinkChange={onFavoriteDrinkChange}
          onFavoriteArtistChange={onFavoriteArtistChange}
          citySuggestions={citySuggestions}
        />
      )}

      <SoundCloudPlayer />

      {/* {showImages && <Overlay />} */}
    </>
  );
}

export default App;
