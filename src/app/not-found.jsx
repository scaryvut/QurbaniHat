export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2">
          Sorry, this page does not exist.
        </p>

        <a
          href="/"
          className="inline-block mt-6 px-5 py-2 bg-green-600 text-white rounded-lg"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}