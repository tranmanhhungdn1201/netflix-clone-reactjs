import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import movieApi from '../../api/movieApi';
import './Banner.scss';

Banner.propTypes = {
    
};

function Banner(props) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await movieApi.getNetflixOriginal();
            const movies = data.results;
            const movie = movies[Math.floor(Math.random() * movies.length)];
            setMovie(movie);
            console.log('banner', );
        }
        fetchData();
    }, [])

    const truncate = (str, num = 150) => {
        return str?.length > num ? str.slice(0, num - 1) + '...' : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview)}</h1>

            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner;