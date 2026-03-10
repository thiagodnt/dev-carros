import { Link, useNavigate } from 'react-router';
import logo from '../../assets/logo.png';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { IconButton } from '../iconButton';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import toast from 'react-hot-toast';

export function Header() {
	const navigate = useNavigate();
	const { signed, loadingAuth } = useContext(AuthContext);

	async function handleLogout() {
		await signOut(auth);
		navigate('/login', { replace: true });
		toast.success('Usuário deslogado com sucesso');
	}

	return (
		<div className="w-full flex justify-center items-center bg-white mb-2">
			<header className="w-full max-w-7xl flex justify-between items-center px-2">
				<Link to="/">
					<img className="w-40 h-16 object-contain" src={logo} alt="Logo DevCarros" />
				</Link>
				{!loadingAuth && signed && (
					<IconButton onClick={handleLogout}>
						<FiLogOut size={22} color="#101828" />
					</IconButton>
				)}

				{!loadingAuth && !signed && (
					<IconButton to="/login">
						<FiLogIn size={22} color="#101828" />
					</IconButton>
				)}
			</header>
		</div>
	);
}
