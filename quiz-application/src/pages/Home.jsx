import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Quiz Application
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Test your knowledge with our interactive quizzes. Choose your role below to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              user.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/user"
                  className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Take a Quiz
                </Link>
              )
            ) : (

              <>
                <Link
                  to="/user"
                  className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Take a Quiz
                </Link>
                <Link
                  to="/admin"
                  className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Admin Panel
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;