const router = require("express").Router();
const { User } = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
  User.findAll({
    // protect password
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
// added votes function & literal()
router.get("/:id", (req, res) => {
  // revised
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    // include: [
    //   {
    //     model: Post,
    //     attributes: ["id", "title", "post_url", "created_at"],
    //   },
    //   // include the Comment model here:
    //   {
    //     model: Comment,
    //     attributes: ["id", "comment_text", "created_at"],
    //     include: {
    //       model: Post,
    //       attributes: ["title"],
    //     },
    //   },
    //   {
    //     model: Post,
    //     attributes: ["title"],
    //     through: Vote,
    //     as: "voted_posts",
    //   },
    // ],
  })
    .then((dbUserData) => {
      // Because we're looking for one user,
      // there's the possibility we accidentally search for a user with a nonexistent id
      // so, if the .then() method returns nothing from the query, we send a 404 status back
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
