import { FiUpload } from 'react-icons/fi';
import { Container } from '../../../components/container';
import { Panel } from '../../../components/panel';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/input';
import { TextArea } from '../../../components/textarea';
import { Button } from '../../../components/button';
import { useContext, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthContext';
import { uploadFile } from '../../../services/upload';

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

export function RegisterNewCar() {
	const { user } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onBlur',
	});

	function onSubmit(data: FormData) {
		console.log(data);
	}

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

		await uploadFile(file, user.uid);
	}

	return (
		<Container>
			<Panel />

			<div className="w-full bg-white p-3 mb-4 rounded-lg flex flex-col sm:flex-row items-center gap-2">
				<button className="border-2 h-32 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600">
					<div className="absolute cursor-pointer">
						<FiUpload size={30} color="#000" />
					</div>
					<div className="cursor-pointer">
						<input
							type="file"
							accept="image/*"
							className="opacity-0 cursor-pointer"
							onChange={handleFile}
						/>
					</div>
				</button>
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
