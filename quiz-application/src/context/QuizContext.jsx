import { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <QuizContext.Provider
      value={{
        quiz,
        setQuiz,
        answers,
        setAnswers,
        score,
        setScore
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};