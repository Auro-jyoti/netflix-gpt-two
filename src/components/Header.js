import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const handleGptSearchView = () => {
    dispatch(toggleGptSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="Logo" />
      {user && (
        <div
          className={`flex p-2 items-center ${
            gptSearch ? "w-96" : "w-72"
          } justify-between`}
        >
          {gptSearch && (
            <select
              className="p-2 px-4 py-2 bg-gray-800 rounded-md font-bold text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  className="rounded-md"
                  key={lang.identifire}
                  value={lang.identifire}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="p-2 px-4 py-2 bg-purple-800 rounded-md font-bold text-white"
            onClick={handleGptSearchView}
          >
            {
              gptSearch ? "Homepage" : "GPT Search"
            }
          </button>
          <div className="flex gap-4">
            <img
              alt="userIcon"
              src={require("../assets/logo.png")}
              className="w-10 h-10 rounded-md"
            />
            <button
              className="text-white hover:underline transition-all duration-1000"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
