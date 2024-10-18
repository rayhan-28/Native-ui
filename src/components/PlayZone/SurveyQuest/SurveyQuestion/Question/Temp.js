import React, { useCallback, useState, useEffect } from 'react';
import svgIcons from '../../../assets/image/SVG/svg';
import Cropper from 'react-easy-crop';
import {getCroppedImg} from './CropImage';
import { useUploadImage } from '../../../hooks/useCloudinaryUpload';
import axios from 'axios';

const Temp = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [newAssetToUpload, setNewAssetToUpload] = useState(null);
  const [uploadConfig, setUploadConfig] = useState(null);

  const email = "jahir.rayhan@bedatasolutions.com";
  const token = "4733788f-783d-455f-a2b7-3b1815e53196";
  
  // Fetch new asset to upload (step 1)
  const getNewAssetToUpload = async () => {
    try {
      const response = await axios.get('https://dev.api.pitch.space/api/assets/new', {
        params: { email, token }
      });
      if (response.status === 200) {
        const { publicId, cloudName } = response.data;
        setNewAssetToUpload({ publicId, cloudName });
        getUploadConfig(publicId); // Fetch the upload config after getting publicId
      }
    } catch (err) {
      console.log('Error fetching asset:', err);
    }
  };

  // Fetch upload configuration (step 2)
  const getUploadConfig = async (publicId) => {
    try {
      publicId = encodeURIComponent(publicId);
      const response = await axios.get(`https://dev.api.pitch.space/api/assets/${publicId}/upload-config`, {
        params: { email, token }
      });
      if (response.status === 200) {
        setUploadConfig(response.data);
      }
    } catch (err) {
      console.log('Error fetching upload config:', err);
    }
  };

  // Image change handler
  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Handle cropping the image
  const cropImage = async () => {
    try {
      if (croppedAreaPixels && image) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        return croppedImage;
      } else {
        console.error("Image or cropped area pixels are missing");
      }
    } catch (e) {
      console.error("Error cropping the image", e);
    }
  };
  

  // Callback for the Cloudinary upload result
  const onCompleted = (result) => {
    if (result.wasSuccessful) {
      console.log("Image uploaded successfully:", result.publicId);
    } else {
      console.error("Error uploading image:", result.errorMessage);
    }
  };

  // Use upload hook
  const { uploadImage, isUploadingImage } = useUploadImage(image,
     newAssetToUpload,
      uploadConfig, 
      onCompleted
 );

  // Save handler (step 3)
  const handleSave = async () => {
    const croppedImage = await cropImage(); // Get cropped image
    if (croppedImage && newAssetToUpload && uploadConfig) {
      setImage(croppedImage); // Set the cropped image for upload
      uploadImage(); // Upload to Cloudinary
    } else {
      console.log('Upload config or new asset not ready');
    }
  };

  // Cancel handler
  const handleCancel = () => {
    setImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  // Fetch asset on component mount
  useEffect(() => {
    getNewAssetToUpload();
  }, []); // Runs once when the component mounts
  // console.log("newAssetToUpload ",newAssetToUpload)
  // console.log("uploadConfig ",uploadConfig);
  return (
    <div className='temp-top'>
      <div className='temp-container'>
        <div className='image-container' onClick={() => document.getElementById('fileInput').click()}>
          {image ? (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <div className='placeholder-image' dangerouslySetInnerHTML={{ __html: svgIcons.blankImage }} />
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          style={{ display: 'none' }}
        />
      </div>
      {image && (
        <div className='controls'>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <button onClick={handleSave} disabled={isUploadingImage}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Temp;
