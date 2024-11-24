import React, { useState } from 'react'
import '../CSS/AddProduct.css'
import { Link, useNavigate } from 'react-router-dom'
import plus_img from '../../Components/Assets/plus.png'

const AddProduct = () => {
    const navigate = useNavigate();
    const [ifshowTable, setIfShowTable] = useState(false);

    const addList = () => {
        const content = document.getElementById('Productlist');
        const reference = document.getElementById('add')
        const product = document.createElement('div');
        product.className = 'ProductItem';
        product.id = 'ProductItem';
        product.textContent = 'New Product';
        content.insertBefore(product, reference);
        setIfShowTable(false);
        // resetForm();
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
                        <div id='Productlist' className='ProductList'>
                            <Link id='add' to={'/ProductInformation'} src={plus_img}/>
                        </div>
                    </div>
                    <div className='AddProduct-ProductTable'>
                        <h> Product Table </h>
                        {/* {ifshowTable && (
                            // <div className='ProductTable'>
                            //     <input type="text" value={formValues.userCompanyName} onChange={(event) => handleChange('userCompanyName', event)} placeholder='Company name' />
                            //     <input type="text" value={formValues.userProductionName} onChange={(event) => handleChange('userProductionName', event)} placeholder='Product name' />
                            //     <input type="text" value={formValues.userProductPrice} onChange={(event) => handleChange('userProductPrice', event)} placeholder='Product price' />
                            //     <textarea value={formValues.userProductDescription} onChange={(event) => handleChange('userProductDescription', event)} placeholder='Product descrption' />
                            //     <button onClick = {addList}>Add to List</button>
                            // </div>
                        )} */}
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