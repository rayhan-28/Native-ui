import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import svgIcons from '../../../assets/image/SVG/svg';
import getCroppedImg from '../../../utils'; // Import your utility function
import {useUploadImage} from '../../../hooks/useCloudinaryUpload'
import axios from 'axios';

const UploadImage = ({ uploadedImg, questAnswer, setQuestAnswer, IsMultiSelection, MaxSelectionOrUpload }) => {
  console.log(IsMultiSelection)
  const [images, setImages] = useState(Array(uploadedImg).fill(null));
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [countImg, setCountImg] = useState(0);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [isSavedClicked, setSavedClicked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [imageToUpload, setImageToUpload] = useState(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [newAssetToUpload, setNewAssetToUpload] = useState(null);
  const [uploadConfig, setUploadConfig] = useState(null);
  const email = "jahir.rayhan@bedatasolutions.com";
  const token = "4733788f-783d-455f-a2b7-3b1815e53196";

  const getNewAssetToUpload = async () => {
    try {
      const response = await axios.get('https://dev.api.pitch.space/api/assets/new', {
        params: {
          email: email,
          token: token
        }
      });
      if (response.status === 200) {
        setNewAssetToUpload(response.data);
        const publicId = response.data.publicId;
        await getUploadConfig(publicId)
      }
    } catch (err) {
      console.log('You are not valid');
    }
  };

  const getUploadConfig = async (publicId) => {
    try {
      publicId = encodeURIComponent(publicId);
      const response = await axios.get(`https://dev.api.pitch.space/api/assets/${publicId}/upload-config`, {
        params: {
          email: email,
          token: token
        }
      });
      if (response.status === 200) {
        console.log("Checking by misbah", response.data);
        setUploadConfig(response.data);
      }
    } catch (err) {
      console.log('You are not valid');
    }
  };

  useEffect(() => {
    if(imageToUpload) {
      getNewAssetToUpload();
    }
  }, [imageToUpload])

  const { uploadImage, isUploadingImage } = useUploadImage(
    imageToUpload,
    newAssetToUpload,
    uploadConfig,
    (r) => {
        if (r.wasSuccessful && imageToUpload) {
          //setImages([r?.url])
          setSavedClicked(false);
          setCropperOpen(false);
        } else if (!r.wasSuccessful) {
          console.log("error misbah = ",r.errorMessage);
          setSavedClicked(false);
          setCropperOpen(false);
        } else {
           console.log("Something went wrong, please try again later");
           setSavedClicked(false);
           setCropperOpen(false);
        }
    }
  );

   // Start uploading an image if necessary
   useEffect(() => {
        if (isSavedClicked && newAssetToUpload && uploadConfig && images) {
            uploadImage();
        }
    }, [images, isSavedClicked, uploadImage]);

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
        const fileType = file && file.type;
        setImageToUpload({
          url: URL.createObjectURL(file),
          fileType: fileType
        })
        setCropperOpen(true);
      }
    };
    input.click();
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    setSavedClicked(true);
    if (imageToUpload && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageToUpload?.url, croppedAreaPixels);
      const newImages = [...images];
      newImages[currentIndex] = croppedImage;
      setImages(newImages);
      setImageToUpload(null);
      setCroppedAreaPixels(null);
      setCountImg(prevCount => prevCount + 1); // Increment the count of uploaded images
    }
  };

  const cancelCrop = () => {
    setCropperOpen(false);
    setImageToUpload(null);
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
              image={imageToUpload?.url}
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
            <button className='save-btn' onClick={saveCroppedImage}>{isUploadingImage ? "Loading..." : "Save"}</button>
            <button className='cancel-btn' onClick={cancelCrop}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadImage;
