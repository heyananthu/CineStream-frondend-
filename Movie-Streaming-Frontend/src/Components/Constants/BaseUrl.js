import axios from 'axios';

const axiosInstance = axios.create({

//server api
  
  // baseURL: 'http://hybrid.srishticampus.in:4024/movie_streaming_api/', 


//local api

baseURL: 'http://localhost:4024/movie_streaming_api/', 

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance