import axios from 'axios';

export default axios.create({
    baseURL: 'https://app-of-tests.firebaseio.com/'
})