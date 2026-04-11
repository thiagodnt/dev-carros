import { useEffect, useState } from 'react';
import { Button } from '../../components/button';
import { Container } from '../../components/container';
import { Input } from '../../components/input';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { Spinner } from '../../components/loader/spinner';

interface CarProps {
	id: string;
	ownerUid: string;
	city: string;
	name: string;
	year: string | number;
	km: number;
	price: number;
	images: CarImageDTO[];
}

interface CarImageDTO {
	name: string;
	owner_uid: string;
	storage_url: string;
}

export function Home() {
	const [cars, setCars] = useState<CarProps[]>([]);
	const [loadedImages, setLoadedImages] = useState<string[]>([]);

	useEffect(() => {
		async function getCars() {
			const carsRef = collection(db, 'cars');
			const queryRef = query(carsRef, orderBy('created_at', 'desc'));

			try {
				let carsList = [] as CarProps[];
				const snapshot = await getDocs(queryRef);
				snapshot.forEach((doc) => {
					carsList.push({
						id: doc.id,
						ownerUid: doc.data().owner_uid,
						city: doc.data().city,
						name: doc.data().name,
						year: doc.data().year,
						km: doc.data().km,
						price: doc.data().price,
						images: doc.data().images,
					});
				});

				setCars(carsList);
			} catch (error) {
				console.log(error);
				toast.error('Erro ao obter os carros disponíveis');
			}
		}

		getCars();
	}, []);

	function handleLoadedImages(id: string) {
		setLoadedImages((prevLoadedImages) => [...prevLoadedImages, id]);
	}

	return (
		<Container>
			<section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-4">
				<Input type="text" placeholder="Pesquisar carro..." />
				<Button>Buscar</Button>
			</section>
			<h1 className="font-bold text-center my-6 text-2xl">
				Carros novos e usados em todo o Brasil
			</h1>
			<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
				{cars.map((car) => (
					<Link key={car.id} to={`/car/${car.id}`}>
						<section className="w-full bg-white rounded-lg hover:scale-105 transition-all duration-300 shadow-xl">
							<div
								className="w-full h-48 flex justify-center items-center bg-zinc-200"
								style={{ display: loadedImages.includes(car.id) ? 'none' : 'flex' }}
							>
								<Spinner />
							</div>
							<img
								src={car.images[0].storage_url}
								alt={car.name}
								className="w-full h-48 object-cover rounded-t-lg"
								onLoad={() => handleLoadedImages(car.id)}
								style={{ display: loadedImages.includes(car.id) ? 'block' : 'none' }}
							/>

							<p className="font-bold mt-1 px-2">{car.name}</p>

							<div className="flex flex-col px-2">
								<span className="text-zinc-700 mb-4">
									Ano {car.year} | {car.km} km
								</span>
								<strong className="font-medium text-xl">
									{Number(car.price).toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
								</strong>
							</div>

							<div className="w-full bg-zinc-300 h-px my-2"></div>

							<div className="px-2 pb-2">
								<span className="text-zinc-700">{car.city}</span>
							</div>
						</section>
					</Link>
				))}
			</main>
		</Container>
	);
}
