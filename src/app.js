if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewRouter = require("./reviews/review.router")
const theaterRouter = require("./theaters/theaters.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewRouter);
app.use("/theaters", theaterRouter)

app.use(notFound);
app.use(errorHandler);

module.exports = app;
