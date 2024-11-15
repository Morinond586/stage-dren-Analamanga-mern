import React from 'react';
import './SearchBar.css';
import '../App.css'

function SearchBar() {
  return (
    <div className="search-bar">
        <form 
         className="search-form d-flex align-items-center"
         method="POST"
         action="#">
            <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search Keyword"
            />
            <button type="submit" title="search">
                <i className="bi bi-search"></i>
            </button>
         </form>
    </div>
  )
}

export default SearchBar