import './App.css';
import Movies from '../Components/Movies';
import Search from '../Components/Search';
import logo from './assets/movie-city-1.svg';
import { useState } from 'react';

export default function App() {
    const [newData, setNewData] = useState(null); //store result from movie search
    const [homeClicked, setHomeClicked] = useState(false);
    const [selectMovie, setSelectMovie] = useState(null); //lifted state from Movies so that we can also pass it to Search in handleKeyPres function for error handling
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const handleHomeClick = () => {
        setHomeClicked(!homeClicked);
        setNewData(null);
        setSelectMovie(null);
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
                setSelectMovie={setSelectMovie}
                setIsSearching={setIsSearching}
            />
            <Movies
                error={error}
                setError={setError}
                key={homeClicked}
                searchMovieData={newData}
                selectMovie={selectMovie}
                setSelectMovie={setSelectMovie}
                isSearching={isSearching}
            />
        </>
    );
}
