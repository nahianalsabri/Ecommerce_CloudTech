import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrderList } from "../../Components/Registration/user";
import "../CSS/OrderManagement.css";

const OrderManagement = () =>{
    const [orderDisplay, setOrderDisplay] = useState(false)
    const [orderList, setOrderList] = useState([
        [
            {
                "name": "Type 1",
                "price": 50,
                "quantity": 3,
                "total_price": 150,
                "image": "/static/media/product_1.5a757396ee7ff5dd91c1.png"
            },
            {
                "name": "Type 2",
                "price": 85,
                "quantity": 2,
                "total_price": 170,
                "image": "/static/media/product_2.d4e74f367160ec10fb34.png"
            }
        ],
        [
            {
                "name": "Type 12",
                "price": 85,
                "quantity": 1,
                "total_price": 85,
                "image": "/static/media/product_12.f0cbe3b14beeee568f3a.png"
            },
            {
                "name": "Type 14",
                "price": 85,
                "quantity": 1,
                "total_price": 85,
                "image": "/static/media/product_14.097d9d7b9f1c85e4e293.png"
            },
            {
                "name": "Type 35",
                "price": 85,
                "quantity": 1,
                "total_price": 85,
                "image": "/static/media/product_35.073b8b5de77cfc979821.png"
            }
        ]
    ]);
    
    const displayOrder = (list) =>{
        const content = document.getElementById('OrderContent');
        content.innerHTML = '';
        list.map((item,_) => {
            const product = document.createElement('div');
            product.className = 'Content';
            
            const image = document.createElement('img'); 
            const c1 = document.createElement('p');
            const c2 = document.createElement('p');
            const c3 = document.createElement('p');
            const c4 = document.createElement('p');
            image.src = item.image;
            c1.textContent = `${item.name}`
            c2.textContent = `$${item.price}`
            c3.textContent = `${item.quantity}`
            c4.textContent = `$${item.total_price}`

            product.appendChild(image);
            product.appendChild(c1);
            product.appendChild(c2);
            product.appendChild(c3);
            product.appendChild(c4);
            content.appendChild(product);
        });
    };
    return(
        <div className="OrderManagement">
            <div className="OrderManagement-container">
                <h1> Order Management </h1>
                <div className="OrderManagement-WorkingZone">
                    <div className="OrderManagement-list">
                        <h> order list </h>
                        {
                        <div className="OrderList">
                            {orderList.map((list, index) => (
                                <div id={index} onClick={()=>{displayOrder(list)}} className="List">
                                    order {index}
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                    <div className="OrderManagement-content">
                        <h> order content </h>
                        <div className="OrderContent-format-main">
                                <p>Products</p>
                                <p>Title</p>
                                <p>Price</p>
                                <p>Quantity</p>
                                <p>Total</p>
                        </div>
                        <div id="OrderContent" className="OrderContent">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManagement;