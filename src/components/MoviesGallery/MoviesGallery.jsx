import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGE_URL } from '../../services/Api';
import style from './MoviesGallery.module.css';

const MoviesGallery = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={style.MoviesGallery}>
      {movies.map(movie => (
        <li className={style.MoviesItem} key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: location },
            }}
          >
            <img
              src={IMAGE_URL + movie.poster_path}
              alt={movie.title}
              className={style.MoviesItem_img}
              width={400}
            />
            <p className={style.MoviesItem_text}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MoviesGallery;
