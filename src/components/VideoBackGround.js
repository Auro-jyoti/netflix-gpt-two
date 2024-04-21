import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackGround = ({ movieId }) => {
  useMovieTrailer(movieId);
  const trailer = useSelector(store => store.movies.trailerVideo);
  // console.log(trailer);
  // console.log(trailer?.key);
  return (
    <div className="overflow-x-hidden h-screen">
      <iframe
        className="w-full h-full aspect-video "
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?&autoplay=1&mute=1&loop=1&controls=0&showinfo=0"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackGround;
