import { APIURL, IMGPATH, MOVIELINK } from '../src/data';
import Modal from './Modal';
import { useState, useEffect } from 'react';

export default function Movies({
    searchMovieData,
    setError,
    selectMovie,
    setSelectMovie,
    isSearching,
}) {
    const [getMovies, setGetMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const movieList = async () => {
        try {
            const res = await fetch(APIURL + currentPage);
            const data = await res.json();
            return data.results;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    //ANCHOR - need to fix fetchMovies function or create a new one for the APIURL to increment pagination number for the new movies

    const fetchMovies = async () => {
        try {
            const moviesList = await movieList();
            setGetMovies((prevMovies) => [...prevMovies, ...moviesList]);
            setCurrentPage((prevPage) => prevPage + 1);
            console.log(currentPage);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMovies();
    }, []);

    let movies;

    if (getMovies !== null && !loading) {
        movies = getMovies.map((movie, index) => {
            const { poster_path, title } = movie;
            return (
                <div onClick={() => handleMovieClick(title)} className="movie_card" key={index}>
                    <div className="img-container">
                        <img className="movie_poster" src={IMGPATH + poster_path} alt="#" />
                    </div>

                    <h4 className="title">{title}</h4>
                </div>
            );
        });
    }

    //For movie search
    let searchMovieList;

    if (searchMovieData && searchMovieData.Response === 'True') {
        searchMovieList = searchMovieData.Search.filter((movie) => movie.Type !== 'game').map(
            (movie, index) => {
                const { Title, Poster } = movie;
                return (
                    <div
                        onClick={() => handleMovieClick(Title)}
                        className="searchMovies"
                        key={index}
                    >
                        <div className="img-container">
                            {' '}
                            <img src={Poster} className="movie_poster" />
                        </div>

                        <h4 className="title">{Title}</h4>
                    </div>
                );
            }
        );
    }
    //For Modal data-title

    const handleMovieClick = async (title) => {
        try {
            const res = await fetch(MOVIELINK + title);
            const data = await res.json();
            if (data.Response === 'False') {
                setError('Movie info not available');
                throw new Error(`Movie not found: ${res.status}`);
            }
            setError(null);
            setSelectMovie(title);
        } catch (error) {
            console.error(error);
            setSelectMovie(null);
        }
    };

    return (
        <>
            {selectMovie && <Modal title={selectMovie} onClose={() => setSelectMovie(null)} />}
            {selectMovie === null && (
                <div id="movies">{!isSearching && !searchMovieData ? movies : searchMovieList}</div>
            )}
            {!selectMovie && (
                <div className="load-more">
                    <button className="load-movies" onClick={fetchMovies}>
                        Load more
                    </button>
                </div>
            )}
        </>
    );
}
