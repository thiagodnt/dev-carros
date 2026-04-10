import { FiUpload } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { Container } from '../../../components/container';
import { Panel } from '../../../components/panel';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/input';
import { TextArea } from '../../../components/textarea';
import { Button } from '../../../components/button';
import { useContext, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthContext';
import { uploadFile } from '../../../services/upload';
import { IconButton } from '../../../components/iconButton';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../services/firebaseConnection';

const schema = z.object({
	name: z.string().min(1, 'O campo nome é obrigatório'),
	model: z.string().min(1, 'O campo modelo é obrigatório'),
	year: z.string().min(1, 'O campo ano é obrigatório'),
	km: z.string().min(1, 'O campo km é obrigatório'),
	price: z.string().min(1, 'O campo preço é obrigatório'),
	city: z.string().min(1, 'O campo cidade é obrigatório'),
	whatsapp: z
		.string()
		.min(1, 'O campo telefone/whatsapp é obrigatório')
		.refine((value) => /^(\d{11,12})$/.test(value), {
			message: 'Número de telefone inválido',
		}),
	description: z.string().min(1, 'O campo descrição é obrigatório'),
});

type FormData = z.infer<typeof schema>;

interface CarImageProps {
	name: string;
	uid: string;
	previewUrl: string;
	storageUrl: string;
}

export function RegisterNewCar() {
	const { user } = useContext(AuthContext);
	const [carImages, setCarImages] = useState<CarImageProps[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onBlur',
	});

	async function onSubmit(data: FormData) {
		const images = carImages.map((car) => {
			return {
				name: car.name,
				uid: car.uid,
				storage_url: car.storageUrl,
			};
		});
		try {
			await addDoc(collection(db, 'cars'), {
				images: images,
				name: data.name,
				model: data.model,
				year: data.year,
				km: data.km,
				price: data.price,
				city: data.city,
				whatsapp: data.whatsapp,
				description: data.description,
				created_at: new Date(),
				owner: user?.name,
				owner_uid: user?.uid,
			});

			reset();
			setCarImages([]);
			toast.success('Carro cadastrado com sucesso!');
		} catch (error) {
			console.log(error);
			toast.error('Erro ao cadastrar carro. Por favor, tente novamente mais tarde');
		}
	}

	// Se deletar e tentar fazer o upload da mesma foto que foi deletada, não acontece nada (Provalvelmente por conta do evento que é OnChange)
	async function handleFile(e: ChangeEvent<HTMLInputElement>) {
		if (e.target?.files && e.target?.files[0]) {
			const file = e.target.files[0];
			const allowedTypes = ['image/jpeg', 'image/png'];

			if (!allowedTypes.includes(file.type)) {
				toast.error('A imagem deve estar em dos seguintes formatos: .png ou .jpeg');
				return;
			}

			await handleUpload(file);
		}
	}

	async function handleUpload(file: File) {
		if (!user?.uid) {
			return;
		}

		try {
			const data = await uploadFile(file, user.uid);
			const newImageItem: CarImageProps = {
				name: data.name,
				uid: user.uid,
				previewUrl: URL.createObjectURL(file),
				storageUrl: data.url,
			};

			setCarImages((images) => [...images, newImageItem]);
		} catch (error) {
			console.log(error);
		}
	}

	function handleDeleteImage(item: CarImageProps) {
		setCarImages((prev) => prev.filter((car) => car.name !== item.name));
	}

	function optimizeImage(url: string) {
		return url.replace('/upload/', '/upload/f_auto/');
	}

	function getImageSrc(car: CarImageProps) {
		if (car.storageUrl) {
			return optimizeImage(car.storageUrl);
		}

		return car.previewUrl;
	}

	return (
		<Container>
			<Panel />

			<div className="w-full bg-white p-3 mb-4 rounded-lg flex flex-col sm:flex-row items-center gap-2">
				<button className="border-2 h-32 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600">
					<div className="absolute cursor-pointer">
						<FiUpload size={30} color="#000" />
					</div>
					<div className="cursor-pointer h-full">
						<input
							type="file"
							accept="image/*"
							className="opacity-0 cursor-pointer h-full"
							onChange={handleFile}
						/>
					</div>
				</button>
				{carImages.map((car) => (
					<div
						key={car.name}
						className="w-full h-32 rounded-lg flex items-center justify-center overflow-hidden relative"
					>
						<IconButton
							className="absolute cursor-pointer z-10"
							onClick={() => handleDeleteImage(car)}
						>
							<FaTrash size={28} color="#FFF" />
						</IconButton>
						<img
							src={getImageSrc(car)}
							alt="Foto do carro"
							className="w-full h-32 object-cover transition-transform duration-300 hover:scale-110"
						/>
					</div>
				))}
			</div>

			<div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row">
				<form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
					<div className="w-full flex items-center mb-3 gap-4">
						<div className="w-full">
							<p className="mb-2 font-medium">Nome do carro</p>
							<Input
								type="text"
								placeholder="Nome do carro"
								error={errors.name?.message}
								{...register('name')}
							/>
						</div>

						<div className="w-full">
							<p className="mb-2 font-medium">Modelo do carro</p>
							<Input
								type="text"
								placeholder="Modelo do carro"
								error={errors.model?.message}
								{...register('model')}
							/>
						</div>
					</div>

					<div className="w-full flex items-center mb-3 gap-4">
						<div className="w-full">
							<p className="mb-2 font-medium">Ano</p>
							<Input
								type="text"
								placeholder="Ex: 2018/2019"
								error={errors.year?.message}
								{...register('year')}
							/>
						</div>

						<div className="w-full">
							<p className="mb-2 font-medium">Preço</p>
							<Input
								type="text"
								placeholder="Ex: 290300"
								error={errors.price?.message}
								{...register('price')}
							/>
						</div>

						<div className="w-full">
							<p className="mb-2 font-medium">KM rodados</p>
							<Input
								type="text"
								placeholder="Ex: 25800"
								error={errors.km?.message}
								{...register('km')}
							/>
						</div>
					</div>

					<div className="w-full flex items-center mb-3 gap-4">
						<div className="w-full">
							<p className="mb-2 font-medium">Telefone para contato (Whatsapp)</p>
							<Input
								type="text"
								placeholder="Ex: 011912345678"
								error={errors.whatsapp?.message}
								{...register('whatsapp')}
							/>
						</div>

						<div className="w-full">
							<p className="mb-2 font-medium">Cidade</p>
							<Input
								type="text"
								placeholder="Ex: São Paulo - SP"
								error={errors.city?.message}
								{...register('city')}
							/>
						</div>
					</div>

					<div className="w-full mb-3">
						<p className="mb-2 font-medium">Descrição</p>
						<TextArea
							rows={5}
							placeholder="Digite a descrição sobre o carro..."
							error={errors.description?.message}
							{...register('description')}
						/>
					</div>

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
					</Button>
				</form>
			</div>
		</Container>
	);
}
