import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://burger-app-e0794.firebaseio.com/'
});

export default instance;