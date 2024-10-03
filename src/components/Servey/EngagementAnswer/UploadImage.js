import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import svgIcons from '../../../assets/image/SVG/svg';
import getCroppedImg from '../../../utils'; // Import your utility function

const UploadImage = ({ uploadedImg, questAnswer, setQuestAnswer, IsMultiSelection, MaxSelectionOrUpload }) => {
  console.log(IsMultiSelection)
  const [images, setImages] = useState(Array(uploadedImg).fill(null));
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [countImg, setCountImg] = useState(0);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [file, setFile] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleImageUpload = (index) => {
    if (!IsMultiSelection && countImg === 1) {
      alert('You can only upload one image.');
      return;
    }

    if (IsMultiSelection && countImg === MaxSelectionOrUpload) {
      alert(`You can only upload up to ${MaxSelectionOrUpload} images.`);
      return;
    }

    setCurrentIndex(index);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFile(URL.createObjectURL(file));
        setCropperOpen(true);
      }
    };
    input.click();
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    if (file && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(file, croppedAreaPixels);
      const newImages = [...images];
      newImages[currentIndex] = croppedImage;
      setImages(newImages);
      setCropperOpen(false);
      setFile(null);
      setCroppedAreaPixels(null);
      setCountImg(prevCount => prevCount + 1); // Increment the count of uploaded images
    }
  };

  const cancelCrop = () => {
    setCropperOpen(false);
    setFile(null);
    setCroppedAreaPixels(null);
  };

  return (
    <>
      <p style={{ color: '#06182C66' }}>
        {countImg}/{IsMultiSelection ? MaxSelectionOrUpload : 1} images (max. 15MB)
      </p>
      <div className='uploade-image'>
        {images.map((image, index) => (
          <div
            className='uploade-container'
            key={index}
            onClick={() => handleImageUpload(index)}
          >
            {image ? (
              <img
                src={image}
                alt={`Uploaded ${index}`}
                style={{
                  width: '100%', // Ensure the image takes full width of the container
                  height: '100%', // Ensure the image takes full height of the container
                  objectFit: 'cover', // Crop the image to fit the container
                }}
              />
            ) : (
              <div className='circle'>
                <div dangerouslySetInnerHTML={{ __html: svgIcons.blankImage }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {cropperOpen && (
        <div className='cropper-modal'>
          <div className='cropper-container'>
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              aspect={3 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
          <div className='controls'>
            <label htmlFor='zoom-slider'>Zoom: {Math.round(zoom * 100)}%</label>
            <input
              id='zoom-slider'
              type='range'
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              aria-labelledby="Zoom"
              className="zoom-range"
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ width: '100%' }} // Full width slider
            />
          </div>
          <div className='btn-container'>
            <button className='save-btn' onClick={saveCroppedImage}>Save</button>
            <button className='cancel-btn' onClick={cancelCrop}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadImage;
