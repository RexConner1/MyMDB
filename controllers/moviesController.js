const express = require("express");
const router = express.Router();

const Media = require("../models").Media;

router.get("/", (req, res) => {
    res.render("movies/index.ejs");
});

router.get("/add", (req, res) => {
    res.render("movies/add.ejs");
});

router.get("/:id", (req, res) => {
    res.render("movies/show.ejs");
});

module.exports = router;