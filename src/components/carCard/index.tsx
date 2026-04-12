import { FiTrash2 } from 'react-icons/fi';
import { Spinner } from '../Loader/spinner';

interface CarCardProps {
	id: string;
	name: string;
	year: string | number;
	km: number;
	price: number;
	city: string;
	imageUrl: string;
	isLoaded: boolean;
	onLoad: (id: string) => void;
}

export function CarCard(props: CarCardProps) {
	return (
		<section className="w-full bg-white rounded-lg hover:scale-105 transition-all duration-300 shadow-xl relative">
			<button
				type="button"
				className="absolute bg-white rounded-full p-2 cursor-pointer z-10 right-1 top-1 shadow-xl"
				onClick={() => {}}
			>
				<FiTrash2 size={24} color="#000" />
			</button>
			<div
				className="w-full h-48 flex justify-center items-center bg-zinc-200"
				style={{ display: props.isLoaded ? 'none' : 'flex' }}
			>
				<Spinner />
			</div>
			<img
				src={props.imageUrl}
				alt={props.name}
				className="w-full h-48 object-cover rounded-t-lg"
				onLoad={() => props.onLoad(props.id)}
				style={{ display: props.isLoaded ? 'block' : 'none' }}
			/>

			<p className="font-bold mt-1 px-2">{props.name}</p>

			<div className="flex flex-col px-2">
				<span className="text-zinc-700 mb-4">
					Ano {props.year} | {props.km} km
				</span>
				<strong className="font-medium text-xl">
					{Number(props.price).toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</strong>
			</div>

			<div className="w-full bg-zinc-300 h-px my-2"></div>

			<div className="px-2 pb-2">
				<span className="text-zinc-700">{props.city}</span>
			</div>
		</section>
	);
}
