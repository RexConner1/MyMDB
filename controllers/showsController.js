require("dotenv").config();

const express = require("express");
const router = express.Router();

const User = require("../models").User;
const Show = require("../models").Show;

router.get("/", (req, res) => {
    User.findByPk(req.user.id, {
        include: [{ model: Show }],
        order: [[Show, 'title', 'ASC']],
    }).then((user) => {
        res.render("shows/index.ejs", {
            shows: user.Shows,
            user: req.user
        });
    });
});

router.get("/add", (req, res) => {
    res.render("shows/add.ejs", {
        user: req.user
    });
});

router.post('/add', (req, res) => {
    User.findByPk(req.user.id).then((user) => {
        Show.create(req.body).then((newShow) => {
            user.addShow(newShow);
            res.redirect(`/shows/${newShow.id}`);
        });
    });
});

router.get("/:id", (req, res) => {
    Show.findByPk(req.params.id).then((foundShow) => {
      res.render("shows/show.ejs", {
        show: foundShow,
        user: req.user
      });
    });
}); 

router.get("/:id/edit", (req, res) => {
    Show.findByPk(req.params.id).then((foundShow) => {
        console.log(foundShow);
      res.render("shows/edit.ejs", {
        show: foundShow,
        user: req.user
      });
    });
});

router.put("/:id", (req, res) => {
    Show.update(req.body, {
        where: { id: req.params.id },
        returning: true,
    }).then((updatedShow) => {
        res.redirect('/shows');
    });
});

router.delete('/:id', (req, res) => {
    Show.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/shows");
    });
});

module.exports = router;