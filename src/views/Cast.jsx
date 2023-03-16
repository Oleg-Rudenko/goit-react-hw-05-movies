import { useState, useEffect } from 'react';
import { fetchMovieCast, IMAGE_URL } from '../services/Api';
export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(request => setCast(request.cast));
  }, [movieId]);

  return (
    <ul className="Cast">
      {cast.map(el => (
        <li key={el.id} className="CastItem">
          <img
            src={IMAGE_URL + el.profile_path }
            alt={el.name}
            className="CastItem_img"
          />
          <p className="CastItem_text">{el.name}</p>
        </li>
      ))}
    </ul>
  );
}

