// Import Components
import Header from './components/Header';
import SoundCloudPlayer from './components/SoundCloudPlayer';
import TVEffect from './components/TVEffect';
import NewsletterForm from './components/NewsletterForm';
import Overlay from './components/Overlay';

// Import CSS files
import './App.css';

// Import Hooks
import { HookNewsletterForm } from './hooks/HookNewsletterForm';

function App() {
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

      citySuggestions,     // ⬅ new

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
