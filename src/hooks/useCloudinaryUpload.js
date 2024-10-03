import { useCallback, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_ASSETS } from "@graphql/index";

// Function to upload an image to Cloudinary
export const uploadToCloudinary = async (config, file, onCompleted) => {
  const formData = new FormData();
  formData.append("api_key", config.apiKey);
  formData.append("timestamp", config.timestamp.toString());
  formData.append("signature", config.signature);
  formData.append("public_id", config.publicId);
  formData.append("file", file);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${config?.cloudName}/image/upload`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  console.log("This is the largeImageUpload response", response);
  const isSuccess = response.status >= 200 && response.status <= 299;
  const result = isSuccess
    ? { wasSuccessful: true }
    : {
        wasSuccessful: false,
        errorMessage:
          response.status === 400
            ? "That image was too large after transformation, please try a smaller image."
            : "Something went wrong, please try again.",
      };

  onCompleted(result);
};

/** Returns a function that uploads the image provided to Cloudinary, then calls the completion function provided. */
export const useUploadImage = (image, onCompleted) => {
  const [isUploading, setIsUploading] = useState(false);

  const onGetAssetCompleted = useCallback(
    async (assetData) => {
      console.log("This is imageUrl", image?.url);
      if (image) {
        // Get the image file
        const imageResponse = await fetch(image.url);
        const imageData = await imageResponse.blob();
        const metadata = { type: image.fileType };
        const fileTypeSplit = image.fileType
          ? image.fileType.split("/")
          : ["", "png"];
        const fileName = `upload.${fileTypeSplit[fileTypeSplit.length - 1]}`;
        const file = new File([imageData], fileName, metadata);

        // Create the cloudinary config
        const config = {
          publicId: assetData.getNewAssetToUpload?.publicId,
          cloudName: assetData.getNewAssetToUpload?.cloudName,
          apiKey: assetData.getNewAssetToUpload?.uploadConfig?.apiKey,
          signature: assetData.getNewAssetToUpload?.uploadConfig?.signature,
          timestamp: assetData.getNewAssetToUpload?.uploadConfig?.timestamp,
        };

        // Create the form data
        const formData = new FormData();
        formData.append("api_key", config.apiKey);
        formData.append("timestamp", config.timestamp.toString());
        formData.append("signature", config.signature);
        formData.append("public_id", config.publicId);
        formData.append("file", file);

        // Upload to Cloudinary
        const uploadUrl = `https://api.cloudinary.com/v1_1/${config?.cloudName}/image/upload`;

        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        // Deal with the response
        const isSuccess = response.status >= 200 && response.status <= 299;

        const result = isSuccess
          ? {
              wasSuccessful: true,
              publicId: config.publicId,
            }
          : {
              wasSuccessful: false,
              errorMessage:
                response.status === 400
                  ? "That image was too large after transformation, please try a smaller image."
                  : "Something went wrong, please try again.",
            };

        onCompleted(result);
        setIsUploading(false);
      }
    },
    [image, onCompleted]
  );

  const [getAssetData] = useLazyQuery(GET_MY_ASSETS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    onCompleted: onGetAssetCompleted,
  });

  const uploadImage = useCallback(() => {
    if (image) {
      setIsUploading(true);
      getAssetData();
    }
  }, [image, getAssetData]);

  return {
    uploadImage,
    isUploadingImage: isUploading,
  };
};
