import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CarDetails } from './pages/Car';
import { Dashboard } from './pages/Dashboard';
import { RegisterNewCar } from './pages/Dashboard/New';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Private } from './routes/Private';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/car/:id',
				element: <CarDetails />,
			},
		],
	},

	{
		element: <Private />,
		children: [
			{
				element: <Layout />,
				children: [
					{
						path: '/dashboard',
						element: <Dashboard />,
					},
					{
						path: '/dashboard/new',
						element: <RegisterNewCar />,
					},
				],
			},
		],
	},

	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);
