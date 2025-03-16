import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../config/axios";
import { useAppContext } from "../context/Contexts";
import { Loader2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [backendErrors, setBackendErrors] = useState<string[]>([]); // State to store backend errors
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setName, setIsAuthenticated } =
    useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Login:", data);
    setBackendErrors([]);
    setLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        const { accessToken } = response.data;
        console.log(accessToken);
        setAccessToken(accessToken);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", accessToken);
        // Decode the token and get user info
        const decodedToken: any = jwtDecode(accessToken);
        setName(decodedToken.name);

        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
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
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, [accessToken, setAccessToken]);

  //Create backend error after 3 seconds
  useEffect(() => {
    if (backendErrors.length > 0) {
      const timer = setTimeout(() => {
        setBackendErrors([]); // Clear errors after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [backendErrors]);

  //Check if user is already logged in
  useEffect(() => {
    // Check if the access token is in localStorage
    const token = localStorage.getItem("accessToken");

    // If the token exists, set it in the context and redirect to the home page
    if (token && !accessToken) {
      setAccessToken(token);
      navigate("/", { replace: true });
    }
  }, [accessToken, setAccessToken, navigate]);

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
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("password", { required: "Password is required" })}
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

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? (
                <div className="flex justify-center">
                  <Loader2 className="animate-spin mr-2" size={20} />{" "}
                  {/* Spinner */}
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:text-blue-600">
              Signup
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
