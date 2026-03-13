import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function User() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {!user ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              User Dashboard
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please login or signup to access quiz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/user/login"
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/user/signup"
                className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Signup
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome back, {user.name || user.email}!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ready to test your knowledge? Choose an option below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-2xl mx-auto">
              <Link
                to="/quiz"
                className="block p-6 bg-white border rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Start Quiz
                </h3>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;