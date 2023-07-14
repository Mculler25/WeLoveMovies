const router = require("express").Router({ mergeParams: true });
const { listTheatersAndMovies } = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(listTheatersAndMovies)
    .all(methodNotAllowed);


module.exports = router;