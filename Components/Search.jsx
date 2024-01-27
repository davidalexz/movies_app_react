import { useState } from 'react';
import { SEARCHAPI } from '../src/data';

export default function SearchList({ searchMovieData }) {
    const [movieName, setMovieName] = useState('');
    const [error, setError] = useState(null);

    const fetchMovie = async () => {
        if (movieName) {
            try {
                const res = await fetch(SEARCHAPI + movieName);
                const data = await res.json();
                if ((data.Response === 'False') & (data.Error === 'Movie not found!')) {
                    searchMovieData(null);
                    setMovieName('');
                    setError('Movie not found');
                } else {
                    searchMovieData(data);
                    setError(null);
                    setMovieName('');
                }
            } catch (err) {
                setError('An error occurred, try again later.');
            }
        }
    };

    const handleKeyPres = (e) => {
        if (e.key === 'Enter') {
            fetchMovie();
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setMovieName(e.target.value);
    };

    return (
        <>
            <div className="search-header">
                <input
                    id="search-input"
                    value={movieName}
                    onChange={handleChange}
                    onKeyDown={handleKeyPres}
                    className="search_movie"
                    type="text"
                    placeholder="Search movie"
                />
                <button className="search-btn" onClick={fetchMovie}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <small className="error">{error}</small>
        </>
    );
}
