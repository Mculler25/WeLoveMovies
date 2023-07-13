const knex = require("../db/connection");

const updateReviews = (updatedReview) => {
    return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    
}

const deleteReviews = (reviewId) => {
  return knex("reviews")
    .where("review_id", reviewId)
    .del()
}

module.exports = {
    updateReviews,
    deleteReviews
}