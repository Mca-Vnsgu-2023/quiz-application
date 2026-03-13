import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaArrowRight, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function QuizPage() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quiz = quizzes[0];

  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);

  const { register, watch, setValue } = useForm();

  const selectedOption = watch("option");

  useEffect(() => {

    if (!startQuiz) return;

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev === 1) {
          clearInterval(timer);
          finishQuiz();
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [startQuiz]);

  useEffect(() => {
    if (selectedOption) {

      const updated = [...answers];
      updated[currentQuestion] = selectedOption;

      setAnswers(updated);
    }
  }, [selectedOption]);

  useEffect(() => {
    setValue("option", answers[currentQuestion] || "");
  }, [currentQuestion]);

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {

    let score = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    const total = quiz.questions.length;

    const resultEntry = {
      user: user?.name || user?.email,
      score,
      total,
      correct: score,
      incorrect: total - score,
      date: new Date().toLocaleString()
    };

    const storedResults =
      JSON.parse(localStorage.getItem("quizResults")) || [];

    storedResults.push(resultEntry);

    localStorage.setItem("quizResults", JSON.stringify(storedResults));

    navigate("/result", {
      state: {
        score,
        total
      }
    });

  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow">

        {!startQuiz ? (

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quiz Challenge
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Test your knowledge with this interactive quiz.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {quiz?.title || "General Knowledge Quiz"}
              </h3>
              <div className="space-y-2 text-left">
                <p className="text-gray-700">
                  <strong>Questions:</strong> {quiz?.questions?.length || 0}
                </p>
                <p className="text-gray-700">
                  <strong>Time Limit:</strong> 5 minutes
                </p>
                <p className="text-gray-700">
                  <strong>Description:</strong> {quiz?.description || "Answer all questions to the best of your ability."}
                </p>
              </div>
            </div>

            <button
              onClick={() => setStartQuiz(true)}
              className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600 font-semibold"
            >
              Start Quiz
            </button>
          </div>

        ) : (

          <>
            <div className="flex justify-between mb-4">

              <h2 className="font-bold mb-3 text-lg text-gray-700">
                * Total Questions:  {currentQuestion + 1} / {quiz.questions.length}
              </h2>

              <h2 className="text-red-500 text-lg font-bold flex items-center gap-2">
                <FaRegClock size={22} className="text-blue-400" />
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h2>

            </div>

            <h3 className="text-lg font-semibold mb-6">
              {currentQuestion + 1}. {quiz.questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">

              {quiz.questions[currentQuestion].options.map((opt, i) => (

                <label
                  key={i}
                  className="block border p-3 rounded cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="radio"
                    value={opt}
                    {...register("option")}
                    className="mr-2"
                  />
                  {opt}
                </label>

              ))}

            </div>

            <div className="flex justify-between mt-10">

              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="bg-gray-500 text-white px-5 py-2 rounded disabled:opacity-50"
              >
                <FaArrowLeft size={18} className="inline-block mr-2" />
                Back
              </button>

              <button
                onClick={nextQuestion}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                {currentQuestion === quiz.questions.length - 1
                  ? "Finish"
                  : (
                    <>
                      Next <FaArrowRight size={18} className="inline-block ml-2" />
                    </>
                  )}
              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default QuizPage;