import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postInformationToBackend } from "../../Components/Registration/registration";
import "../CSS/ProductInformation.css";

const AddProduct = () => {
  const initalValues = {
    images: null,
  };

  const [ProductTagsList, setTagList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const maximumTags = 10;
  const numberRegex = /^\d*\.?\d*$/;
  const [formValues, setFormValues] = useState({
    ProductName: "",
    ProductTags: "",
    ProductCategory: "",
    ProductPrice: "",
    ProductDescription: "",
    ProductImages: [],
  });
  const [inputCorrectnessCheck, setInputCorrectness] = useState({
    ifAnyEmpty: false, // Check if any empty input exists
    ifNumber: true,
    ifImageEmpty: false, // Check if image are not inserted
  });

  const handleChange = (name, event) => {
    const value = event.target.value;
    setFormValues((previousState) => {
      return { ...previousState, [name]: value };
    });
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = formValues.ProductTags.trim();
      if (
        value &&
        !ProductTagsList.includes(value) &&
        ProductTagsList.length < maximumTags
      ) {
        setTagList([...ProductTagsList, value]);
        setFormValues((previousState) => {
          return { ...previousState, ProductTags: "" };
        });
      } else if (ProductTagsList.includes(value)) {
        alert(`The tag "${value}" has already been added`);
      }
    }
  };
  const removeTag = (index) => {
    setTagList(ProductTagsList.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList([...imageList, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = (index) => {
    setImageList((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const Continue = async () => {
    const setIfAnyEmpty =
      formValues.ProductName.trim() === "" ||
      formValues.ProductCategory.trim() === "" ||
      formValues.ProductPrice.trim() === "" ||
      formValues.ProductDescription.trim() === "" ||
      ProductTagsList.length === 0;
    const setIfNumber =
      numberRegex.test(formValues.ProductPrice) &&
      Number(formValues.ProductPrice) > 0;
    const setIfImageEmpty = imageList.length === 0;
    setInputCorrectness({
      ifAnyEmpty: setIfAnyEmpty,
      ifNumber: setIfNumber,
      ifImageEmpty: setIfImageEmpty,
    });
    if (!setIfAnyEmpty && !setIfImageEmpty && setIfNumber) {
      const product_information = {
        productPics: imageList,
        name: formValues.ProductName,
        price: formValues.ProductPrice,
        tags: ProductTagsList,
        category: formValues.ProductCategory,
        description: formValues.ProductDescription,
      };
      const formData = new FormData();
      Object.keys(initalValues).forEach((key) => {
        if (key === "productPics") {
          for (let i = 0; i < imageList.length; i++) {
            formData.append(key, imageList[i]);
          }
        }
      });
      formData.append("productPics", imageList);
      formData.append("name", formValues.ProductName);
      formData.append("price", formValues.ProductPrice);
      formData.append("tags", JSON.stringify(ProductTagsList));
      formData.append("category", formValues.ProductCategory);
      formData.append("description", formValues.ProductDescription);
      const ifValid = await postInformationToBackend(
        "submitProduct",
        "seller",
        formData
      );
      if (ifValid) {
        navigate("/AddProduct");
      }
    }
  };

  const resetForm = () => {
    setFormValues({
      ProductName: "",
      ProductTags: "",
      ProductCategory: "",
      ProductPrice: "",
      ProductDescription: "",
      ProductImages: [],
    });
  };

  return (
    <div className="ProductInformation">
      <div className="ProductInformation-container">
        <h1> Product Information Table </h1>
        <div className="ProductInformation-workzone">
          <div className="ProductInformation-informaion">
            <div className="ProductTable">
              <input
                type="text"
                value={formValues.ProductName}
                onChange={(event) => handleChange("ProductName", event)}
                placeholder="Product name"
              />
              <p>
                Press Enter after each tag,{" "}
                {maximumTags - ProductTagsList.length} tags are remaining
              </p>
              <div className="ProductTags">
                {ProductTagsList.map((tag, index) => (
                  <div className="ProductTags-list">
                    <span>{tag}</span>
                    <button onClick={() => removeTag(index)}>&times;</button>
                  </div>
                ))}
                {ProductTagsList.length < maximumTags && (
                  <input
                    type="text"
                    onKeyDown={addTag}
                    value={formValues.ProductTags}
                    onChange={(event) => handleChange("ProductTags", event)}
                    placeholder="Product tags"
                  />
                )}
              </div>
              <input
                type="text"
                value={formValues.ProductCategory}
                onChange={(event) => handleChange("ProductCategory", event)}
                placeholder="Product category"
              />
              <input
                type="text"
                value={formValues.ProductPrice}
                onChange={(event) => handleChange("ProductPrice", event)}
                placeholder="Product price"
              />
              {!inputCorrectnessCheck.ifNumber && (
                <p style={{ color: "red" }}>
                  {" "}
                  The input price should be a valid number and greater than 0{" "}
                </p>
              )}
              <textarea
                value={formValues.ProductDescription}
                onChange={(event) => handleChange("ProductDescription", event)}
                placeholder="Product descrption"
              />
            </div>
          </div>
          <div className="ProductInformation-images">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <button
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              {" "}
              Add Image{" "}
            </button>
            <div className="images">
              {imageList.length === 0 &&
                !inputCorrectnessCheck.ifImageEmpty && <p>image zone</p>}
              {imageList.length === 0 && inputCorrectnessCheck.ifImageEmpty && (
                <p style={{ color: "red" }}>
                  {" "}
                  Please insert at least one image{" "}
                </p>
              )}
              {imageList.length > 0 && (
                <div className="images-display">
                  {imageList.map((image, index) => (
                    <div className="images-item">
                      <img src={image} alt={`Uploaded ${index}`} />
                      <button onClick={() => removeImage(index)}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ProductInformation-add">
          <button onClick={Continue}> Add to List </button>
          {inputCorrectnessCheck.ifAnyEmpty && (
            <p style={{ color: "red" }}>
              Please finish the table before submitting
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
