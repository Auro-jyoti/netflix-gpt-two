import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  // console.log("movies", movies);

  return (
    movies && (
      <div className="-mt-36 bg-[#000000]">
        <MovieList title={"Now Palying"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies} />
      </div>
    )
  );
};

export default SecondaryContainer;
