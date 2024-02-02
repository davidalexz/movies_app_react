import { APIURL, STARTMOVIES } from './data';
import './App.css';

import Movies from '../Components/Movies';
import Search from '../Components/Search';
import logo from './assets/movie-city-1.svg';
import { useState, useEffect } from 'react';

export default function App() {
    const [homeClicked, setHomeClicked] = useState(false);
    const [newData, setNewData] = useState(null); //store result from movie search
    const [selectMovie, setSelectMovie] = useState(null); //lifted state from Movies so that we can also pass it to Search in handleKeyPres function for error handling
    const [getMovies, setGetMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInitialMovies = async () => {
        try {
            const res = await fetch(STARTMOVIES);
            const data = await res.json();
            setGetMovies(data.results);
            setCurrentPage(1);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    //FIXME - when clicking the home button in Search screen - movies are not loaded

    const movieList = async () => {
        try {
            const res = await fetch(APIURL + currentPage);
            const data = await res.json();
            return data.results;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const fetchMovies = async () => {
        try {
            const moviesList = await movieList();
            setGetMovies((prevMovies) => [...prevMovies, ...moviesList]);
            setCurrentPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleHomeClick = () => {
        setHomeClicked(!homeClicked);
        setNewData(null);
        setSelectMovie(null);
        setGetMovies([]);
        setIsSearching(false);
        fetchInitialMovies();
    };

    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);

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
                getMovies={getMovies}
                fetchMovies={fetchMovies}
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
