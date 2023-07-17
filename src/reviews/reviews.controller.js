const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { updateReviews, deleteReviews, readReviews } = require("./reviews.service");


async function restaurantExists(req, res, next) {
    const review = await readReviews(req.params.reviewId);
  
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
  }

const updateMovieReviews = async(req, res, next) => {
    const updatedReview = {
      ...res.locals.review,
        ...req.body.data,
        review_id: req.params.reviewId,
      };
    res.json({ data : await updateReviews(updatedReview)})
}

const deleteMovieReviews = async(req, res, next) => {
    const { reviewId } = req.params;
    res.status(204).json({data : await deleteReviews(reviewId)})
}

module.exports = {
    updateMovieReviews : [
        asyncErrorBoundary(restaurantExists),
        // hasProperties('score', 'content'),
        asyncErrorBoundary(updateMovieReviews),
    ],
    deleteMovieReviews : [
        asyncErrorBoundary(restaurantExists),
        asyncErrorBoundary(deleteMovieReviews)
    ]
}
