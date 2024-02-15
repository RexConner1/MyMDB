import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SearchBar from '../SearchBar/SearchBar';
import './MediaList.css'

class MediaList extends Component {
    render() {
        const properties = this.props.properties
        const path = this.props.location.pathname
        
        let detail
        if (path.includes(properties.haveWord)) {
            detail = (
                <div>
                    <h1>My Collection</h1>
                </div>
            )
        } else if (path.includes(properties.wantWord)) {
            detail = (
                <div>
                    <h1>My Wish List</h1>
                </div>
            )
        } else {
            detail = (
                <div>
                    <h1>Search</h1>
                    <div className="inputs">
                        <SearchBar className="input title" name="titleSearch" title="Title Search:" properties={properties} />
                        <form>
                            <button className="clear" onClick={properties.setSearchResults}>Clear Search</button>
                        </form>
                        <SearchBar className="input upc" name="upcSearch" title="UPC Search:" properties={properties} />
                    </div>
                </div>
            )
        }

        const linkAddress = this.props.location.pathname.includes(properties.haveWord) ? properties.haveWord + properties.linkWord : properties.linkWord
        const linksToMedia = this.props.media.map(item => (
            <div className="products" key={item.id}>
                <div className="product">
                    <img src={"https://image.tmdb.org/t/p/w780/" + item.poster_path} alt={item[properties.titleWord]} />
                    <p><Link to={`${linkAddress}/` + item.id}>{item[properties.titleWord]}</Link></p>
                </div>
            </div>
        ))

        return (
            <div>
                {detail}
                {linksToMedia}
            </div>
        );
    }
}

export default MediaList;