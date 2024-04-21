export const LOGO = require("../assets/Netflix_Logo_PMS.png");

// export const USER_AVATAR = require("");

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer "+process.env.REACT_APP_TMDB_TOKEN,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780/";

export const SUPPORTED_LANGUAGES = [
  {
    identifire: "en",
    name: "English",
  },
  {
    identifire: "hindi",
    name: "Hindi",
  },
  {
    identifire: "spanish",
    name: "Spanish",
  },
];



export const GEMINI_API_KEY = process.env.REACT_APP_API_KEY_GEMINI;