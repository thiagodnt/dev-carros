import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Input } from '../../components/Input';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import toast from 'react-hot-toast';
import { Panel } from '../../components/Panel';
import type { CarProps } from '../../types/car';
import { CarCard } from '../../components/CarCard';
import { Link } from 'react-router';
import { LoaderOverlay } from '../../components/Loader/overlay';
import { CarsEmptyState } from '../../components/CarsEmptyState';
import { FaCarSide } from 'react-icons/fa';

export function Home() {
	const [searchInput, setSearchInput] = useState('');
	const [cars, setCars] = useState<CarProps[]>([]);
	const [loadedImages, setLoadedImages] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getCars();
	}, []);

	async function getCars() {
		const carsRef = collection(db, 'cars');
		const queryRef = query(carsRef, orderBy('created_at', 'desc'));

		try {
			let carList = [] as CarProps[];
			const snapshot = await getDocs(queryRef);
			snapshot.forEach((doc) => {
				carList.push({
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

			setCars(carList);
		} catch (error) {
			console.log(error);
			toast.error('Erro ao obter os carros disponíveis');
		} finally {
			setLoading(false);
		}
	}

	function handleLoadedImages(id: string) {
		setLoadedImages((prevLoadedImages) => [...prevLoadedImages, id]);
	}

	async function handleSearch() {
		try {
			setLoading(true);

			if (searchInput === '') {
				await getCars();
				return;
			}

			setCars([]);
			setLoadedImages([]);

			const queryRef = query(
				collection(db, 'cars'),
				where('name', '>=', searchInput.toUpperCase()),
				where('name', '<=', searchInput.toUpperCase() + '\uf8ff'),
			);

			const snapshot = await getDocs(queryRef);
			let carList = [] as CarProps[];

			snapshot.forEach((doc) => {
				carList.push({
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

			setCars(carList);
		} catch (error) {
			console.log(error);
			toast.error('Erro ao buscar anúncios disponíveis. Por favor, tente novamente mais tarde');
		} finally {
			setLoading(false);
		}
	}

	return (
		<Container>
			{loading && <LoaderOverlay />}
			<Panel />
			<section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-4">
				<Input
					type="text"
					placeholder="Pesquisar carro..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Button onClick={handleSearch}>Buscar</Button>
			</section>
			<h1 className="font-bold text-center my-6 text-2xl">
				Carros novos e usados em todo o Brasil
			</h1>
			{!loading && cars.length === 0 && (
				<CarsEmptyState
					icon={<FaCarSide size={32} color="#212121" />}
					message="Nenhum carro encontrado"
				/>
			)}
			{!loading && cars.length > 0 && (
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
			)}
		</Container>
	);
}
