import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout';
import { Home } from './pages/home';
import { CarDetails } from './pages/car';
import { Dashboard } from './pages/dashboard';
import { RegisterNewCar } from './pages/dashboard/new';
import { Login } from './pages/login';
import { Register } from './pages/register';
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
