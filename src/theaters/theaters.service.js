const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const list = () => {
  return knex("theaters")
    .select(
      "theaters.theater_id",
      "theaters.name",
      "theaters.address_line_1",
      "theaters.address_line_2",
      "theaters.city",
      "theaters.state",
      "theaters.zip",
      "movies.movie_id",
      "movies.title",
      "movies.rating",
      "movies.runtime_in_minutes"
    )
    .join(
      "movies_theaters",
      "theaters.theater_id",
      "movies_theaters.theater_id"
    )
    .join("movies", "movies_theaters.movie_id", "movies_theaters.movie_id")
    .distinct("movies.movie_id")
    .then(
      reduceProperties("theater_id", {
        theater_id: ["theater_id"],
        name: ["name"],
        address_line_1: ["address_line_1"],
        address_line_2: ["address_line_2"],
        city: ["city"],
        state: ["state"],
        zip: ["zip"],
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        rating: ["movies", null, "rating"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
      })
    );
};

module.exports = {
  list,
};
