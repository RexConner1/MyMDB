const express = require("express");
const router = express.Router();

const Media = require("../models").Media;

router.get("/", (req, res) => {
    res.render("movies/index.ejs");
});

router.get("/add", (req, res) => {
    res.render("movies/add.ejs");
});

router.post('/add', (req, res) => {
    Media.create(req.body).then((newMovie) => {
        res.redirect(`/movies/${newMovie.id}`);
    });
});

router.get("/:id", (req, res) => {
    res.render("movies/show.ejs");
});

module.exports = router;