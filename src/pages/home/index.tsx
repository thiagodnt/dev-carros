import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Input } from '../../components/Input';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import toast from 'react-hot-toast';
import { Panel } from '../../components/Panel';
import type { CarProps } from '../../types/car';
import { CarCard } from '../../components/CarCard';
import { Link } from 'react-router';
import { LoaderOverlay } from '../../components/Loader/overlay';

export function Home() {
	const [cars, setCars] = useState<CarProps[]>([]);
	const [loadedImages, setLoadedImages] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

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
			} finally {
				setLoading(false);
			}
		}

		getCars();
	}, []);

	function handleLoadedImages(id: string) {
		setLoadedImages((prevLoadedImages) => [...prevLoadedImages, id]);
	}

	return (
		<Container>
			{loading && <LoaderOverlay />}
			<Panel />
			<section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-4">
				<Input type="text" placeholder="Pesquisar carro..." />
				<Button>Buscar</Button>
			</section>
			<h1 className="font-bold text-center my-6 text-2xl">
				Carros novos e usados em todo o Brasil
			</h1>
			<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
				{cars.map((car) => (
					<Link to={`/car/${car.id}`} key={car.id}>
						<CarCard
							city={car.city}
							id={car.id}
							imageUrl={car.images[0].storage_url}
							isImageLoaded={loadedImages.includes(car.id)}
							km={car.km}
							name={car.name}
							showIcon={false}
							onLoad={handleLoadedImages}
							price={car.price}
							year={car.year}
						/>
					</Link>
				))}
			</main>
		</Container>
	);
}
