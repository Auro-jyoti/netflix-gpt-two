import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
    console.log(movies);
  return (
    <div className="p-6 relative">
      <h1 className="text-2xl text-white ml-4 font-bold">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <div key={movie.id} className="relative">
              <div className="transition-transform transform hover:scale-110">
                <MovieCard posterPath={movie.poster_path} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList