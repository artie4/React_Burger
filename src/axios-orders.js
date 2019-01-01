import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-repl.firebaseio.com/'
});

export default instance;

