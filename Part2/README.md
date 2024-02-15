# MyMDB2
A React app for grabbing titles using a UPC API and matching it to entries found with movie database(TMDB)

# Description <br>
The Movie Database App was designed for User's to have the ability to search for some of their favorite movies/tv shows and also render some of the most popular ones. While using this app, users will be able to keep track of their personal collection of movies and also creating a wish list for movies they aspire to add to their collection. 

# Application 
https://mymdb-react.herokuapp.com/

# Screenshots
## Wireframe 
* Home Page - Home Page renders user a navigational bar to Movies, TV Shows, and My List. Main section will render random current popular movies and TV Shows at start. 
![Home Page](https://i.imgur.com/C5jybs6.png) <br>
* Movie Page - Movie Page renders popular movies and two search bars: by title and UPC. On click the search will render results from search bar in main section. 
![Movie Page](https://i.imgur.com/wiLSTgE.png) <br>
* Movie Page - TV Show Page renders popular movies and two search bars: by title and UPC. On click the search will render results from search bar in main section.  
![TV Page](https://i.imgur.com/IJGPTa5.png) <br>
* Detail Page - Detail Page will render when user clicks on certain movie/TV Show title. This page will render details about object that has been clicked along with actions for object.
![Detail Page](https://i.imgur.com/BmOBOYr.png) <br>
* My List Page - My list page will render user's action from Detail Page. This page will show user's selected collection of movies or, when prompted, user's Wish List of movies he/she wishes to acquire.
![My List Page](https://i.imgur.com/urzOEC0.png) <br>

## myMDB
* Home Page - Home Page renders user a navigational bar to Movies and TV Shows. Under any of these two, the user can use the links to go to their personal collection or their wishlist. The carousel on the page will show the top 3 most popular movies according to TMDB API. 
![Home Page](https://i.imgur.com/p9CJYyWh.png)
* Search Gallery - The Search Gallery under either Movie or TV Show will return results from user input UPC or Title. These two search criteria access different APIs but render results in the same format. 
![Search Gallery](https://i.imgur.com/qe1m9DRh.png)
* Detail Page - When user clicks on a Movie or TV Show it will render the detail page. When the user hovers the poster, the title, release date, and overview will render. From that point, the user has the option to add this show or movie to their collection or wishlist. 
![Detail Page](https://i.imgur.com/CJIryOIh.png)
* Wish List - This page will render a list the user personally has selected to show movies and shows that the user wishes to possess. 
![Wish List](https://i.imgur.com/sksfLVAh.png)
* Collection - This page will render a list of movies or shows that the user personally owns in their collection and helps them keep track of them. 
![Collection](https://i.imgur.com/Rpfxfuch.png)

# API
## TMDB
https://www.themoviedb.org/
## UPC 
https://upcdatabase.org/
# User Stories 
* As a User, I should be presented with popular movies at the homepage.
* As a User, I should be presented with navigational bar at any route chosen. 
* As a User, I should be able to return to homepage on any route. 
* As a User, I should be able to search for movies. 
* As a User, I should be able to search for TV Shows.
* As a User, I should be able to search by title or UPC Code. 
* As a User, I should be able to click and view items in detail (Title, Release Date, Summary).
* As a User, I should be able to add shows/movies to my collection.
* As a User, I should be able to add shows/movies to my wish list. 
* As a User, I should be able to view my collection and wishlist. 

# Technology Used 
* CSS5 <br>
* ES6 <br>
* HTML5 <br>
* NPX <br>
* NPM <br>
* React <br>
* Bootstrap <br>

# Approach
- We decided to use a combination of React Bootstrap features (ex. carousel, navbar) and standard CSS (ex. MediaPage, DetailPage)
- With a NavBar media drop-down, we set the media state (Movie or TV Shows). This controls what renders when Search, My Collection, and Wish List is selected
- The Title Search reports to the TMDB API, returning key features and details for said media.
  - Details include title, year of release (movie), first airing (TV), media description, and more depending on the media
- The UPC code API call returns has a title/description section. This section is then submitted to the same TMDB API for further title details

# Installation 
* None needed to use

# Future Plans 
* The integration of Express to add User sign up and login functionality to allow ability to store and view previous selections.
* Add the functionality for homepage to show 3 pictures asynchronous and render top 10 movies. 
* When user selects ne media, re-route them to the equivalent page for that media (ex. /owned/shows => /owned/movies)
* Instead of rendering a grid of media as done on the media page, it might be nice to have a textual list
* Mobile functionality

