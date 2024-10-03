import { useState } from "react";
import {
  LightRoundedButton,
  DarkRoundedButton,
  Text,
  LoadingIcon,
} from "@components/MyQuests/atoms";
import { ImageSlider } from "@components/MyQuests/molecules";
import COLOR from "@components/constants/color";
import Cropper from "react-easy-crop";
import { ZIndex, phoneBreakpoint } from "@components/MyQuests/constants";
import getCroppedImg from "@services/cropImage";
import { CloseButton as _CloseButton } from "@components/atoms";
import './ImageCropOverlay.scss'; // Importing the SCSS file

const ImageCropOverlayWithoutTransparent = ({
  aspectRatio,
  inputImage,
  isSaving,
  onCancel,
  onCompleted,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.2);
  const [minZoom, setMinZoom] = useState(0.2);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  return (
    <div className="overlay">
      <div className="wrapper">
        <CloseButton className="close-button" crossStyle="dark" onClick={onCancel} />
        <Title className="title">Edit your image</Title>
        <div className="crop-wrapper">
          <Cropper
            image={inputImage.url}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            minZoom={minZoom}
            maxZoom={5}
            style={{ cropAreaStyle: { border: "3px dashed #ffffff" } }}
            restrictPosition={false}
            onMediaLoaded={(mediaSize) => {
              const longestSide = Math.max(
                mediaSize.naturalHeight,
                mediaSize.naturalWidth
              );
              const shortestSide = Math.min(
                mediaSize.naturalHeight,
                mediaSize.naturalWidth
              );
              setMinZoom(shortestSide / longestSide);
            }}
            onCropComplete={(_, caPx) => setCroppedAreaPixels(caPx)}
          />
        </div>
        <ImageSlider
          text="Test"
          zoom={zoom}
          onChange={(s) => setZoom(Number(s.target.value))}
        />
        <div className="button-wrapper">
          <PrimaryButton
            heightInPx={40}
            widthInPx={100}
            onClick={async () => {
              const croppedUrl = (await getCroppedImg(
                inputImage.url,
                croppedAreaPixels,
                inputImage.fileType
              ));
              onCompleted({ url: croppedUrl, fileType: inputImage.fileType });
            }}
          >
            {isSaving ? <LoadingIcon color={COLOR.WHITE} /> : "Save"}
          </PrimaryButton>
          <LightRoundedButton
            heightInPx={40}
            widthInPx={100}
            onClick={onCancel}
          >
            Cancel
          </LightRoundedButton>
        </div>
      </div>
    </div>
  );
};

export default ImageCropOverlayWithoutTransparent;
