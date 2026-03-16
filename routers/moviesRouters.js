const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviesController");

router.get("/", movieController.index);
router.get("/:id", movieController.show);

module.exports = router;
