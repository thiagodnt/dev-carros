import type { ReactNode } from 'react';

interface CarsEmptyStateProps {
	icon: ReactNode;
	message: string;
}

export function CarsEmptyState({ icon, message }: CarsEmptyStateProps) {
	return (
		<main className="w-full max-w-lg flex flex-col items-center justify-center mx-auto bg-zinc-200 rounded-2xl gap-4 p-8">
			<div className="bg-zinc-400/40 p-4 rounded-full">{icon}</div>
			<hr className="w-32 border-zinc-400/20" />
			<p className="text-zinc-500">{message}</p>
		</main>
	);
}
