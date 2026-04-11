export function LoaderOverlay() {
	return (
		<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
			<div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
		</div>
	);
}
