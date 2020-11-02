const express = require("express");
const router = express.Router();

const Movie = require("../models").Movie;

router.get("/", (req, res) => {
    Movie.findAll().then((movies) => {
        res.render("movies/index.ejs", {
            movies: movies,
        });
    });
});

router.get("/add", (req, res) => {
    res.render("movies/add.ejs");
});

router.post('/add', (req, res) => {
    Movie.create(req.body).then((newMovie) => {
        res.redirect(`/movies/${newMovie.id}`);
    });
});

router.get("/:id", (req, res) => {
    Movie.findByPk(req.params.id).then((foundMovie) => {
      res.render("movies/show.ejs", {
        movie: foundMovie,
      });
    });
});  

module.exports = router;