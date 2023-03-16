import { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, Switch, Route, useParams, useHistory, useLocation } from 'react-router-dom';
import Loader from '../components/Loader'
import { fetchMoviesId, IMAGE_URL } from '../services/Api';
import styles from '../components/Navigation/Navigation.module.css';


const Cast = lazy(() => import('./Cast') /* webpackChunkName: "Cast" */);
const Reviews = lazy(() => import('./Reviews') /* webpackChunkName: "Reviews" */);

export default function MovieDetailsPage() {
    const history = useHistory();
    const location = useLocation();


    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    
    let locationValue = location.state;
    if (location.state) {
        locationValue = location.state.from;
    }
    
    useEffect(() => {
        fetchMoviesId(movieId).then(movie => {
            setMovie(movie);
        });
    }, [movieId]);

    const onGoBack = () => {
        if (!location.state) {
            history.push('/');
            return;
        }
        
        history.push(`${location.state.from.pathname}${location.state.from.search}`)

        }


    return (
        <>
            {movie && (
                <>
                    <button type="button" className="Button" onClick={onGoBack}>⇚ Go Back</button>

                    <div className="DetailsPage">
                        <img src={IMAGE_URL + movie.poster_path} alt={movie.title} className="DetailsPage_img" />
                        <div>
                            <h2>{movie.title}</h2>
                            <p><span>Rating: </span>{movie.vote_average}</p>
                            <p><span>Overview: </span>{movie.overview}</p>
                            <p><span>Genres: </span>{movie.genres.map(genre => genre.name).join(' ')}</p>
                        </div>
                    </div>

                    <hr />

                    <h3>Additional information</h3>
            
                    <nav>
                        <NavLink
                            to={{
                                pathname: `/movies/${movieId}/cast`,
                                state: { from: locationValue }
                            }}
                            className={styles.link}
                            activeClassName={styles.activeLink}
                        >
                            Cast
                        </NavLink>

                        <NavLink
                            to={{
                                pathname: `/movies/${movieId}/reviews`,
                                state: { from: locationValue }
                            }}
                            className={styles.link}
                            activeClassName={styles.activeLink}
                        >
                            Reviews
                        </NavLink>
                    </nav>

                    <hr />
                    
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            <Route path={`/movies/${movieId}/cast`}>
                                <Cast movieId={movieId} />
                            </Route>

                            <Route path={`/movies/${movieId}/reviews`}>
                                <Reviews movieId={movieId} />
                            </Route>
                    </Switch>
                    </Suspense>
                </>
            )}
        </>
    )
};