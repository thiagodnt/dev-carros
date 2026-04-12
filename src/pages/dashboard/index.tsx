import { useContext, useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { Panel } from '../../components/Panel';
import type { CarProps } from '../../types/car';
import { AuthContext } from '../../contexts/AuthContext';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection';
import { CarCard } from '../../components/CarCard';
import toast from 'react-hot-toast';

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

	async function handleDelete(id: string) {
		const docRef = doc(db, 'cars', id);
		try {
			await deleteDoc(docRef);
			setCars((prevCars) => prevCars.filter((car) => car.id !== id));
			toast.success('Anúncio deletado com sucesso');
		} catch (error) {
			console.log(error);
			toast.error('Erro ao deletar o anúncio. Por favor, tente novamente mais tarde');
		}
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
						isImageLoaded={loadedImages.includes(car.id)}
						km={car.km}
						name={car.name}
						showIcon={true}
						handleDelete={handleDelete}
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
