const connection = require("../data/connDb");
const { handleFailQuery } = require("../utils/databaseUtils");

function index(req, res) {
  const moviesSQL = "SELECT * FROM movies";
  connection.query(moviesSQL, (err, result) => {
    if (err) return handleFailQuery(err, res);
    res.json({ result });
  });
}

module.exports = { index };
