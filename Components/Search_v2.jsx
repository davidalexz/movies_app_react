import { useState, useEffect } from 'react';
import { APIURL, IMGPATH, SEARCHAPI } from '../src/data';

export default function SearchList() {
    const [movieName, setMovieName] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);

    const fetchMovie = async () => {
        if (movieName) {
            try {
                const res = await fetch(SEARCHAPI + movieName);
                if (res.ok) {
                    const data = await res.json();
                    setMovieData(data.search);
                    setError(null);
                    setMovieName('');
                    console.log(data);
                } else {
                    setMovieData(null);
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
            setMovieData(null);
            setError(null);
        }
    };

    // useEffect(() => {
    //     document.addEventListener('keypress', handleKeyPres);
    //     return () => {
    //         document.removeEventListener('keypress', handleKeyPres);
    //     };
    // }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setMovieName(e.target.value);
        console.log(movieName);
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
