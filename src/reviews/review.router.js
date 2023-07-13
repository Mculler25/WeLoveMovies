const router = require("express").Router({ mergeParams: true });
const { updateMovieReviews, deleteMovieReviews } = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId")
    .put(updateMovieReviews)
    .delete(deleteMovieReviews)
    .all(methodNotAllowed);


module.exports = router;