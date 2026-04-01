import { v4 as uuidV4 } from 'uuid';
import { api } from './api';

interface UploadResponse {
	secure_url: string;
}

interface UploadFileResponse {
	url: string;
	name: string;
}

export async function uploadFile(file: File, uid: string): Promise<UploadFileResponse> {
	const formData = new FormData();
	const filename = uuidV4();

	formData.append('file', file);
	formData.append('upload_preset', import.meta.env.VITE_STORAGE_PRESET);
	formData.append('folder', `dev-carros/${uid}`);
	formData.append('public_id', filename);

	const { data } = await api.post<UploadResponse>('/auto/upload/', formData);

	return {
		url: data.secure_url,
		name: filename,
	};
}
