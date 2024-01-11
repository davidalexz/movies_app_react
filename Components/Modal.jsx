import { useEffect, useState } from 'react';
import { APIURL, IMGPATH, SEARCHAPI, MOVIELINK } from '../src/data';

export default function Modal({ title, onClose }) {
    const [movieData, setMovieData] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                if (title) {
                    const res = await fetch(MOVIELINK + title);
                    const data = res.json();
                    console.log(data);
                    setMovieData(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovie();
    }, [title]);

    return <div className="modal"></div>;
}
