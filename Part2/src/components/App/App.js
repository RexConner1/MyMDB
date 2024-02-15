import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import axios from 'axios';

import './App.css';
import Home from '../Home/Home'
import Navigation from '../Nav/Nav'
import MediaList from '../MediaList/MediaList'
import DetailPage from '../DetailPage/DetailPage'

class App extends Component {
  constructor() {
    super();
    this.mediaProps = {
      movie: {
        displayWord: 'Movies',
        searchWord: '/movies',
        linkWord: '/movie',
        haveWord: '/owned',
        wantWord: '/wish',
        apiWord: 'movie',
        titleWord: 'title',
        setSearchResults: this.setMovieSearchResults,
      },
      show: {
        displayWord: 'TV Shows',
        searchWord: '/shows',
        linkWord: '/show',
        haveWord: '/owned',
        wantWord: '/wish',
        apiWord: 'tv',
        titleWord: 'name',
        setSearchResults: this.setShowSearchResults,
      }
    }
    this.state = {
      mediaSelection: this.mediaProps.movie,
      listOfMovies: [
        {
          id: 24428,
          title: "The Avengers",
          poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
          backdrop_path: "/kwUQFeFXOOpgloMgZaadhzkbTI4.jpg",
          releaseDate: "2012-04-25",
          overview: "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
          vote_average: 7.7,
        },
      ],
      listOfTvShows: [
        {
          id: 4607,
          name: "Lost",
          first_air_date: "2004-09-22",
          poster_path: "/og6S0aTZU6YUJAbqxeKjCa3kY1E.jpg",
          backdrop_path: "/qpZ7dcM5yDyBDP4JSQr9LRUIBRm.jpg",
          overview: "Stripped of everything, the survivors of a horrific plane crash  must work together to stay alive. But the island holds many secrets.",
          vote_average: 7.9,
        },    
      ],
      wishListMovies: [],
      wishListTvShows: [],
      movieSearchResults: [],
      showSearchResults: [],
    }
    this.addToMyMovies = this.addToMyMovies.bind(this)
  }

  componentDidMount = async() => {
    await this.setMovieSearchResults()
    await this.setShowSearchResults()
  }

  setMediaSelection = (media) => {
    this.setState ({
      mediaSelection: media
    })
  }

  setMovieSearchResults = async(response) => {
    if (!response) {
      response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=66b22cb2598318b06f69e25cb751c2ad&sort_by=popularity.desc`)
    }
    
    this.setState({
      movieSearchResults: response.data.results
    })
  }

  setShowSearchResults = async(response) => {
    if (!response) {
      response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=66b22cb2598318b06f69e25cb751c2ad&sort_by=popularity.desc`)
    }

    this.setState({
      showSearchResults: response.data.results
    })
  }

  addToMyMovies = (movie) => {
    // console.log('movie:' + movie)
    const tempList = this.state.listOfMovies
    if (!tempList.includes(movie)) {
      tempList.push(movie)
      console.log(tempList)
      this.setState({
        listOfMovies: tempList
      })
    }
  }

  addToMyShows = (show) => {
    const tempList = this.state.listOfTvShows
    if (!tempList.includes(show)) {
      tempList.push(show)
      console.log(tempList)
      this.setState({
        listOfTvShows: tempList
      })
    }
  }

  addToShowWishList =(show) => {
    const tempList =this.state.wishListTvShows
    if (!tempList.includes(show)) {
      tempList.push(show)
      console.log(tempList)
      this.setState({
        wishListTvShows: tempList
      })
    }
  }
  addToMovieWishList =(movie) => {
    const tempList = this.state.wishListMovies
    if (!tempList.includes(movie)) {
      tempList.push(movie)
      console.log(tempList)
      this.setState({
        wishListMovies: tempList
      })
    }
  }


  render() {
    return (
      <div className="App">
        <header>
          <Navigation media={this.state.mediaSelection} setMedia={this.setMediaSelection} properties={this.mediaProps} />
        </header>
        <main>
          <Switch>
            <Route path="/" exact render={() => <Home media={this.state.movieSearchResults}/> }/>
            <Route path="/movies" render={(routerProps) => <MediaList {...routerProps} media={this.state.movieSearchResults} properties={this.mediaProps.movie} /> }/>
            <Route path="/shows" render={(routerProps) => <MediaList {...routerProps} media={this.state.showSearchResults} properties={this.mediaProps.show} /> }/>

            <Route path="/movie/:id" render={(routerProps) => <DetailPage {...routerProps} movies={this.state.movieSearchResults} addMovieWishListClick={this.addToMovieWishList} addMovieListClick={this.addToMyMovies}/> }/>
            <Route path="/show/:id" render={(routerProps) => <DetailPage {...routerProps} shows={this.state.showSearchResults} addShowWishListClick={this.addToShowWishList} addShowListClick={this.addToMyShows}/> }/>

            <Route path="/owned/movies" render={(routerProps) => <MediaList {...routerProps} media={this.state.listOfMovies} properties={this.mediaProps.movie} /> }/>
            <Route path="/owned/shows" render={(routerProps) => <MediaList {...routerProps} media={this.state.listOfTvShows} properties={this.mediaProps.show} /> }/>
            <Route path="/wish/movies" render={(routerProps) => <MediaList {...routerProps} media={this.state.wishListMovies} properties={this.mediaProps.movie} /> }/>
            <Route path="/wish/shows" render={(routerProps) => <MediaList {...routerProps} media={this.state.wishListTvShows} properties={this.mediaProps.show} /> }/>

            <Route path="/owned/movie/:id" render={(routerProps) => <DetailPage {...routerProps} movies={this.state.listOfMovies} /> }/>
            <Route path="/owned/show/:id" render={(routerProps) => <DetailPage {...routerProps} shows={this.state.listOfTvShows} /> }/>
            <Route path="/wish/movie/:id" render={(routerProps) => <DetailPage {...routerProps} movies={this.state.wishListMovies} /> }/>
            <Route path="/wish/show/:id" render={(routerProps) => <DetailPage {...routerProps} shows={this.state.wishListTvShows} /> }/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
