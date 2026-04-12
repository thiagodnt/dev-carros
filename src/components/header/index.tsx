import { Link, useNavigate } from 'react-router';
import logo from '../../assets/logo.png';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
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
		<div className="w-full flex justify-center items-center bg-white mb-4">
			<header className="w-full max-w-7xl flex justify-between items-center px-2">
				<Link to="/">
					<img className="w-40 h-16 object-contain" src={logo} alt="Logo DevCarros" />
				</Link>
				{!loadingAuth && signed && (
					<button
						className="border-2 border-gray-900 rounded-full p-1 cursor-pointer"
						onClick={handleLogout}
					>
						<FiLogOut size={22} color="#101828" />
					</button>
				)}

				{!loadingAuth && !signed && (
					<Link className="border-2 border-gray-900 rounded-full p-1" to="/login">
						<FiLogIn size={22} color="#101828" />
					</Link>
				)}
			</header>
		</div>
	);
}
