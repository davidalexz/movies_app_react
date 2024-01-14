import { useEffect, useState } from 'react';
import { MOVIELINK } from '../src/data';

export default function Modal({ title, onClose }) {
    const [movieData, setMovieData] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(MOVIELINK + title);
                const data = await res.json();
                setMovieData(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovie();
    }, [title]);

    return (
        <>
            {movieData && (
                <div className="modal">
                    <button className="close_modal" onClick={onClose}>
                        X
                    </button>
                    <div className="modal_header">
                        <h2 className="modal_title">{movieData.Title}</h2>
                        <small className="modal_rating">imdb Rating: {movieData.imdbRating}</small>
                        <small className="modal_genre">{movieData.Genre}</small>
                    </div>
                    <div className="modal_content">
                        <img src={movieData.Poster} alt="modal_poster" className="modal_poster" />
                        <div className="modal_cast">
                            <ul className="director">
                                <strong>Director: </strong>
                                {movieData.Director.split(', ').map((director, index) => (
                                    <li key={index}>{director}</li>
                                ))}
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
                        <p>About movie</p>
                        <p className="about_movie">{movieData.Plot}</p>
                    </div>
                </div>
            )}
        </>
    );
}
