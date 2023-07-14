const knex = require("../db/connection");

const readReviews = (reviewId) => {
  return knex("reviews")
    .where({ review_id : reviewId})
    .first()
}

const updateReviews = async(updatedReview) => {
    await knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    
  return knex("reviews")
    .select("*")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .where({review_id : updatedReview.review_id})
    .then(rows => rows.map(row => (
      {
          content : row.content,
          created_at : row.created_at,
          critic : {
            organization_name : row.organization_name,
            preferred_name : row.preferred_name,
            surname : row.surname,
          },
          critic_id : row.critic_id,
          movie_id : row.movie_id,
          review_id : row.review_id,
          score : row.score,
          updated_at : row.updated_at
      }
    )))
    .then(data => data[0])
    
    
    
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