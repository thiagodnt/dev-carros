import { FaWhatsapp } from 'react-icons/fa';
import { Container } from '../../components/Container';
import { useEffect, useState } from 'react';
import { Panel } from '../../components/Panel';
import type { CarImageDTO } from '../../types/car';
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import toast from 'react-hot-toast';
import { LoaderOverlay } from '../../components/Loader/overlay';

interface CarDTO {
	city: string;
	created_at: string;
	description: string;
	km: number;
	model: string;
	name: string;
	owner: string;
	owner_id: string;
	price: number;
	whatsapp: number;
	year: string | number;
	images: CarImageDTO;
}

export function CarDetails() {
	const { id } = useParams();
	const [car, setCar] = useState<CarDTO>();

	useEffect(() => {
		async function getCar() {
			if (!id) {
				return;
			}

			const docRef = doc(db, 'cars', id);
			try {
				const snapshot = await getDoc(docRef);
				setCar({
					city: snapshot.data()?.city,
					created_at: snapshot.data()?.created_at,
					description: snapshot.data()?.description,
					km: snapshot.data()?.km,
					model: snapshot.data()?.model,
					name: snapshot.data()?.name,
					owner: snapshot.data()?.owner,
					owner_id: snapshot.data()?.owner_id,
					price: snapshot.data()?.price,
					whatsapp: snapshot.data()?.whatsapp,
					year: snapshot.data()?.year,
					images: snapshot.data()?.images,
				});
			} catch (error) {
				console.log(error);
				toast.error('Erro ao obter detalhes do anúncio. Por favor, tente novamente mais tarde');
			}
		}

		getCar();
	}, [id]);

	return (
		<Container>
			{!car && <LoaderOverlay />}
			<Panel />
			<h1>SLIDER</h1>
			{car && (
				<main className="w-full bg-white my-4 p-6 rounded-lg">
					<div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
						<h1 className="font-bold text-3xl text-primary">{car?.name}</h1>
						<h1 className="font-bold text-3xl text-primary">
							{Number(car?.price).toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</h1>
					</div>
					<p>{car.model}</p>

					<div className="flex w-full gap-6 my-4">
						<div className="flex flex-col gap-4">
							<div>
								<p>Cidade</p>
								<strong>{car.city}</strong>
							</div>
							<div>
								<p>Ano</p>
								<strong>{car.year}</strong>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<div>
								<p>KM</p>
								<strong>{car.km}</strong>
							</div>
						</div>
					</div>

					<strong>Descrição</strong>
					<p className="mb-4">{car.description}</p>

					<strong>Telefone / Whatsapp</strong>
					<p>{car.whatsapp}</p>

					<a
						href="#"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-green-500 hover:bg-green-600 w-full text-white flex items-center justify-center gap-2 mt-6 h-11 text-xl rounded-lg font-medium duration-300"
					>
						Conversar com o vendedor
						<FaWhatsapp size={24} color="#FFF" />
					</a>
				</main>
			)}
		</Container>
	);
}
