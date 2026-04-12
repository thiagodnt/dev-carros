export interface CarProps {
	id: string;
	ownerUid: string;
	city: string;
	name: string;
	year: string | number;
	km: number;
	price: number;
	images: CarImageDTO[];
}

export interface CarImageDTO {
	name: string;
	owner_uid: string;
	storage_url: string;
}
