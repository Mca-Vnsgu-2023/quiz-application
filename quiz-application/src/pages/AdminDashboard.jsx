import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 px-6">

        <h2 className="text-3xl font-bold mb-10 text-center">
          Admin Dashboard
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white p-8 rounded-lg shadow text-center">

            <h3 className="text-xl font-semibold mb-4">
              Create Quiz
            </h3>

            <p className="text-gray-500 mb-6">
              Add new quiz with questions
            </p>

            <button
              onClick={() => navigate("/admin/add-quiz")}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Create Quiz
            </button>

          </div>

          <div className="bg-white p-8 rounded-lg shadow text-center">

            <h3 className="text-xl font-semibold mb-4">
              View Results
            </h3>

            <p className="text-gray-500 mb-6">
              See user quiz scores
            </p>

            <button
              onClick={() => navigate("/admin/viewResults")}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              View Results
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;