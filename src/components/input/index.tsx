import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export function Input({ error, ...rest }: InputProps) {
	return (
		<div className="w-full">
			<input
				className="w-full border-2 border-zinc-400 focus:border-zinc-600 rounded-md h-11 px-2 outline-none transition-all duration-200"
				{...rest}
			/>
			{error && <p className="text-red-600 my-1">{error}</p>}
		</div>
	);
}
