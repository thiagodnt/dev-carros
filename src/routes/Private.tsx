import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

interface PrivateProps {
	children: ReactNode;
}

export function Private({ children }: PrivateProps) {
	const { signed, loadingAuth } = useContext(AuthContext);

	if (loadingAuth) {
		return <div>Loader</div>;
	}

	if (!signed) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
