import React from 'react'
import axios from 'axios';
import { useNavigate, useLocation} from 'react-router-dom';
import './Pagination.css'

const Pagination = (prop) => {
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = process.env.REACT_APP_API_URL;
    const queryParams = new URLSearchParams(location.search);
    const currentPage = Number(queryParams.get("pageNo") || 0);
    const searchParam = (queryParams.get("name") || 0);
    
    const {searchResult} = prop;

    const TotalPages = () => {
        const maxPage = searchResult.length/20;
        let i = 1;
        let pageList = [];
        while (i < maxPage+1){
            pageList.push(i);
            i+=1;
        }
        return pageList;
    }

    const shift = async(searchResult, index) => {
        window.scrollTo(0,0);
        navigate(`/search?name=${searchParam}&pageNo=${index}&limit=${20}`, 
            { state: []}); 
        try {
          const response = await axios.get(`${baseURL}/user/search?name=${searchParam}&pageNo=${index}&limit=${20}`);
          console.log(response.data.products); 
          searchResult = response.data.products;
        } catch (error) {
        }
        navigate(`/search?name=${searchParam}&pageNo=${index}&limit=${20}`, 
                { state: searchResult}); 
    }

    const pageList = TotalPages();

    return(
        <div className='Pagination'>
            <div className='Pagination-container'>
                <h2>Pagination</h2>
            </div>
            <div className='Pagination-container'>
                {(pageList.length>1 && currentPage>1) && (
                    <div className='index' onClick={() => {shift(searchResult, currentPage-1)}}>prev</div>)}
                {pageList.map((index) =>{
                    if(index === 1 || index === pageList.length ||
                        (index < currentPage+2 && index > currentPage-2)
                    ){
                        return (<div className='index' onClick={() => {shift(searchResult, index)}}>{index}</div>)
                    }else if(index === 2 || index === pageList.length-1){
                        return (<p>...</p>)
                    }
                })}
                {(pageList.length>1 && currentPage<pageList.length) && (
                    <div className='index' onClick={() => {shift(searchResult, currentPage+1)}}>next</div>)}
            </div>
        </div>
    )
}

export default Pagination