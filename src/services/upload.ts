import { v4 as uuidV4 } from 'uuid';
import { api } from './api';

interface UploadResponse {
	secure_url: string;
}

export async function uploadFile(file: File, uid: string) {
	const formData = new FormData();

	formData.append('file', file);
	formData.append('upload_preset', import.meta.env.VITE_STORAGE_PRESET);
	formData.append('folder', uid);
	formData.append('public_id', uuidV4());

	const { data } = await api.post<UploadResponse>('/auto/upload', formData);

	return data.secure_url;
}
