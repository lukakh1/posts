export function Dots() {
  return (
    <div className="flex space-x-2">
      <div className="h-2 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-60 transition-opacity duration-300 group-hover:opacity-100"></div>
      <div className="h-2 w-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 opacity-40 transition-opacity duration-300 group-hover:opacity-80"></div>
      <div className="h-2 w-2 rounded-full bg-blue-500 opacity-30 transition-opacity duration-300 group-hover:opacity-60"></div>
    </div>
  );
}
