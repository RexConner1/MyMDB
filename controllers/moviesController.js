const express = require("express");
const router = express.Router();

const User = require("../models").User;
const Movie = require("../models").Movie;

router.get("/", (req, res) => {
    Movie.findAll().then((movies) => {
        res.render("movies/index.ejs", {
            movies: movies,
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
        Movie.create(req.body).then((newMovie) => {
            user.addMovie(newMovie);
            res.redirect(`/movies/${newMovie.id}`);
        });
    });
});

router.get("/:id", (req, res) => {
    Movie.findByPk(req.params.id).then((foundMovie) => {
      res.render("movies/show.ejs", {
        movie: foundMovie,
        user: req.user
      });
    });
});  

module.exports = router;