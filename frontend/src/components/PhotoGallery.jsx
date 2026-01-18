import { useEffect, useState } from "react";
import "../styles/PhotoGallery.css";

const PhotoGallery = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Local images for now (from public/files/images)
  // Replace these URLs later with your Google Drive direct links:
  // https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
  const images = [
    "/files/images/adfbafbarbafbds.jpg",
    "/files/images/adfbfafbfavarbavfav.jpg",
    "/files/images/afiabfabsoaifn.jpg",
    "/files/images/Artboard%202.jpg",
    "/files/images/asdasasavasasfasfasd.jpg",
    "/files/images/asdasdasasa.avif",
    "/files/images/asdasdasd.jpg",
    "/files/images/asdasdasdasd.avif",
    "/files/images/asdsadadadasdasdsa.jpg",
    "/files/images/asvasvasvaxvxavqvqvava.jpg",
    "/files/images/Avatar%201.jpg",
    "/files/images/background.jpg",
    "/files/images/bqtbwtbwrbrw.jpg",
    "/files/images/dasdasdadsdads.jpg",
    "/files/images/dasvasvaasd.jpg",
    "/files/images/fabfdbagabfbaf.jpg",
    "/files/images/imagesavasvasvasvs.jpg",
    "/files/images/rwqvqe.jpg",
    "/files/images/vasvasvasvasvasvasv.jpg",
    "/files/images/vavavavava.jpg",
    "/files/images/wnryynafbfdbsj.jpg",
  ];

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

  const tileCount = 120;
  const tiledImages = Array.from({ length: tileCount }, (_, i) => images[i % images.length]);

  return (
    <>
      <div className="photo-gallery-in-screen">
        <div className="photo-gallery-container">
          <button className="gallery-close-btn" onClick={onClose}>
            ✕
          </button>

          <div className="gallery-grid">
            {tiledImages.map((img, index) => (
              <button
                key={index}
                className="gallery-grid-item"
                onClick={() => openImage(index % images.length)}
                aria-label={`Open image ${index + 1}`}
              >
                <img src={img} alt={`Gallery ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedIndex !== null && (
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
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
