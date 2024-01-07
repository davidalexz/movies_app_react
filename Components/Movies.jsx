import testData from '../src/test_data.json';
import { APIURL, IMGPATH, SEARCHAPI } from '../src/data';

export default function Movies({ movieData }) {
    const movieList = testData.results.map((movie) => {
        const { original_title, poster_path, id } = movie;

        function goToLink() {
            console.log('Clicked ' + original_title);
        }
        return (
            <div onClick={goToLink} className="movie_card" key={id}>
                <img className="movie_poster" src={IMGPATH + poster_path} alt="poster" />
                <h4 className="title">{original_title}</h4>
            </div>
        );
    });

    return (
        <>
            <div id="movies">{movieList}</div>
        </>
    );
}
