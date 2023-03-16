import { useState, useEffect } from 'react';
import MoviesGallery from '../components/MoviesGallery';
import { fetchTrendingMovies } from '../services/Api';


export default function HomePage() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        fetchTrendingMovies()
            .then(request => setMovies(request.results)
            );
    }, [])

    return (
        <>
            <h1>Trending today</h1>

            <MoviesGallery movies={movies} />
        </>
    );
};