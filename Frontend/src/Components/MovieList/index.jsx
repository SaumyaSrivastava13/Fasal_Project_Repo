import React from 'react';
import styles from './styles.module.css'

const MovieList = ({ handleSelect, movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div className={styles.movie} onClick={() => handleSelect(imdbID)}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
}

export default MovieList;
