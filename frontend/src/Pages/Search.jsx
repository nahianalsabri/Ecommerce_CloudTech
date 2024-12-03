import React from 'react'
import { useLocation } from 'react-router-dom';
import SearchList from '../Components/SearchList/SearchList';
import Pagination from '../Components/Pagination/Pagination';   

const Search = () => {
    const location = useLocation();
    const searchResult = location.state;
    return (
      <div>
        <div>
            <SearchList searchResult={searchResult}/>
            <Pagination searchResult={searchResult}/>
        </div>
      </div>
    );
}

export default Search