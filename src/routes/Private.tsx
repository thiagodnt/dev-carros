import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router';

export function Private() {
	const { signed, loadingAuth } = useContext(AuthContext);

	if (loadingAuth) {
		return <div>Loader</div>;
	}

	if (!signed) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
