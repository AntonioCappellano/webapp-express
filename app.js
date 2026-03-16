const express = require("express");
const app = express();
const port = 3000;

//MIDDLEWARES
const logger = require("./middlewares/logger");
app.use(logger)
app.use(express.static("public"))
app.use(express.json())


// TEST 
app.get("/", (req, res) => {
  res.send("hello world");
});


//ERROR HANDLING
const errorMiddleware = require("./middlewares/errorHandler");
app.use(errorMiddleware.error404);
app.use(errorMiddleware.error500);



app.listen(port, () => {
  console.log(`server listenig ${port}`);
});
