import testData from '../src/test_data.json';
import { APIURL, IMGPATH, SEARCHAPI } from '../src/data';
import Modal from './Modal';
import { useState } from 'react';

export default function Movies({ searchMovieData }) {
    const [selectMovie, setSelectMovie] = useState(null);
    const movieList = testData.results.map((movie) => {
        const { original_title, poster_path, id } = movie;

        return (
            <div onClick={() => handleMovieClick(original_title)} className="movie_card" key={id}>
                <img className="movie_poster" src={IMGPATH + poster_path} alt="poster" />
                <h4 className="title">{original_title}</h4>
            </div>
        );
    });

    let searchMovieList;

    if (searchMovieData && searchMovieData.Response === 'True') {
        searchMovieList = searchMovieData.Search.filter((movie) => movie.Type !== 'game').map(
            (movie) => {
                const { Title, imdbID, Poster } = movie;
                console.log(searchMovieData);

                return (
                    <div
                        onClick={() => handleMovieClick(Title)}
                        className="searchMovies"
                        key={imdbID}
                    >
                        <img src={Poster} alt="poster" className="movie_poster" />
                        <h4 className="title">{Title}</h4>
                    </div>
                );
            }
        );
    }

    const handleMovieClick = (title) => {
        // console.log(SEARCHAPI + title);
        setSelectMovie(title);
    };

    return (
        <>
            <div id="movies">{!searchMovieData ? movieList : searchMovieList}</div>

            <Modal title={selectMovie} />
        </>
    );
}
