const express = require("express");
const router = express.Router();

const Movie = require("../models").Movie;

router.get("/", (req, res) => {
    res.render("movies/index.ejs");
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
    res.render("movies/show.ejs");
});

module.exports = router;