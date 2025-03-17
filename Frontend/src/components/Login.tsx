import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../config/axios";
import { useAppContext } from "../context/Contexts";
import { Loader2 } from "lucide-react";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [backendErrors, setBackendErrors] = useState<string[]>([]); // State to store backend errors
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const navigate = useNavigate();
  const { accessToken, setAccessToken, setIsAuthenticated } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
      navigate("/", { replace: true }); // Redirect to home if logged in
    } else {
      setLoadingScreen(false);
    }
  }, [accessToken, setAccessToken, setIsAuthenticated, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setBackendErrors([]);
    setLoading(true);

    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        const { accessToken } = response.data;
        setAccessToken(accessToken);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", accessToken);

        setTimeout(() => {
          setLoading(false);
          navigate("/"); // Redirect to home after login
        }, 1000);
      }
    } catch (error: any) {
      setLoading(false);
      setBackendErrors([error.response?.data?.message || "An error occurred"]);
    }
  };

  if (loadingScreen) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

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
              className={`${loading ? "cursor-not-allowed" : ""} w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
