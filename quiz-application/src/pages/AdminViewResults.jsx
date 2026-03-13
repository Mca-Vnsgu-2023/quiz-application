import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function AdminViewResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    setResults(storedResults);
  }, []);

  const maxScore = results.length > 0
    ? Math.max(...results.map(r => r.score))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Quiz Results Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded border">
            <p className="text-gray-600 text-sm mb-1">Total Attempts</p>
            <p className="text-2xl font-bold text-blue-600">{results.length}</p>
          </div>
          <div className="bg-white p-4 rounded border">
            <p className="text-gray-600 text-sm mb-1">Highest Score</p>
            <p className="text-2xl font-bold text-purple-600">{maxScore}</p>
          </div>
        </div>

        <div className="bg-white rounded border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Quiz Results</h2>
          </div>

          {results.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No quiz results available yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">User</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">Score</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">Correct</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-700">Incorrect</th>
                    <th className="px-3 py-2 text-left font-medium text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-3 py-2 text-gray-900">{r.user}</td>
                      <td className="px-3 py-2 text-center text-gray-900">
                        {r.score}/{r.total}
                      </td>
                      <td className="px-3 py-2 text-center text-green-600">
                        {r.correct}
                      </td>
                      <td className="px-3 py-2 text-center text-red-600">
                        {r.incorrect}
                      </td>
                      <td className="px-3 py-2 text-gray-600">
                        {r.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewResults;