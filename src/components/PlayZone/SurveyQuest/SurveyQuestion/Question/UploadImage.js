import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import SurveyQuestionImageUploadSvgIcon from "../../../../../assets/image/SVG/SurveyQuestionImageUpload/SurveyQuestionImageUpload";
import getCroppedImg from "../../../../../utils"; // Import your utility function
import { useUploadImage } from "../../../../../hooks/useCloudinaryUpload";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useAuth } from "../../../../../context/AuthContext";

const UploadImage = ({
  uploadedImg,
  questAnswer,
  setQuestAnswer,
  IsMultiSelection,
  MaxSelectionOrUpload,
  idx,
  email,
}) => {
  const [images, setImages] = useState(Array(uploadedImg).fill(null));
  const [imagePublicId, setImagePublicId] = useState([]);
  const [publicIdGenLink, setPublicIdGenLink] = useState("");
  const [currIdx, setCurrentIdx] = useState(null);
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
  const [tempImageToUpload, setTempImageToUpload] = useState(null);
  const [singleQAnswer, setSingleAnswer] = useState({
    TextAnswer: "",
    ImageMultiChoice: "",
    TextMultiChoice: "",
    YesNo: "",
    Rate: "",
    UploadedImage: "",
    ReplyWithLink: "",
    TextChoicePoll: "",
    ImageChoicePoll: "",
  });

  const { token } = useAuth();

  const getNewAssetToUpload = async () => {
    try {
      const response = await axios.get(
        "https://dev.api.pitch.space/api/assets/new",
        {
          params: {
            email: email,
            token: token,
          },
        }
      );
      if (response.status === 200) {
        setNewAssetToUpload(response.data);
        const publicId = response.data.publicId;
        await getUploadConfig(publicId);
      }
    } catch (err) {
      console.log("You are not valid");
    }
  };

  const getUploadConfig = async (publicId) => {
    try {
      publicId = encodeURIComponent(publicId);
      const response = await axios.get(
        `https://dev.api.pitch.space/api/assets/${publicId}/upload-config`,
        {
          params: {
            email: email,
            token: token,
          },
        }
      );
      if (response.status === 200) {
        console.log("Checking by misbah", response.data);
        setUploadConfig(response.data);
      }
    } catch (err) {
      console.log("You are not valid");
    }
  };

  useEffect(() => {
    if (imageToUpload) {
      getNewAssetToUpload();
    }
  }, [imageToUpload]);

  useEffect(() => {
    const updatedAnswers = [...questAnswer];
    
    if (!updatedAnswers[idx]) {
      updatedAnswers[idx] = { ...singleQAnswer };
      setQuestAnswer(updatedAnswers);
    }
    if (questAnswer[idx]?.UploadedImage) {
      const selectedUrls = questAnswer[idx].UploadedImage.split(',');
      setImagePublicId(selectedUrls);
      selectedUrls.forEach((url, index)=> {
        images[index] = url;
      });
    }
  }, [questAnswer,idx,setQuestAnswer,singleQAnswer]);



  const { uploadImage, isUploadingImage } = useUploadImage(
    imageToUpload,
    newAssetToUpload,
    uploadConfig,
    (r) => {
      if (r.wasSuccessful && imageToUpload) {
        setSavedClicked(false);
        setCropperOpen(false);
        if (imagePublicId[currIdx]) {
          imagePublicId[currIdx] = r.publicId;
          setImagePublicId([...imagePublicId]);

          const updatedSingleQAnswer = {
            ...singleQAnswer,
            UploadedImage: imagePublicId.join(","),
          };
          setSingleAnswer(updatedSingleQAnswer);
          setTimeout(() => {
            const updatedAnswers = [...questAnswer];
            updatedAnswers[idx] = updatedSingleQAnswer;
            setQuestAnswer(updatedAnswers);
          }, 0);

        } else {
          setImagePublicId((prevPublicIds) => {
            const newPublicIds = [...prevPublicIds];
            newPublicIds[currIdx] = r.publicId; // Set new publicId at the replaced index
            const updatedSingleQAnswer = {
              ...singleQAnswer,
              UploadedImage: newPublicIds.join(","),
            };
            setSingleAnswer(updatedSingleQAnswer);
            setTimeout(() => {
              const updatedAnswers = [...questAnswer];
              updatedAnswers[idx] = updatedSingleQAnswer;
              setQuestAnswer(updatedAnswers);
            }, 0);
            console.log("first call .....");

            return newPublicIds;
          });
        }
        setPublicIdGenLink(imagePublicId.join(","));
      } else if (!r.wasSuccessful) {
        setSavedClicked(false);
        setCropperOpen(false);
      } else {
        setSavedClicked(false);
        setCropperOpen(false);
      }
    }
  );
  // Start uploading an image if necessary
  useEffect(() => {
    if (isSavedClicked && images[currentIndex]) {
      if (!isUploadingImage) {
        uploadImage();
      }
    }
  }, [isSavedClicked, uploadImage, currentIndex, isUploadingImage]);

  const handleImageUpload = (index) => {
    setCurrentIdx(index);
    if (images[index]) {
      setTempImageToUpload(images[index]);
    }

    setCurrentIndex(index);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileType = file && file.type;
        setImageToUpload({
          url: URL.createObjectURL(file),
          fileType: fileType,
        });
        console.log("hlw cropped");
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
      const croppedImage = await getCroppedImg(
        imageToUpload?.url,
        croppedAreaPixels
      );

      // Create a file-like object from the cropped image
      const imageResponse = await fetch(croppedImage);
      const imageData = await imageResponse.blob();
      const croppedFile = new File([imageData], "croppedImage.png", {
        type: "image/png",
      });

      const newImages = [...images];
      newImages[currentIndex] = croppedImage;
      setImages(newImages);
      // Store the cropped image in the upload state
      setImageToUpload({
        url: URL.createObjectURL(croppedFile),
        fileType: "image/png",
      });

      console.log("hllw labib");

      setTempImageToUpload(null);
      setCroppedAreaPixels(null); // Increment the count of uploaded images
    }
  };

  const cancelCrop = () => {
    setCropperOpen(false);
    setImageToUpload(null);
    setTempImageToUpload(null);
    setCroppedAreaPixels(null);
  };

  const cld = new Cloudinary({
    cloud: {
      cloudName: "pitchspace",
    },
    url: {
      secure: true,
    },
  });

  return (
    <>
      <p style={{ color: "#06182C66" }}>
        {countImg}/{IsMultiSelection ? MaxSelectionOrUpload : 1} images (max.
        15MB)
      </p>
      <div className="uploade-image">
        {images.map((image, index) => (
          <div
            className="uploade-container"
            key={index}
            onClick={() => handleImageUpload(index)}
          >
            {image ? (
              <>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <AdvancedImage
                    cldImg={cld.image(imagePublicId[index])}
                    style={{
                      width: "100%", // Full width of the container
                      height: "100%", // Full height of the container
                      objectFit: "cover", // Ensure the image covers the container
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="circle">
                <div
                  dangerouslySetInnerHTML={{
                    __html: SurveyQuestionImageUploadSvgIcon.blankImage,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {cropperOpen && (
        <div className="cropper-modal">
          <div
            style={{
              width: "auto",
              minWidth: "375px",
              height: "auto",
              marginRight: "13px",
              background: "rgb(255, 255, 255)",
              borderRadius: "20px",
              position: "relative",
            }}
          >
            <p style={{ margin: "40px auto", textAlign: "center" }}>
              Upload image
            </p>
            <div
              style={{
                position: "relative",
                width: "82%",
                height: "350px",

                margin: "30px auto 0px",
              }}
            >
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
            <div
              style={{
                width: "80%",
                margin: "0px auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "baseline",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: SurveyQuestionImageUploadSvgIcon.image,
                }}
              />
              <div className="controls">
                <input
                  id="zoom-slider"
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  aria-labelledby="Zoom"
                  className="zoom-range"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  style={{ width: "100%" }} // Full width slider
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: SurveyQuestionImageUploadSvgIcon.image2,
                }}
              />
            </div>

            <div className="btn-container-cropper">
              <button className="save-btn" onClick={saveCroppedImage}>
                {isUploadingImage ? "Loading..." : "Save"}
              </button>
              <button className="cancel-btn" onClick={cancelCrop}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadImage;
