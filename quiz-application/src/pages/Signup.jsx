import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Signup() {

  const { signup, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      // User is already logged in, redirect to appropriate dashboard
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user");
      }
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {

    const user = {
      ...data,
      role: "user"
    };

    signup(user);
    toast.success("Account created successfully");
    navigate("/user/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">

        <h2 className="text-2xl font-bold mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            {...register("email", {
              required: "Email is required"
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-2 rounded pr-10"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be 8+ characters, include uppercase, lowercase, number and special character"
                }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}

          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Signup
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;