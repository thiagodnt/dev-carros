import { Link } from 'react-router';

export function Panel() {
	return (
		<div className="w-full h-12 px-4 mb-4 rounded-lg bg-red-600 text-white font-medium flex items-center gap-4">
			<Link
				to="/"
				className="py-1 px-2 rounded-lg hover:bg-red-700 transition-colors duration-500"
			>
				Home
			</Link>
			<Link
				to="/dashboard"
				className="py-1 px-2 rounded-lg hover:bg-red-700 transition-colors duration-500"
			>
				Meus Carros
			</Link>
			<Link
				to="/dashboard/new"
				className="py-1 px-2 rounded-lg hover:bg-red-700 transition-colors duration-500"
			>
				Anunciar Carro
			</Link>
		</div>
	);
}
