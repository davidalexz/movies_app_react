import './App.css';
import Movies from '../Components/Movies';
import Search from '../Components/Search';
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
            <button onClick={handleHomeClick}>Home</button>
            <Search searchMovieData={setNewData} />
            <Movies key={homeClicked} searchMovieData={newData} />
        </>
    );
}
