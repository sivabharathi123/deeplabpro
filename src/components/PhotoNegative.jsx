import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";

const PhotoNegative = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  const convertToNegative = () => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
      }
      ctx.putImageData(imageData, 0, 0);
    };
  };

  return (
    <div>
      <h2>Photo Negative Converter</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && (
        <>
          <canvas ref={canvasRef}></canvas>
          <button onClick={convertToNegative}>Convert to Negative</button>
        </>
      )}
    </div>
  );
};

export default PhotoNegative;
