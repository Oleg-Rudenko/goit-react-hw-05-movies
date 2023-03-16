import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import MoviesGallery from '../components/MoviesGallery';
import { fetchMovieSearch } from '../services/Api';

export default function MoviesPage() {
    const [, setSearchQuery] = useState('');
    const [movies, setMovies] = useState(null);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('query') ?? '';

    useEffect(() => {
        if (!query) {
            return;
        }

        fetchMovieSearch(query).then(request => {
            setMovies(request.results);
        });
    },[query])

    const onClick = request => {
        setSearchQuery(request);
}

    return (
        <>
            <Searchbar onSubmit={onClick} />
            
            {movies && <MoviesGallery movies={movies} />}
        </>
    )
};