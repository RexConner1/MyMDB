require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");

const User = require("../models").User;
const Movie = require("../models").Movie;

router.get("/", (req, res) => {
    User.findByPk(req.user.id, {
        include: [{ model: Movie }],
        order: [[Movie, 'title', 'ASC']],
    }).then((user) => {
        res.render("movies/index.ejs", {
            movies: user.Movies,
            user: req.user
        });
    });
});

router.get("/add", (req, res) => {
    res.render("movies/add.ejs", {
        user: req.user
    });
});

router.post('/add', (req, res) => {
    User.findByPk(req.user.id).then((user) => {
        // getTitleFromUPC(`${req.body.upc}`).then((title) => {
            // getMovieInfoFromTitle(req.body.title).then((response) => {
                // console.log(req.body);
                // console.log('XXXXX');
                // console.log(response && response.data.results[0].title === req.body.title);
                // if (response && response.data.results[0].title === req.body.title) {
                //     let tempDate = new Date(response.data.results[0].release_date)
                //     req.body.year = `${tempDate.getFullYear()}`;
                //     req.body.runTime = "0";
                //     // req.body.description = response.data.results[0].overview;
                // }
                // console.log('YYYYY');
                // console.log(req.body);
                Movie.create(req.body).then((newMovie) => {
                    user.addMovie(newMovie);
                    res.redirect(`/movies/${newMovie.id}`);
                });
            // });
        // });
    });

    // function getTitleFromUPC(upcNumber) {
    //     return axios({
    //         method: `get`,
    //         url: 'https://api.barcodelookup.com/v2/products',
    //         params: {
    //             'barcode': upcNumber,
    //             'key': process.env.UPC_API_KEY
    //         }
    //     })
    //     .then(response => {
    //         // console.log(response.data.products[0].product_name);
    //         req.body.title = response.data.products[0].product_name;
    //         console.log(req.body);
    //     })
    //     .catch(error => console.log(error));
    // };

    function getMovieInfoFromTitle(title) {
        return axios({
            method: `get`,
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {
                'api_key': process.env.MOVIEDB_API_KEY,
                'language': 'en-US',
                'query': title,
                'page': '1',
                'include_adult': 'false',
            }
        })
        // .then(response => {
        //     console.log('XXXXX');
        //     console.log(response.data.results[0]);
        //     if (response) {
        //         req.body.title = response.data.results[0].title;
        //         req.body.year = Date.parse(response.data.results[0].release_date).getYear();
        //         req.body.runTime = 0;
        //         req.body.description = response.data.results[0].overview;
        //         console.log(req.body);
        //     }
        // })
        // .catch(error => console.log(error));
    };
});

router.get("/:id", (req, res) => {
    Movie.findByPk(req.params.id).then((foundMovie) => {
      res.render("movies/show.ejs", {
        movie: foundMovie,
        user: req.user
      });
    });
}); 

router.get("/:id/edit", (req, res) => {
    Movie.findByPk(req.params.id).then((foundMovie) => {
      res.render("movies/edit.ejs", {
        movie: foundMovie,
        user: req.user
      });
    });
});

router.put("/:id", (req, res) => {
    Movie.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((updatedMovie) => {
        res.redirect('/movies');
    });
});

router.delete('/:id', (req, res) => {
    Movie.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/movies");
    });
});

module.exports = router;