import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../config/axios";
import { Loader2 } from "lucide-react";
import { useAppContext } from "../context/Contexts";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [backendErrors, setBackendErrors] = useState<string[]>([]); // State to store backend errors
  const navigate = useNavigate();

  const { setEmail, setIsRegistered } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setBackendErrors([]);
    try {
      console.log("Signup:", data);
      setEmail(data.email);
      const response = await api.post("/auth/register", data);

      if (response.status === 201) {
        setIsRegistered(true);
        navigate("/otp");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      if (error.response) {
        // If the error is coming from the backend response
        const errorMessage = error.response.data.message;
        if (errorMessage) {
          setBackendErrors([errorMessage]); // Set specific error message from backend
        } else {
          setBackendErrors(["An unknown error occurred."]); // If no message is returned
        }
      } else if (error.message) {
        setBackendErrors([error.message]); // If it's a general error
      }
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backendErrors.length > 0) {
      const timer = setTimeout(() => {
        setBackendErrors([]); // Clear errors after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [backendErrors]);

  return (
    <>
      {/* Error Bar at the top */}
      {backendErrors.length > 0 && (
        <div className="absolute w-full bg-red-500 text-white text-center">
          {backendErrors.map((error, index) => (
            <div key={index} className="py-2">
              {error}
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="Name"
                {...register("name", { required: "Username is required" })}
                className="w-full p-3 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-3 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                    message:
                      "Password must be 6 characters long, contain at least one uppercase letter, one number, and one special character",
                  },
                })}
                className="w-full p-3 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm_password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                className="w-full p-3 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                type="password"
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-sm">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {loading ? (
                <div className="flex justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />{" "}
                  {/* Spinner */}
                </div>
              ) : (
                "Signup"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
