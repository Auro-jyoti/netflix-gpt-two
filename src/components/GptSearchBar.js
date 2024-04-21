import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
import { API_OPTIONS, GEMINI_API_KEY } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGeminiMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en=US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const handleGptSearchClick = async () => {
    // const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query : " + searchText.current.value + "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Atricle 370, Sholay, Gangs of Wasseypur, Golmal, Koi Mil Gaya";

    // const gptResults = await openai?.chat?.completions?.create({
    //     messages: [{
    //         role: 'user',
    //         content: gptQuery,
    //     }],
    //     model: "gpt-3.5-turbo-0125",
    // });

    // if(!gptResults.choices) return ;

    // console.log(gptResults.choices?.[0]?.message?.content);
    // const gptMovies = gptResults.choices?.[0]?.message?.content.split(',');

    // for each movie search in TMDB API,

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });
    const prompt =
      "Act as a Movie Recommendation System and suggest some movies for the query : " +
      searchText.current.value +
      "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Atricle 370, Sholay, Gangs of Wasseypur, Golmal, Koi Mil Gaya";

      const result = await model.generateContent(prompt);

      const geminiResults = await result.response;
    //   console.log(geminiResults?.candidates?.[0]?.content?.parts[0]);

      const geminiMovies = geminiResults?.candidates?.[0]?.content?.parts?.[0].text.split(",");
    
      if(!geminiMovies) return ;

      const promiseArray = geminiMovies?.map((movie) => searchMovieTMDB(movie));
    //   [Promise, Promise, Promise, Pormise, Promise]

      const tmdbResults = await Promise.all(promiseArray);

    //   console.log(tmdbResults);

      if(tmdbResults) {
        dispatch(addGeminiMovieResult({movieNames: geminiMovies,movieResults: tmdbResults}));
      }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 grid grid-cols-12  bg-[#000000]"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-sm col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="bg-red-700 m-4 text-white rounded-sm col-span-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
