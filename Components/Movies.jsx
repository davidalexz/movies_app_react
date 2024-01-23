import { APIURL, IMGPATH, SEARCHAPI, MOVIELINK } from '../src/data';
import Modal from './Modal';
import { useState, useEffect, useMemo } from 'react';

export default function Movies({ searchMovieData }) {
    const [selectMovie, setSelectMovie] = useState(null);
    const [startMovies, setStartMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalError, setModalError] = useState(null);

    console.log('Movies component rendered');

    const imgFail = 'https://www.brepols.net/files/product/cover.png';

    const movieList = async () => {
        try {
            const res = await fetch(APIURL);
            const data = await res.json();
            return data.results;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const memoizedMovieList = useMemo(() => movieList(), []);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!startMovies) {
                try {
                    const movies = await movieList();
                    setStartMovies(movies);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMovies();
    }, [startMovies, memoizedMovieList]);

    let movies;

    if (startMovies !== null && !loading) {
        movies = startMovies.map((movie) => {
            const { poster_path, title, id } = movie;
            return (
                <div onClick={() => handleMovieClick(title)} className="movie_card" key={id}>
                    <img className="movie_poster" src={IMGPATH + poster_path} alt="#" />
                    <h4 className="title">{title}</h4>
                </div>
            );
        });
    }

    let searchMovieList;

    if (searchMovieData && searchMovieData.Response === 'True') {
        searchMovieList = searchMovieData.Search.filter((movie) => movie.Type !== 'game').map(
            (movie) => {
                const { Title, imdbID, Poster } = movie;
                return (
                    <div
                        onClick={() => handleMovieClick(Title)}
                        className="searchMovies"
                        key={imdbID}
                    >
                        {Poster ? (
                            <img src={Poster} className="movie_poster" />
                        ) : (
                            <img src={imgFail} className="movie_poster" />
                        )}
                        <h4 className="title">{Title}</h4>
                    </div>
                );
            }
        );
    }

    const handleMovieClick = async (title) => {
        try {
            const res = await fetch(MOVIELINK + title);
            const data = await res.json();
            if (data.Response === 'False') {
                setModalError('Movie info not available');
                throw new Error(`Movie not found: ${res.status}`);
            }
            setModalError(null);
            setSelectMovie(title);
        } catch (error) {
            console.error(error);
            setSelectMovie(null);
        }
    };

    return (
        <>
            {selectMovie && <Modal title={selectMovie} onClose={() => setSelectMovie(null)} />}
            {modalError && <div>Movie is not available</div>}

            {selectMovie === null && (
                <div id="movies">{!searchMovieData ? movies : searchMovieList}</div>
            )}
        </>
    );
}
