import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import p36_img from "../Assets/product_36.png";
import './SearchList.css'

const SearchList = (prop) => {
    const {searchResult} = prop;
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = (queryParams.get("pageNo") || 0);
    const Max_ProductDisplay = (queryParams.get("limit") || 0);
    const clickProduct = (id) => {
        console.log(id);
        navigate(`/product/${id}`)
    }
    
    console.log(searchResult);
    return(
        
        <div className='SearchList'>             
            {searchResult.length === 0 && (  
                <div style={{alignSelf: "flex-start", padding: "100px"}}>
                    <h1>loading...</h1>
                </div>)
            }
            <div className="SearchList-container">
                {searchResult.map((item, i) => {
                    if((i < Max_ProductDisplay * currentPage) && (i >= Max_ProductDisplay * (currentPage-1))){
                        return(<div className='SearchList-item'>
                            <img onClick={()=>{clickProduct(item.id)}} src={p36_img}/>
                            {/* <img onClick={()=>{clickProduct(item.id)}} src={item.profilePic}/> */}
                            <p>{item.id}: {item.name}</p>
                            <p>${item.price}</p>
                            <p>tags: {item.tags}</p>
                            <p>category: {item.category}</p>
                        </div>)
                    }
                })}

            </div>
        </div>
    )
}

export default SearchList