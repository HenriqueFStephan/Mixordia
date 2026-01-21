import "../styles/Overlay.css"

import importAll from "./functions/importAll";

const Overlay = () => {


    const photos = importAll(
        require.context("../../public/files/images", false, /\.(png|jpe?g|svg)$/)
    );

  return (
    <div className="overlayWrapper">
        <div className="overlay">

            {photos.map((photo, idx) => (
            <div key={idx} className="photo-item">

                <img src={`/files/images/${photo.name}`} alt={photo.name || 'Photo'}/>

            </div>
            ))}

        </div>
    </div>
  );
};

export default Overlay;
