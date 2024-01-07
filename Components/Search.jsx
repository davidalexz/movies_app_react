import { useState } from 'react';
import { APIURL, IMGPATH, SEARCHAPI } from '../src/data';

export default function SearchList({ searchMovieData }) {
    const [movieName, setMovieName] = useState('');
    const [error, setError] = useState(null);

    const fetchMovie = async () => {
        if (movieName) {
            try {
                const res = await fetch(SEARCHAPI + movieName);
                if (res.ok) {
                    const data = await res.json();
                    searchMovieData(data);
                    setError(null);
                    setMovieName('');
                } else {
                    searchMovieData(null);
                    setMovieName('');
                    setError('Movie not found');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred, try again later.');
            }
        }
    };

    const handleKeyPres = (e) => {
        if (e.key === 'Enter') {
            fetchMovie();
            searchMovieData(null);
            setError(null);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setMovieName(e.target.value);
    };

    return (
        <>
            <input
                id="search-input"
                value={movieName}
                onChange={handleChange}
                onKeyDown={handleKeyPres}
                className="search_movie"
                type="text"
                placeholder="Search movie"
            />
            {error && <small className="error">{error}</small>}
        </>
    );
}
