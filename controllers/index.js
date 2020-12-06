const router = require("express").Router();

const apiRoutes = require("./api");
// add the following router.use() statement for home-routes.js, the new file:
const homeRoutes = require("./home-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
