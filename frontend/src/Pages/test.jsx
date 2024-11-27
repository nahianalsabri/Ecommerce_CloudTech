import React, { useState, useEffect } from "react";

const ImageCarousel = () => {
  const images = [
    "https://via.placeholder.com/600x300?text=Image+1",
    "https://via.placeholder.com/600x300?text=Image+2",
    "https://via.placeholder.com/600x300?text=Image+3",
    "https://via.placeholder.com/600x300?text=Image+4",
  ]; // 图片路径数组

  const [currentIndex, setCurrentIndex] = useState(0); // 当前图片索引
  const [isPlaying, setIsPlaying] = useState(true); // 是否自动播放

  // 切换到下一张图片
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 切换到上一张图片
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // 自动播放功能
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        nextSlide();
      }, 3000); // 每隔 3 秒切换一次
    }
    return () => clearInterval(timer); // 清除定时器
  }, [isPlaying]);

  return (
    <div
      style={{
        width: "600px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "Arial",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        {/* 图片容器 */}
        <div
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex * 100}%)`, // 平移显示当前图片
            transition: "transform 0.5s ease", // 平滑过渡效果
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "600px",
                height: "300px",
                objectFit: "cover",
                flexShrink: 0, // 防止图片收缩
              }}
            />
          ))}
        </div>
      </div>

      {/* 切换按钮 */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        &#8250;
      </button>

      {/* 自动播放控制 */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            padding: "10px 20px",
            backgroundColor: isPlaying ? "#007bff" : "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;


