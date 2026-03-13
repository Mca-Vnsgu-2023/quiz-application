import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import User from './pages/User';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddQuiz from './pages/AddQuiz';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './routes/ProtectedRoute';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminViewResults from './pages/AdminViewResults';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* User */}
        <Route path="/user" element={<User />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/quiz" element={
          <ProtectedRoute role="user">
            <QuizPage />
          </ProtectedRoute>
        }
        />
        <Route path="/result" element={
          <ProtectedRoute role="user">
            <ResultPage/>
          </ProtectedRoute>
        }
        />

        {/* Admin */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/add-quiz"
          element={
            <ProtectedRoute role="admin">
              <AddQuiz />
            </ProtectedRoute>
          } />
          <Route path="/admin/viewResults"
          element={
            <ProtectedRoute role="admin">
              <AdminViewResults />
            </ProtectedRoute>
          } />
      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}

export default App;
