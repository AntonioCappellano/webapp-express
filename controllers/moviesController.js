const connection = require("../data/connDb");
const {
  handleFailQuery,
  handleResourceNotFound,
} = require("../utils/databaseUtils");

function index(req, res) {
  const moviesSQL = "SELECT * FROM movies";
  connection.query(moviesSQL, (err, result) => {
    if (err) return handleFailQuery(err, res);
    res.json({ result });
  });
}

function show(req, res) {
  const { id } = req.params;
  const moviesSQL = "SELECT * FROM movies WHERE `id` = ?";
  connection.query(moviesSQL, [id], (err, result) => {
    if (err) return handleFailQuery(err, res);
    const movie = result[0];
    if (!movie) {
      return handleResourceNotFound(res);
    }
    const reviewsSQL = "SELECT * FROM reviews WHERE movie_id = ?";
    connection.query(reviewsSQL, [id], (err, reviewsResults) => {
      if (err) return handleFailQuery(err, res);
      movie.reviews = reviewsResults;
      res.json({ movie });
    });
  });
}

module.exports = { index, show };
