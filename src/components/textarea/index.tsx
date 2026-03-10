import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string;
}

export function TextArea({ error, ...rest }: TextAreaProps) {
	return (
		<div className="w-full">
			<textarea
				className="w-full border-2 border-zinc-400 focus:border-zinc-600 rounded-md px-2 outline-none transition-all duration-200 resize-none"
				{...rest}
			/>
			{error && <p className="text-red-600 my-1">{error}</p>}
		</div>
	);
}
