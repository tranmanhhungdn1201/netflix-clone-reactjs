import React, { useState, useEffect } from 'react';
import movieApi from '../../../api/movieApi';
import PropTypes from 'prop-types';
import './Row.scss';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

Row.propTypes = {
    title: PropTypes.string,
    fetchUrl: PropTypes.string,
    isLargeRow: PropTypes.bool,
};

Row.defaultProps = {
    title: '',
    fetchUrl: '',
    isLargeRow: false
}
const baseUrl = 'https://image.tmdb.org/t/p/original/';

function Row(props) {
    const { title, fetchUrl, isLargeRow} = props;
    const [ movies, setMovives ]= useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await movieApi.getMovies(fetchUrl);
                setMovives(data.results);
            } catch (error) {
                console.log('Fetch movie api fails: ', error.message);
            }
        }
        fetchMovie();
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }
    const handleClick = (movie) =>{
        if (trailerUrl){
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || '')
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    }
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
                        src={`${baseUrl}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
        </div>
    );
}

export default Row;