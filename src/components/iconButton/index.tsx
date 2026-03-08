import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	to?: string;
}

export function IconButton({ children, to, ...rest }: IconButtonProps) {
	if (to) {
		return (
			<Link to={to} className="border-2 border-gray-900 rounded-full p-1">
				{children}
			</Link>
		);
	}

	return (
		<button
			type="button"
			className="border-2 border-gray-900 rounded-full p-1 cursor-pointer"
			{...rest}
		>
			{children}
		</button>
	);
}
