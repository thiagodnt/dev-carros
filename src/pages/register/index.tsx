import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router';
import { Container } from '../../components/container';
import { Input } from '../../components/input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/button';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import toast from 'react-hot-toast';

type FormData = z.infer<typeof schema>;

const schema = z.object({
	name: z.string().min(1, 'O campo nome é obrigatório'),
	email: z
		.string()
		.min(1, 'O campo e-mail é obrigatório')
		.pipe(z.email('Insira um e-mail válido')),
	password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
});

export function Register() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onBlur',
	});

	async function onSubmit(data: FormData) {
		try {
			const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
			await updateProfile(newUser.user, {
				displayName: data.name,
			});
			toast.success('Cadastro realizado com sucesso.');
			navigate('/dashboard', { replace: true });
		} catch (error) {
			console.log(error);
			toast.error(
				<div>
					Erro ao criar conta!
					<br />
					Por favor, tente novamente mais tarde.
				</div>,
			);
		}
	}

	return (
		<Container>
			<div className="w-full min-h-screen flex flex-col justify-center items-center gap-4">
				<Link to="/" className="mb-6 max-w-sm w-full">
					<img src={logo} alt="Logo" className="w-full h-auto object-contain" />
				</Link>
				<form
					className="bg-white rounded-lg p-4 w-full max-w-xl flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Input
						type="text"
						placeholder="Nome completo"
						error={errors.name?.message}
						{...register('name')}
					/>

					<Input
						type="email"
						placeholder="email@exemplo.com"
						error={errors.email?.message}
						{...register('email')}
					/>

					<Input
						type="password"
						placeholder="********"
						error={errors.password?.message}
						{...register('password')}
					/>

					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Carregando...' : 'Cadastrar'}
					</Button>
				</form>
				<Link to="/login">Já possui uma conta? Faça login</Link>
			</div>
		</Container>
	);
}
