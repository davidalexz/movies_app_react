import './App.css';
import Movies from '../Components/Movies';
import Search from '../Components/Search';
import { useState } from 'react';
// import testData from './test_data.json';
// import { APIURL, IMGPATH, SEARCHAPI } from './data.js';

export default function App() {
    const [newData, setNewData] = useState(null);
    console.log(newData);

    return (
        <>
            <Search searchMovieData={setNewData} />
            <Movies />
        </>
    );
}
