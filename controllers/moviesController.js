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
        Movie.create(req.body).then((newMovie) => {
            user.addMovie(newMovie);
            getTitleFromUPC("097360156744");
            res.redirect(`/movies/${newMovie.id}`);
        });
    });

    function getTitleFromUPC(upcNumber) {
        return axios({
            method: `get`,
            
            url: 'https://api.barcodelookup.com/v2/products',
            params: {
                'barcode': upcNumber,
                'key': process.env.UPC_API_KEY
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.log(error));
    }
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