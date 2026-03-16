const express = require("express");
const app = express();

//MIDDLEWARES
const logger = require("./middlewares/logger");
app.use(logger);
app.use(express.static("public"));
app.use(express.json());

// ROUTERS
const globalRouter = require("./routers/globalRouters")
const movieRouter = require("./routers/moviesRouters")

app.use(globalRouter)
app.use("/movies", movieRouter)

//ERROR HANDLING
const errorMiddleware = require("./middlewares/errorHandler");
app.use(errorMiddleware.error404);
app.use(errorMiddleware.error500);




app.listen(process.env.APP_PORT, () => {
  console.log(
    "server listening on " + process.env.APP_URL + ":" + process.env.APP_PORT,
  );
});
