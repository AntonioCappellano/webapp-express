function logRequest(res, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

module.exports = logRequest;
