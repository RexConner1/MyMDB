import React from 'react';
import axios from 'axios';

function SearchBar(props) {
    const searchForTitle = async(title) => {
        const response = await axios.get(`https://api.themoviedb.org/3/search/${props.properties.apiWord}?api_key=66b22cb2598318b06f69e25cb751c2ad&query=${title}`)
        console.log(response.data.results)
        props.properties.setSearchResults(response)
    }

    const searchForUPC = async(upcNumber) => {
        const response = await axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.upcdatabase.org/product/${upcNumber}?apikey=2F1653F46E6223E30135DB3D80B8C22D`,
            headers: { 
                "Access-Control-Allow-Origin": "*",
                'x-apikey': '2F1653F46E6223E30135DB3D80B8C22D',
                'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
        console.log(response.data)
        const title = refineTitleFromUPCResponseData(response.data)
        searchForTitle(title)
    }

    const refineTitleFromUPCResponseData = (response) => {
        let title
        if (response.title || response.descrption) {
            title = response.title ? response.title : response.description
            title = title.split(" ")

            let newTitle = ""
            let turnOffSelect = false
            title.forEach(word => {
                let ignore = false
                if (word.toUpperCase() === word || /Blu-ray|Digital|DVD/.test(word)) {
                    ignore = true
                } else if (word.includes('(')) {
                    turnOffSelect = true
                } else if (word.includes(')')) {
                    ignore = true
                    turnOffSelect = false
                } 
                
                if (!ignore && !turnOffSelect) {
                   newTitle = newTitle.concat(newTitle ? " " : "", word)
                }
            })

            title = newTitle
        } else {
            title = false
        }
        return title
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (e.target[props.name].value) {
                    const functionToRun = props.name === "titleSearch" ? searchForTitle : searchForUPC
                    functionToRun(e.target[props.name].value)
                }
            }}>
                <label htmlFor={props.name}>{props.title}</label>
                <input name={props.name} id={props.name} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchBar;