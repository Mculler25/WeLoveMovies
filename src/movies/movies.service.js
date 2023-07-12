const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const list = () => {
    return knex("movies")
        .select("*")
}

const areMoviesShowing = (showing) => {
    return knex("movies")
        .select("*")
        .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
        .where({is_showing : showing, theater_id : 1})   
}

const showMoviesId = (movieId) => {
    return knex("movies")
        .select("*")
        .where({movie_id : movieId})
        .first()
}

const showMoviesTheaters = (movieId) => {
    return knex("theaters")
        .select("theaters.*", "movies_theaters.is_showing", "movies_theaters.movie_id")
        .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
        .where({movie_id : movieId})
}

const showMoviesReviews = (movieId) => {
    return knex("reviews")
        .select("reviews.*", "critics.*")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .where({movie_id : movieId})
        .then(rows => rows.map(row => (
            {
                review_id : row.review_id,
                content : row.content,
                created_at : row.created_at,
                updated_at : row.updated_at,
                critic_id : row.critic_id,
                movie_id : row.movie_id,
                critic : {
                    critic_id : row.critic_id,
                    preferred_name : row.preferred_name,
                    surname : row.surname,
                    organization_name : row.organization_name,
                    created_at : row.created_at,
                    updated_at : row.updated_at
                }
            }
        )))
        
}

module.exports = {
    list,
    areMoviesShowing,
    showMoviesId,
    showMoviesTheaters,
    showMoviesReviews
}