import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3", //"https://api.themoviedb.org/3/foo-bar"
});

// for example is for sending multiple different request and get data for example instance.get('/foo-bar');
export default instance;
// "hello"