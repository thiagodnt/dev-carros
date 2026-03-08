import { Link } from 'react-router';
import logo from '../../assets/logo.png';
import { FiLogIn, FiUser } from 'react-icons/fi';

export function Header() {
	const signed = false;
	const loadingAuth = false;

	return (
		<div className="w-full flex justify-center items-center bg-white mb-2">
			<header className="w-full max-w-7xl flex justify-between items-center px-2">
				<Link to="/">
					<img className="w-40 h-16 object-contain" src={logo} alt="Logo DevCarros" />
				</Link>
				{!loadingAuth && signed && (
					<Link to="/dashboard">
						<div className="border-2 border-gray-900 rounded-full p-1">
							<FiUser size={22} color="#101828" />
						</div>
					</Link>
				)}

				{!loadingAuth && !signed && (
					<Link to="/login">
						<div className="border-2 border-gray-900 rounded-full p-1">
							<FiLogIn size={22} color="#101828" />
						</div>
					</Link>
				)}
			</header>
		</div>
	);
}
