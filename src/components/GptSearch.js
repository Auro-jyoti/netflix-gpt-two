import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';

const GptSearch = () => {
  return (
    <div className="">
      <div className="fixed -z-10">
        <img
          src={require("../assets/loginBackgroundImage.jpg")}
          alt="backgroundImg"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
}

export default GptSearch;