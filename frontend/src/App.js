// Import Components
import Header from './components/Header';
import SoundCloudPlayer from './components/SoundCloudPlayer';
import TVEffect from './components/TVEffect';
import NewsletterForm from './components/NewsletterForm'
import Overlay from './components/Overlay';

// Import CSS files
import './App.css';

// Import Hooks
import { HookNewsletterForm } from './hooks/HookNewsletterForm';

function App() {
  const { 
    showForm, setShowForm, 
    showImages, setShowImages, 
    name, setName,
    age, setAge,
    country, setCountry,
    email, setEmail,    
    followerData } = HookNewsletterForm();
  
  
  return (
    <>
        <Header />
        <TVEffect setShowForm={setShowForm} setShowImages={setShowImages}/>
        {showForm && <NewsletterForm 
            setShowForm={setShowForm}
            name={name}
            setName={setName}
            age={age}
            setAge={setAge}
            country={country}
            setCountry={setCountry}
            email={email}
            setEmail={setEmail} />}

        <SoundCloudPlayer />

        {/* {showImages && <Overlay />} */}
    </>
  );
}

export default App;
