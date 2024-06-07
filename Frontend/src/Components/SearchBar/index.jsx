import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import MovieList from "../MovieList";
import Movie from '../Movie';
import SearchIcon from "./output-onlinegiftools.gif";
import { useNavigate } from 'react-router-dom';

const API_URL = "https://www.omdbapi.com?apikey=3018d9fc";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelectedMovie(id);
    setIsOpen(true);
  };
  const handleLogout = () => {
		localStorage.removeItem("token");
		navigate('/login');
	};

  useEffect(() => {
    searchMovies("Home Alone");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <div>
      <div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1 className={styles.appname}> MovieMate</h1>
				<div>
				<a href="/dashboard" className={styles.underline_on_click}>Home</a>
				<a href="/search" className={styles.underline_on_click}>Search</a>
				
				</div>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
		
			</nav>
    <div className={styles.app}>
      {isOpen && <Movie selectedMovie={selectedMovie} setIsOpen={setIsOpen} />}
      <div className={styles.search}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className={styles.container}>
          {movies.map((movie) => (
            <MovieList handleSelect={handleSelect} key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default SearchBar;
