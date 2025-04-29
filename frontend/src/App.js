// Import Components
import Header from './components/Header';
import SoundCloudPlayer from './components/SoundCloudPlayer';
import TVEffect from './components/TVEffect';
import NewsletterForm from './components/NewsletterForm'

// Import CSS files
import './App.css';

// Import Hooks
import { HookNewsletterForm } from './hooks/HookNewsletterForm';

function App() {
  const { showForm, setShowForm } = HookNewsletterForm();

  return (
    <>
        
        <Header />
        <TVEffect setShowForm={setShowForm}/>
        {showForm && <NewsletterForm onClose={() => setShowForm(false)} />}
        <SoundCloudPlayer />
    </>
  );
}

export default App;
