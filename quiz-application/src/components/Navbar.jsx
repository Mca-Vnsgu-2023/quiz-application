import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import quizLogo from "../assets/quizLogo.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isHome = location.pathname === "/";
  const isUserSection = location.pathname.startsWith("/user");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white border-b">

      <Link to="/" className="text-4xl font-bold text-blue-600">
        <img src={quizLogo} alt="Quiz Logo" className="w-16 h-16 inline-block mr-2" />
        Quiz App
      </Link>

      <div className="flex gap-3 items-center">
        {isHome && !user && (
          <>
            <button
              onClick={() => navigate("/user")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              User
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Admin
            </button>
          </>
        )}

        {isUserSection && !user && (
          <>
            <button
              onClick={() => navigate("/user/login")}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/user/signup")}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Signup
            </button>
          </>
        )}

        {user && (
          <>
            <span className="flex items-center gap-1 text-gray-700">
              <FaUser size={16} />
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded flex items-center gap-1"
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;