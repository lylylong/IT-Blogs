// This file will contain all of the user-facing routes, such as the homepage and login page.
const router = require("express").Router();

const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      // console.log(dbPostData[0]);
      // res.render("homepage", dbPostData[0]); //只显示某个index 0的部分信息
      // res.render("homepage", dbPostData[0].get({ plain: true })); //显示index 0的所有信息
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      //   res.render("homepage", { posts });
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
