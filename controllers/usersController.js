const express = require("express");
const router = express.Router();

const User = require("../models").User;

router.get("/:id", (req, res) => {
  console.log(req.user);
  User.findByPk(req.params.id).then((user) => {
    res.render("movies/index.ejs", {
      user: user,
    });
  });
});

router.get("/profile/:id", (req, res) => {
  console.log(req.user);
  User.findByPk(req.params.id).then((userProfile) => {
    res.render("users/profile.ejs", {
      user: userProfile,
    });
  });
});

router.delete('/profile/:id', (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/auth/login");
  });
});

router.put('/profile/:id', (req, res) => {    
  User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
  }).then((updatedUser) => {
      res.redirect(`/users/profile/${req.params.id}`);
  });
});

module.exports = router;
