export default function Loader() {
  return (
    <div
      className="flex min-h-80 w-full items-center justify-center"
      role="status"
      aria-label="Chargement"
    >
      <div className="flex space-x-2">
        <div className="h-3.5 w-3.5 rounded-full bg-pollen animate-bubble" />
        <div className="h-3.5 w-3.5 rounded-full bg-pollen animate-bubble200" />
        <div className="h-3.5 w-3.5 rounded-full bg-pollen animate-bubble400" />
      </div>
    </div>
  );
}
