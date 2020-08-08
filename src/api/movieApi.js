import requests from '../requests';
const { default: axiosClient } = require("./axiosClient");

const movieApi = {
    getMovies: (url, params) => {
        return axiosClient.get(url, { params });
    },
    getNetflixOriginal: (params) => {
        const url = requests.fetchNetflixOriginals;
        return axiosClient.get(url, { params });
    },
}

export default movieApi;