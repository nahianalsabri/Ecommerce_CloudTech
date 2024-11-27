import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrderList } from "../../Components/Registration/user";
import "../CSS/OrderManagement.css";

const OrderManagement = () =>{
    const orderList = getOrderList();
    
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
                                (<div id={index} onClick={()=>{displayOrder(list)}} className="List">
                                    order {index}
                                </div>)
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