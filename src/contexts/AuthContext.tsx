import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '../services/firebaseConnection';

interface AuthProviderProps {
	children: ReactNode;
}

interface UserProps {
	uid: string;
	name: string | null;
	email: string | null;
}

type AuthContextData = {
	signed: boolean;
	loadingAuth: boolean;
	updateUserInfo: ({ name, email, uid }: UserProps) => void;
	user: UserProps | null;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserProps | null>(null);
	const [loadingAuth, setLoadingAuth] = useState(true);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (AuthenticatedUser) => {
			if (AuthenticatedUser) {
				setUser({
					uid: AuthenticatedUser.uid,
					name: AuthenticatedUser?.displayName,
					email: AuthenticatedUser?.email,
				});
			} else {
				setUser(null);
			}
			setLoadingAuth(false);
		});

		return () => {
			unsub();
		};
	}, []);

	function updateUserInfo({ name, email, uid }: UserProps) {
		setUser({
			name,
			email,
			uid,
		});
	}

	return (
		<AuthContext.Provider
			value={{
				signed: !!user,
				loadingAuth,
				updateUserInfo,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
