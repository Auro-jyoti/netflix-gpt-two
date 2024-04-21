import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();


  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value);

    // console.log(message);
    setErrorMessage(message);
    if (message) return;

    // Sign In, Sign Up logic
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            // photoURL: "https://avatars.githubusercontent.com/u/123365412?v=4",
          })
            .then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  function toggleSignIn() {
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={require("../assets/loginBackgroundImage.jpg")}
          alt="backgroundImg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black bg-opacity-80 w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-sm"
      >
        <h2 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Enter your Name"
            className="p-3 my-2 w-full bg-gray-500 bg-opacity-50 rounded-sm"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 my-2 w-full bg-gray-500 bg-opacity-50 rounded-sm"
        />
        <input
          ref={password}
          type="text"
          placeholder="Password"
          className="p-3 my-2 w-full bg-gray-500 bg-opacity-50 rounded-sm"
        />
        <p className="text-sm text-red-700 block text-center">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="p-2 my-2 bg-red-700 w-full rounded-sm"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        {isSignIn ? (
          <a
            href="#"
            className="block text-center hover:underline cursor-pointer"
          >
            Forgot Password ?{" "}
          </a>
        ) : null}

        <div className="mt-14">
          <input type="checkbox" id="rememberMe" class="h-4 w-4 mr-2" />
          <label for="rememberMe">Remember Me</label>
          {isSignIn ? (
            <p className="mt-1 text-gray-500">
              New to Netflix?
              <span
                className="ml-1 text-white font-bold cursor-pointer hover:underline"
                onClick={toggleSignIn}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p className="mt-1 text-gray-500">
              Already an user ?
              <span
                className="ml-1 text-white font-bold cursor-pointer hover:underline"
                onClick={toggleSignIn}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-6">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <span className="text-blue-800">Learn more.</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
