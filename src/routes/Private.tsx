import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router';
import { LoaderOverlay } from '../components/loader/overlay';

export function Private() {
	const { signed, loadingAuth } = useContext(AuthContext);

	if (loadingAuth) {
		return <LoaderOverlay />;
	}

	if (!signed) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
