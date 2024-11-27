import React, { useState } from 'react'
import '../CSS/AddProduct.css'
import { Link, useNavigate } from 'react-router-dom'
import { getProductList, removeProductList } from '../../Components/Registration/registration'
import plus_img from '../../Components/Assets/plus.png'

const AddProduct = () => {
    const navigate = useNavigate();
    const productList = getProductList();
    console.log(productList)

    const showProduct = (index) => {
        // productPics: imageList,
        // name: formValues.ProductName,
        // price: formValues.ProductPrice,
        // tags: ProductTagsList,
        // category: formValues.category,
        // description: formValues.description,
        const product = productList[index];
        console.log(product);
        const table = document.getElementById("table");
        const button = document.getElementById("button");
        table.innerHTML = "";
        button.innerHTML = "";

        const table_img = document.createElement("div");
        table_img.className = 'table-img';
        const image = document.createElement("img");
        image.src = product.productPics[0];
        table_img.appendChild(image);

        const table_basicInfo = document.createElement("div");
        table_basicInfo.className = 'table-basicInfo';
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const p4 = document.createElement("p");
        p1.textContent = `name: ${product.name}`;
        p2.textContent = `price: $${product.price}`;
        p3.textContent = `category: ${product.category}`;
        let content = "tag: ";
        product.tags.map((item)=>{
            content += item + ", ";
        });
        p4.textContent = content;
        table_basicInfo.appendChild(p1);
        table_basicInfo.appendChild(p2);
        table_basicInfo.appendChild(p3);
        table_basicInfo.appendChild(p4);

        const title = document.createElement("h");
        const remove = document.createElement("button");
        title.textContent = "Product Table";
        remove.addEventListener("click", () => {
            removeProductList(index);
            navigate("/AddProduct");
        });
        remove.textContent = "remove";

        const table_description = document.createElement("div");
        table_description.className = 'table-description';
        table_description.textContent = product.description;
        
        table.appendChild(table_img);
        table.appendChild(table_basicInfo);
        table.appendChild(table_description);
        button.appendChild(title)
        button.appendChild(remove)
    }

    const Continue = () => {
        console.log("upload to backend");
        // navigate("/seller_login")
    }

    return(
        <div className='AddProduct'>
            <div className='AddProduct-container'>
                <h1> Add Product </h1>
                <br></br>
                <div className='AddProduct-WorkingZone'>
                    <div className='AddProduct-ProductList'>
                        <h> Product List </h>
                        <div className='ProductList'>
                            {productList.map((product, index) => (
                                <button id={index} onClick={()=>{showProduct(index)}} className = 'ProductItem'>
                                    {index}: {product.name}
                                </button>
                            ))}
                            <Link to={'/ProductInformation'}><img src={plus_img}/></Link>
                        </div>
                    </div>
                    <div id="AddProduct-ProductTable" className='AddProduct-ProductTable'>
                        <div id="button">
                            <h> Product Table </h>
                        </div>
                        <div id="table" className='table'></div>
                    </div>
                </div>
                <div className='Continue'>
                    <button onClick = {Continue}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct