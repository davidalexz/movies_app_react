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
                console.log(data);
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
                    <button onClick={onClose}>X</button>
                    <div className="modal_content">
                        <h2 className="modal_title">{movieData.Title}</h2>
                        <small className="modal_rating">{movieData.Title}</small>
                        <p className="modal_genre">{movieData.Genre}</p>
                        <img src={movieData.Poster} alt="modal_poster" className="modal_poster" />
                    </div>
                </div>
            )}
        </>
    );
}
