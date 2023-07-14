const { list , areMoviesShowing, showMoviesId , showMoviesTheaters, showMoviesReviews } = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const movie = await showMoviesId(req.params.movieId);
  
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    next({ status: 404, message: `movie cannot be found.` });
  }

const listMovies = async(req, res, _next) => {
    const { is_showing } = req.query;
    if (is_showing === undefined) {
        res.json({ data : await list()});
        
    } else {
        res.json({ data: await areMoviesShowing(is_showing) });
        
    };
}

const readMoviesByIds = async(req, res, next) => {
    const { movie } = res.locals;
    res.json({data : movie})
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
    readMoviesByIds : [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(readMoviesByIds)
    ],
    readMovieTheaters,
    readMovieReviews
}