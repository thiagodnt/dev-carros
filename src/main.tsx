import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './App';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<Toaster position="top-right" reverseOrder={false} />
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>,
);
