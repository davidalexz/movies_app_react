import './App.css';
import Movies from '../Components/Movies';
import Search from '../Components/Search';
import { useState } from 'react';

export default function App() {
    const [newData, setNewData] = useState(null);
    // console.log(newData);

    return (
        <>
            <Search searchMovieData={setNewData} />
            <Movies searchMovieData={newData} />
        </>
    );
}
