import { useCallback, useState } from "react";

export const useUploadImage = (image, newAssetToUpload, uploadConfig, onCompleted) => {
  console.log("image1 = " ,image);
  const [isUploading, setIsUploading] = useState(false);

   console.log("newAsset ",newAssetToUpload);
   console.log("uploadConfig ",uploadConfig)
  const onGetAssetCompleted = useCallback(async () => {
      console.log("image first 1",image)
      if (image && newAssetToUpload && uploadConfig) {
        console.log("Image checking by misbah 1 = ", image)
        // Get the image file
        const imageResponse = await fetch(image.url); 
        const imageData = await imageResponse.blob();
        const metadata = { type: image.fileType };
        const fileTypeSplit = image.fileType ? image.fileType.split("/") : ["", "png"];
        const fileName = `upload.${fileTypeSplit[fileTypeSplit.length - 1]}`;
        const file = new File([imageData], fileName, metadata);

        console.log("newAssetToUpload .... = ", newAssetToUpload);
        console.log("uploadConfig = ... ", uploadConfig);

        // Create the Cloudinary config 
        const config = {
          publicId: newAssetToUpload.publicId, 
          cloudName: newAssetToUpload.cloudName,
          apiKey: uploadConfig.apiKey,
          signature: uploadConfig.signature,
          timestamp: uploadConfig.timestamp,
        };
  
        // Create the form data
        const formData = new FormData();
        formData.append("api_key", config.apiKey);
        formData.append("timestamp", config.timestamp.toString());
        formData.append("signature", config.signature);
        formData.append("public_id", config.publicId);
        formData.append("file", file);

        console.log("Image checking by misbah 2 = ", image)

        // Upload to Cloudinary
        const uploadUrl = `https://api.cloudinary.com/v1_1/${config?.cloudName}/image/upload`;

        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        console.log("Image checking by misbah 3 = ", image)

        // Deal with the response
        const isSuccess = response.status >= 200 && response.status <= 299;

        const result = isSuccess
          ? ({
              wasSuccessful: true,
              publicId: config.publicId,
            })
          : ({
              wasSuccessful: false,
              errorMessage:
                response.status === 400
                  ? "That image was too large after transformation, please try a smaller image."
                  : "Something went wrong, please try again.",
            });

        onCompleted(result);
        console.log("Image checking by misbah 4 = ", image)
        setIsUploading(false);
      }
    },[image, onCompleted]);

  const uploadImage = useCallback(async () => {
    console.log("image ",image)
    if (image) {
      console.log("image checking ",image)
       setIsUploading(true);
       onGetAssetCompleted();
    }
  }, [image,onCompleted]);

  return {
    uploadImage,
    isUploadingImage: isUploading,
  };
};
