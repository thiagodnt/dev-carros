import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...rest }: ButtonProps) {
	return (
		<button
			type="button"
			className="bg-red-600 hover:bg-red-700 h-11 w-full px-8 rounded-lg text-white font-bold text-lg cursor-pointer transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
			{...rest}
		>
			{children}
		</button>
	);
}
