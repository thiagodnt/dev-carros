import axios from 'axios';

export const api = axios.create({
	baseURL: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_STORAGE_CLOUD_NAME}`,
});
