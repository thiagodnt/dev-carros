import logo from '../../assets/logo.png';
import { Link } from 'react-router';
import { Container } from '../../components/container';
import { Input } from '../../components/input';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/button';

type FormData = z.infer<typeof schema>;

const schema = z.object({
	email: z
		.string()
		.min(1, 'O campo e-mail é obrigatório')
		.pipe(z.email('Insira um e-mail válido')),
	password: z.string().min(1, 'O campo senha é obrigatório'),
});

export function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		mode: 'onBlur',
	});

	function onSubmit(data: FormData) {
		console.log(data);
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

					<Button type="submit">Acessar</Button>
				</form>
				<Link to="/register">Não possui uma conta? Cadastre-se</Link>
			</div>
		</Container>
	);
}
