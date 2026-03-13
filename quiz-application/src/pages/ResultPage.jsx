import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import Navbar from "../components/Navbar";

function ResultPage() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (state && state.score >= 8) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">No result available</h2>
      </div>
    );
  }

  const { score, total } = state;
  const correct = score;
  const incorrect = total - score;

  let emoji = "";
  let message = "";

  if (score >= 8) {
    emoji = "🎉";
    message = "Excellent";
  } else if (score >= 5) {
    emoji = "👍";
    message = "Good";
  } else {
    emoji = "😢";
    message = "Better Luck Next Time";
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {showConfetti && <Confetti />}

      <Navbar />

      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 py-8">

        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">

          <div className="text-6xl mb-6 animate-bounce">
            {emoji}
          </div>

          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            {message}
          </h2>

          <div className="mb-8 bg-blue-50 p-6 rounded">
            <p className="text-gray-600 text-sm mb-2">Total Score</p>
            <p className="text-4xl font-bold text-blue-600">
              {score}/{total}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">

            <div className="bg-green-50 p-4 rounded">
              <p className="text-gray-600 text-sm mb-1">Correct Answers</p>
              <p className="text-3xl font-bold text-green-600">{correct}</p>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <p className="text-gray-600 text-sm mb-1">Incorrect Answers</p>
              <p className="text-3xl font-bold text-red-600">{incorrect}</p>
            </div>

          </div>

          <div className="flex gap-3 justify-center">

            <button
              onClick={() => navigate("/quiz")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/user")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold"
            >
              Go Home
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResultPage;