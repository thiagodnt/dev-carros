import logo from '../../assets/logo.png';
import toast from 'react-hot-toast';

import { Link, useNavigate } from 'react-router';
import { Container } from '../../components/container';
import { Input } from '../../components/input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/button';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import { FirebaseError } from 'firebase/app';

type FormData = z.infer<typeof schema>;

const schema = z.object({
	email: z
		.string()
		.min(1, 'O campo e-mail é obrigatório')
		.pipe(z.email('Insira um e-mail válido')),
	password: z.string().min(1, 'O campo senha é obrigatório'),
});

export function Login() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onBlur',
	});

	async function onSubmit(data: FormData) {
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			toast.success('Login realizado com sucesso');
			navigate('/dashboard', { replace: true });
		} catch (error) {
			const errorCode = (error as FirebaseError).code;
			let errorMessage = (error as FirebaseError).message;

			switch (errorCode) {
				case 'auth/user-not-found':
				case 'auth/invalid-credential':
					toast.error('Email ou senha inválidos');
					break;
				default:
					toast.error('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde');
					break;
			}

			console.log(errorMessage);
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
						{isSubmitting ? 'Acessando...' : 'Acessar'}
					</Button>
				</form>
				<Link to="/register">Não possui uma conta? Cadastre-se</Link>
			</div>
		</Container>
	);
}
