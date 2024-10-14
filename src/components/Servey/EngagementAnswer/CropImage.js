export const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
  
      // Ensure the image is loaded before trying to crop
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
  
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        // Ensure crop exists and has valid width/height
        if (!crop || !crop.width || !crop.height) {
          return reject('Invalid crop dimensions');
        }
  
        // Draw the cropped image onto the canvas
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
  
        // Convert the canvas to a Blob and resolve the promise
        canvas.toBlob((blob) => {
          if (!blob) {
            reject('Canvas is empty');
            return;
          }
          blob.name = 'croppedImage.png';
          resolve(blob);
        }, 'image/png');
      };
  
      // Error handling in case the image fails to load
      image.onerror = (err) => {
        console.error('Failed to load the image', err);
        reject(err);
      };
    });
  };
  