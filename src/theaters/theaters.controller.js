const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { list } = require("./theaters.service");

const listTheatersAndMovies = async(req, res, next) => {
    res.json({data : await list()})
}

module.exports = {
    listTheatersAndMovies : asyncErrorBoundary(listTheatersAndMovies)
}