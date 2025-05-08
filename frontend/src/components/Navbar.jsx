import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Greenhouse Analysis
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/predict"
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/predict' ? 'bg-green-600' : 'hover:bg-green-600'
              }`}
            >
              Predict
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/about' ? 'bg-green-600' : 'hover:bg-green-600'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}