import React, { useState } from "react";

const TestPage = () => {
  const [images, setImages] = useState([]);
  const onFileUploadImage = (e) => {
    setImages(e.target.files);
  };
  console.log("images", images);
  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onFileUploadImage}
      />

      {images
        ? [...images]?.map((item) => {
            return <img src={URL.createObjectURL(item)} width="200px" />;
          })
        : null}
    </>
  );
};

export default TestPage;
