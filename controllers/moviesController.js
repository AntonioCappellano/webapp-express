const connection = require("../data/connDb");

const {
  handleFailQuery,
  handleResourceNotFound,
} = require("../utils/databaseUtils");

function index(req, res) {
  const moviesSQL = `
  SELECT 
       movies.*,
       ROUND(AVG(reviews.vote)) avg_vote 
  FROM 
      movies
  INNER JOIN reviews
  ON movies.id = reviews.movie_id

  GROUP BY movies.id`;
  connection.query(moviesSQL, (err, result) => {
    if (err) return handleFailQuery(err, res);

    const movies = result.map((movie) => {
      return { ...movie, image: buildMovieImgPath(movie.image) };
    });
    res.json({ result: movies });
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
      movie.image = buildMovieImgPath(movie.image);
      res.json({ movie });
    });
  });
}

function storeReview(req, res) {
  const { id } = req.params;
  const { name, vote, text } = req.body;
  const reviewSql = `
  INSERT INTO movies.reviews 
  (movie_id, name, vote, text) 
  VALUES (?, ?, ?, ?)`;

  connection.query(reviewSql, [id, name, vote, text], (err, result) => {
    const showReviewSQL = `SELECT * FROM reviews WHERE id = ?`;
    connection.query(showReviewSQL, [result.insertId], (err, result) => {
      const [review] = result
      res.json(review);
    });
  });
}

module.exports = { index, show, storeReview };

// Path per immagini
function buildMovieImgPath(image) {
  return `${process.env.APP_URL}:${process.env.APP_PORT}/img/${image}`;
}
