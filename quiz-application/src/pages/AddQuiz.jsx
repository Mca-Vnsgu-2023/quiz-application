import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddQuiz() {

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm();

    const option1 = watch("option1", "");
    const option2 = watch("option2", "");
    const option3 = watch("option3", "");
    const option4 = watch("option4", "");
    
    const options = [option1, option2, option3, option4].filter(o => o);

    const onSubmit = (data) => {

        if (questions.length >= 10) {
            toast.error("Only 10 questions allowed");
            return;
        }

        if (!data.question || !data.option1 || !data.option2 || !data.option3 || !data.option4 || !data.answer) {
            toast.error("All fields are required");
            return;
        }

        const newQuestion = {
            question: data.question,
            options: [
                data.option1,
                data.option2,
                data.option3,
                data.option4
            ],
            answer: data.answer
        };

        setQuestions([...questions, newQuestion]);
        toast.success(`Question ${questions.length + 1} added successfully`);

        reset({
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer: ""
        });
    };

    const handleFinishQuiz = () => {

        const quiz = {
            id: Date.now(),
            questions: questions,
            totalQuestions: questions.length,
            createdAt: new Date().toLocaleString()
        };

        const storedQuiz =
            JSON.parse(localStorage.getItem("quizzes")) || [];

        storedQuiz.push(quiz);

        localStorage.setItem("quizzes", JSON.stringify(storedQuiz));

        toast.success("Quiz created successfully.!");
        navigate("/admin/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow">

                <h2 className="text-2xl font-bold mb-4 text-center">
                    Add Quiz Question
                </h2>

                <p className="mb-6 text-gray-500">
                    Questions Added: {questions.length}/10
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                        type="text"
                        placeholder="Enter Question"
                        {...register("question", { required: true })}
                        className={`w-full border p-2 mb-2 rounded ${errors.question ? "border-red-500" : ""
                            }`}
                    />

                    {errors.question && (
                        <p className="text-red-500 text-sm mb-2">
                            Question is required
                        </p>
                    )}

                    {[1, 2, 3, 4].map((num) => (
                        <div key={num}>
                            <input
                                type="text"
                                placeholder={`Option ${num}`}
                                {...register(`option${num}`, { required: true })}
                                className={`w-full border p-2 mb-2 rounded ${errors[`option${num}`] ? "border-red-500" : ""
                                    }`}
                            />

                            {errors[`option${num}`] && (
                                <p className="text-red-500 text-sm mb-2">
                                    Option {num} is required
                                </p>
                            )}
                        </div>
                    ))}

                    <select
                        {...register("answer", { required: "Please select correct answer" })}
                        className={`w-full border p-2 mb-4 rounded ${errors.answer ? "border-red-500" : ""
                            }`}
                    >
                        <option value="">Select Correct Answer</option>

                        {[option1, option2, option3, option4].map((opt, index) => (
                            opt && <option key={index} value={opt}>
                                {opt}
                            </option>
                        ))}

                    </select>

                    {errors.answer && (
                        <p className="text-red-500 text-sm mb-4">
                            {errors.answer.message}
                        </p>
                    )}

                    <div className="flex gap-4 flex-wrap mt-4">

                        <button
                            type="submit"
                            disabled={questions.length >= 10}
                            className={`px-6 py-2 text-white rounded font-semibold
                            ${questions.length >= 10
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            Add Question
                        </button>

                        {questions.length > 0 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const removedQuestion = questions.pop();
                                    setQuestions([...questions]);
                                    toast.info("Question removed");
                                }}
                                className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 font-semibold"
                            >
                                Remove Last
                            </button>
                        )}

                        {questions.length >= 10 && (
                            <button
                                type="button"
                                onClick={handleFinishQuiz}
                                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 font-semibold"
                            >
                                Finish Quiz
                            </button>
                        )}

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddQuiz;