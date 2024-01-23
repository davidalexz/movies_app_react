import { useEffect, useState } from 'react';
import { MOVIELINK } from '../src/data';

export default function Modal({ title, onClose }) {
    const [movieData, setMovieData] = useState(null);
    const [spinner, setSpinner] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            setSpinner(true);
            try {
                const res = await fetch(MOVIELINK + title);
                const data = await res.json();

                setSpinner(null);
                setMovieData(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovie();
    }, [title]);

    const imgFail = 'https://www.brepols.net/files/product/cover.png';

    return (
        <>
            {spinner ? (
                <div id="loading"></div>
            ) : (
                movieData && (
                    <div className="modal">
                        <button className="close_modal" onClick={onClose}>
                            <i className="fa-solid fa-x"></i>
                        </button>
                        <div className="modal_main">
                            <div className="modal_header">
                                <h2 className="modal_title">{movieData.Title}</h2>
                                <small className="modal_rating">
                                    imdb Rating: <p>{movieData.imdbRating}</p>
                                </small>
                                <small className="modal_genre">{movieData.Genre}</small>
                            </div>

                            <div className="modal_content">
                                {movieData.Poster ? (
                                    <img src={movieData.Poster} className="modal_poster" />
                                ) : (
                                    <img src={imgFail} className="modal_poster" />
                                )}
                                <div className="about_movie">
                                    <div className="intro_movie">
                                        <strong>About movie</strong>
                                        <p className="intro_text">{movieData.Plot}</p>
                                    </div>
                                    <div className="modal_cast">
                                        <ul className="director">
                                            <strong>Director: </strong>
                                            {movieData.Director.split(', ').map(
                                                (director, index) => (
                                                    <li key={index}>{director}</li>
                                                )
                                            )}
                                        </ul>
                                        <ul className="writers">
                                            <strong>Writers: </strong>
                                            {movieData.Writer.split(', ').map((writer, index) => (
                                                <li key={index}>{writer}</li>
                                            ))}
                                        </ul>
                                        <ul className="actors">
                                            <strong>Actors: </strong>
                                            {movieData.Actors.split(', ').map((actor, index) => (
                                                <li key={index}>{actor}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
