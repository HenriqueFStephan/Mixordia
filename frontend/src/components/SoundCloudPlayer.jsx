import "../styles/SoundCloudPlayer.css"

const SoundCloudPlayer = () => {
    return (
      <div style={{ width: '100%', maxWidth: '400px', margin: '20px auto' }}>
        <iframe
          title="SoundCloud"
          width="25%"
          height="90"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          className="soundCloud"
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/mixordiamusic&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=false"
        ></iframe>
      </div>
    );
  };
  
  export default SoundCloudPlayer;
  