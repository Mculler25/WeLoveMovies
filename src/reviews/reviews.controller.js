const { updateReviews, deleteReviews } = require("./reviews.service");

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
    updateMovieReviews,
    deleteMovieReviews
}
