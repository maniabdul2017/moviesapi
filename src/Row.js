import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/"; // i need this url for image because what i am getting through api is this (keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg) but i need the full path for img src

function Row({ title, fetchUrl, isLargeRow }) {
  //creating an empty array
  const [movies, setMovies] = useState([]);
  //here i am using this trailer for youtube trailer
  const [trailerUrl, setTrailerUrl] = useState("");

  //i am using useEffect for loading data

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); //https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US this line means this
      //   console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //if i dont put[movies] inside its gonna run with bracket [] means run once and dont run again
  //if i want to use the outside variable in useEffect the i have to put in these brackets the variable [fetchUrl]
  //this i can get from react youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          //this uppper thing is gonna get this value XtMThy8QKqU that what we needed
        })
        .catch((error) => console.log(error));
    }
  };

  //   console.log(movies);
  //console.table(movies);//its for table movies
  return (
    <div className="row">
      {/*title */}
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__posters */}

        {movies.map((movie) => (
          /*  <img
            key={movie.id}
            className="row__poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          /> */
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`} // so here i am resing netflix originals picture size like in css file i am saying that if its isLarge then resize it like this
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} // movie.poster_path : movie.backdrop_path this thing means when i want the poster big or small so its like if else ternary operator
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
          //i am using basic url for the full path for example https://image.tmdb.org/t/p/original/ this is base url and this movie.poster_path keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
