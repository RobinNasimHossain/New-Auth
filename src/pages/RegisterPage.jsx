import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const RegisterPage = () => {
  const { createnewUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const toggleVisibility = (field) => {
    if (field === "password") setShowPassword(!showPassword);
    if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Clear error if passwords match
    setError(null);

    // Create new user
    createnewUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);
        navigate("/auth/login");
      })
      .catch((error) => {
        setError(error.message);
      });

    console.log("Form submitted:", { name, email, photo, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mt-5 mb-5">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6 mt-5 mb-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="photo"
            >
              Photo Url
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your photo URL"
              required
            />
          </div>

          {/* Email */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility("password")}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirmPassword")}
              className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-green-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
