/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of Navigate
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

const LoginPage = () => {
  const { createLoginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook to handle navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    console.log({ email, password });

    createLoginUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        toast.success("Login successful!"); // Show success toast
        navigate("/"); // Redirect to the dashboard after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code:", errorCode, "Error Message:", errorMessage);
        toast.error(`Error: ${errorMessage}`); // Show error toast
        setError(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmitLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C6 3 3.053 5.237 1.3 8.551a.75.75 0 000 .897C3.053 14.763 6 17 10 17c4 0 6.947-2.237 8.7-5.551a.75.75 0 000-.897C16.947 5.237 14 3 10 3zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C6 3 3.053 5.237 1.3 8.551a.75.75 0 000 .897C3.053 14.763 6 17 10 17c4 0 6.947-2.237 8.7-5.551a.75.75 0 000-.897C16.947 5.237 14 3 10 3zm0 2a6.98 6.98 0 014.71 2.03L12.92 10.82a3 3 0 00-5.84.06l-2.78 2.88A6.978 6.978 0 0110 5z" />
                  <path d="M4.22 4.22a.75.75 0 00-1.06 1.06l11.1 11.1a.75.75 0 001.06-1.06L4.22 4.22z" />
                </svg>
              )}
            </button>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-indigo-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
