const router = require("express").Router({ mergeParams: true });
const { listMovies, readMoviesByIds, readMovieTheaters, readMovieReviews} = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(listMovies)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(readMoviesByIds)
    .all(methodNotAllowed);

router.route("/:movieId/theaters")
    .get(readMovieTheaters)
    .all(methodNotAllowed);

router.route("/:movieId/reviews")
    .get(readMovieReviews)
    .all(methodNotAllowed);


module.exports = router;