import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                  <Link to="/" className="text-2xl font-bold text-blue-600">
          FakeStore
        </Link>
         <div className="flex gap-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <button className="hover:text-blue-600">
            Cart 🛒
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;




