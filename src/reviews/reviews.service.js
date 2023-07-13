const knex = require("../db/connection");

const readReviews = (reviewId) => {
  return knex("reviews")
    .where({ review_id : reviewId})
    .first()
}

const updateReviews = (updatedReview) => {
    return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    
}

const deleteReviews = (reviewId) => {
  return knex("reviews")
    .where("review_id", reviewId)
    .del()
}

module.exports = {
    updateReviews,
    deleteReviews,
    readReviews
}