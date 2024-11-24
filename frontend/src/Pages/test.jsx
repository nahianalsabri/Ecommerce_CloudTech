import React, { useState } from "react";

const ImageGallery = () => {
  const [images, setImages] = useState([]); // 用于存储图片的数组

  // 处理图片上传
  const handleImageUpload = (e) => {
    const files = e.target.files; // 获取上传的文件
    const newImages = Array.from(files).map((file) => {
      return URL.createObjectURL(file); // 将文件转换为 URL
    });
    setImages((prevImages) => [...prevImages, ...newImages]); // 将新图片添加到已有图片数组中
  };

  // 移除指定图片
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h3>Dynamic Image Gallery</h3>

      {/* 文件上传按钮 */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ marginBottom: "20px" }}
      />

      {/* 图片展示区域 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap", // 自动换行
          gap: "10px", // 图片间距
          justifyContent: "center", // 居中对齐
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "150px",
              height: "150px",
              overflow: "hidden",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={image}
              alt={`Uploaded ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // 图片自适应裁剪
              }}
            />
            <button
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

