require("dotenv").config();

const express = require("express");
const router = express.Router();

const User = require("../models").User;
const Game = require("../models").Game;

router.get("/", (req, res) => {
    User.findByPk(req.user.id, {
        include: [{ model: Game }],
        order: [[Game, 'title', 'ASC']],
    }).then((user) => {
        res.render("games/index.ejs", {
            games: user.Games,
            user: req.user
        });
    });
});

router.get("/add", (req, res) => {
    res.render("games/add.ejs", {
        user: req.user
    });
});

router.post('/add', (req, res) => {
    User.findByPk(req.user.id).then((user) => {
        Game.create(req.body).then((newGame) => {
            user.addGame(newGame);
            res.redirect(`/games/${newGame.id}`);
        });
    });
});

router.get("/:id", (req, res) => {
    Game.findByPk(req.params.id).then((foundGame) => {
      res.render("games/show.ejs", {
        game: foundGame,
        user: req.user
      });
    });
}); 

router.get("/:id/edit", (req, res) => {
    Game.findByPk(req.params.id).then((foundGame) => {
        console.log(foundGame);
      res.render("games/edit.ejs", {
        game: foundGame,
        user: req.user
      });
    });
});

router.put("/:id", (req, res) => {
    Game.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((updatedGame) => {
        res.redirect('/games');
    });
});

router.delete('/:id', (req, res) => {
    Game.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/games");
    });
});

module.exports = router;