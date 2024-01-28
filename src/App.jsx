import './App.css';
import Movies from '../Components/Movies';
import Search from '../Components/Search';
import logo from './assets/movie-city-1.svg';
import { useState } from 'react';

export default function App() {
    const [newData, setNewData] = useState(null); //store result from movie search
    const [homeClicked, setHomeClicked] = useState(false);
    const [error, setError] = useState(null);

    const handleHomeClick = () => {
        setHomeClicked(!homeClicked);
        setNewData(null);
    };

    return (
        <>
            <button className="home-btn" onClick={handleHomeClick}>
                <img src={logo} className="page-logo" alt="logo" />
            </button>
            <Search
                searchMovieData={setNewData}
                setError={setError}
                error={error}
                onCloseModal={handleHomeClick}
            />
            <Movies error={error} setError={setError} key={homeClicked} searchMovieData={newData} />
        </>
    );
}
