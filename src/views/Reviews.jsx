import { useState, useEffect } from 'react';
import { fetchMovieReviews } from '../services/Api';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(request => setReviews(request.results));
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(el => (
            <li key={el.id}>
              <p>
                <span>Author: </span>
                {el.author}
              </p>
              <p>{el.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No reviews</h2>
      )}
    </>
  );
}
