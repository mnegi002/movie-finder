import "./styles.css";
import Card from "./Card";
import { useState } from "react";
import Info from "./Info";
import axios from "axios";
export default function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeout, updateTimeout] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=31912ee0`
    );
    updateMovieList(response.data.Search);
  };

  const changeInput = (event) => {
    clearTimeout(timeout);
    updateSearchQuery(event.target.value);
    const timout = setTimeout(() => {
      fetchData(event.target.value);
    }, 500);
    updateTimeout(timout);
  };
  return (
    <>
      <div className="app">
        <div>
          <h1>Movie Finder </h1>
        </div>
        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Search movies"
            onChange={changeInput}
            value={searchQuery}
          />
        </div>
      </div>
      {selectMovie && (
        <Info selectMovie={selectMovie} onMovieSelect={onMovieSelect} />
      )}
      <div className="container">
        {movieList?.length
          ? movieList.map((movie, index) => (
              <Card key={index} movie={movie} onMovieSelect={onMovieSelect} />
            ))
          : "No Movie Searched"}
      </div>
    </>
  );
}
