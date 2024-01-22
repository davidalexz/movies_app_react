import { APIURL, IMGPATH, SEARCHAPI } from '../src/data';
import Modal from './Modal';
import { useState, useEffect } from 'react';

export default function Movies({ searchMovieData }) {
    const [selectMovie, setSelectMovie] = useState(null);
    const [startMovies, setStartMovies] = useState(null);

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
    // useEffect(() => {
    //     if (!startMovies) {
    //         movieList(setStartMovies);
    //     }
    //     // movieList();
    // }, [startMovies]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (!startMovies) {
                const movies = await movieList();
                setStartMovies(movies);
            }
        };
        fetchMovies();
    }, [startMovies]);

    let movies;

    if (startMovies !== null) {
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

    const handleMovieClick = (title) => {
        setSelectMovie(title);
    };

    return (
        <>
            {selectMovie && <Modal title={selectMovie} onClose={() => setSelectMovie(null)} />}

            {selectMovie === null && (
                <div id="movies">{!searchMovieData ? movies : searchMovieList}</div>
            )}
        </>
    );
}
