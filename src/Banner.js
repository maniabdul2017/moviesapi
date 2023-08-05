import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./Requests";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      /*  console.log(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      ); */ //in this array is [...1, .....2 ,3....] bunch of movies
      //but i want to get 1 by one
    }
    fetchData();
  }, []);

  console.log(movie);
  //this truncate function is for movie banner description to show less info not the whole info
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}" 
        )`, //here the ? means if the {movie} is undefined is not going to crash its gonna handle it
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* <<<background image */}
        {/* title */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>{" "}
        {/* its like if else if some api their movies name not defined title so if the dont have title they name if they dont have name they have original name  */}
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* div > 2 buttons */}
        {/* 1st example without function the description */}
        {/* <h1 className="banner__description">{movie?.overview}</h1> */}
        {/* 2nd example description */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
          {/* here i am saying i just want the 150 character  */}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
