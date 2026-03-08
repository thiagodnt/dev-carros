import { Button } from '../../components/button';
import { Container } from '../../components/container';
import { Input } from '../../components/input';

export function Home() {
	return (
		<Container>
			<section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-4">
				<Input type="text" placeholder="Pesquisar carro..." />
				<Button>Buscar</Button>
			</section>
			<h1 className="font-bold text-center my-6 text-2xl">Carros novos e usados em todo o Brasil</h1>
			<main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				<section className="w-full bg-white rounded-lg hover:scale-105 transition-all duration-300 shadow-xl">
					<img
						src="https://www.webmotors.com.br/wp-content/uploads/2022/11/17191500/Hyundai-HB20-x-Citroen-C3-Feel-76-scaled-1-e1673877183852.jpg"
						alt="Carro"
						className="w-full h-auto object-cover rounded-t-lg"
					/>

					<p className="font-bold mt-1 px-2">Hyundai HB20</p>

					<div className="flex flex-col px-2">
						<span className="text-zinc-700 mb-4">Ano 2016/2016 | 23.000 km</span>
						<strong className="font-medium text-xl">R$ 240.000</strong>
					</div>

					<div className="w-full bg-zinc-300 h-px my-2"></div>

					<div className="px-2 pb-2">
						<span className="text-zinc-700">São Paulo - SP</span>
					</div>
				</section>
			</main>
		</Container>
	);
}
