import { useContext, useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { Panel } from '../../components/Panel';
import type { CarProps } from '../../types/car';
import { AuthContext } from '../../contexts/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { CarCard } from '../../components/CarCard';

export function Dashboard() {
	const [cars, setCars] = useState<CarProps[]>([]);
	const [loadedImages, setLoadedImages] = useState<string[]>([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		async function getUserCars() {
			if (!user?.uid) {
				return;
			}

			const carsRef = collection(db, 'cars');
			const queryRef = query(carsRef, where('owner_uid', '==', user.uid));

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
		}

		getUserCars();
	}, [user]);

	function handleLoadedImages(id: string) {
		setLoadedImages((prevLoadedImages) => [...prevLoadedImages, id]);
	}

	return (
		<Container>
			<Panel />
			<h1 className="font-bold text-center my-6 text-2xl">Meus anúncios</h1>
			<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
				{cars.map((car) => (
					<CarCard
						city={car.city}
						id={car.id}
						imageUrl={car.images[0].storage_url}
						isLoaded={loadedImages.includes(car.id)}
						km={car.km}
						name={car.name}
						onLoad={handleLoadedImages}
						price={car.price}
						year={car.year}
						key={car.id}
					/>
				))}
			</main>
		</Container>
	);
}
