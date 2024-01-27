import './App.css';
import Movies from '../Components/Movies';
import Search from '../Components/Search';
import logo from './assets/movie-city-1.svg';
import { useState } from 'react';

export default function App() {
    const [newData, setNewData] = useState(null);
    const [homeClicked, setHomeClicked] = useState(false);

    const handleHomeClick = () => {
        setHomeClicked(!homeClicked);
        setNewData(null);
    };

    return (
        <>
            <button className="home-btn" onClick={handleHomeClick}>
                <img src={logo} className="page-logo" alt="" srcset="" />
            </button>
            <Search searchMovieData={setNewData} />
            <Movies key={homeClicked} searchMovieData={newData} />
        </>
    );
}
