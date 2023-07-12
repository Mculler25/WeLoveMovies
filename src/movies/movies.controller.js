const { list , areMoviesShowing, showMoviesId , showMoviesTheaters, showMoviesReviews } = require("./movies.service");


const listMovies = async(req, res, _next) => {
    const { is_showing } = req.query;
    if (is_showing === undefined) {
        res.json({ data : await list()});
        return;
    } else {
        res.json({ data: await areMoviesShowing(is_showing) });
        return;
    };
}

const readMoviesByIds = async(req, res, next) => {
    const { movieId } = req.params;
    res.json({data : await showMoviesId(movieId)})
} 

const readMovieTheaters = async(req, res, next) => {
    const { movieId } = req.params;
    res.json({ data : await showMoviesTheaters(movieId)})
}

const readMovieReviews = async(req, res, next) => {
    const { movieId } = req.params;
    res.json({data : await showMoviesReviews(movieId)})
}


module.exports = {
    listMovies,
    readMoviesByIds,
    readMovieTheaters,
    readMovieReviews
}