const express = require("express");
const router = express.Router();

const User = require("../models").User;

router.get("/:id", (req, res) => {
  res.render("users/index.ejs", {
    user: req.user,
  });
});

router.get("/profile/:id", (req, res) => {
  res.render("users/profile.ejs", {
    user: req.user,
  });
});

router.delete('/profile/:id', (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then(() => {
      res.clearCookie("jwt");
      res.redirect("/auth/login");
  });
});

router.put('/profile/:id', (req, res) => {    
  User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
  }).then((updatedUser) => {
      res.redirect(`/auth/logout`);
  });
});

module.exports = router;
