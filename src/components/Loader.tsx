export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-80">
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-darkgold rounded-full animate-bubble" />
        <div className="w-10 h-10 bg-lightgold rounded-full animate-bubble200" />
        <div className="w-10 h-10 bg-darkgold rounded-full animate-bubble400" />
      </div>
    </div>
  );
}
