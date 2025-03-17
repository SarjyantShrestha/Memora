import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../config/axios";
import { useAppContext } from "../context/Contexts";
import { Loader2 } from "lucide-react";

type Inputs = {
  otp: number;
};

const Otp = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [backendErrors, setBackendErrors] = useState<string[]>([]); // State to store backend errors
  const [loading, setLoading] = useState(false);

  const { email } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log("Otp:", data);
    try {
      const response = await api.post("/otp/verify-otp", {
        email: email,
        otp: data.otp,
      });
      if (response.status === 200) navigate("/login");
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

  // Handle the countdown for the resend button
  useEffect(() => {
    if (timeLeft > 0 && isResendDisabled) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on component unmount
    } else if (timeLeft === 0) {
      setIsResendDisabled(false); // Re-enable the resend button when time is up
    }
  }, [timeLeft, isResendDisabled]);

  const handleResendOtp = async () => {
    console.log("Resending OTP...");
    setTimeLeft(120);
    setIsResendDisabled(true);
    try {
      const response = await api.post("/otp/resend-otp", email);
      if (response.status === 200) {
        console.log("OTP resent successfully");
      }
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  return (
    <>
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
          <h1 className="text-2xl font-bold text-center mb-6">
            Enter your OTP code
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                id="otp"
                {...register("otp", {
                  required: "Otp is required",
                })}
                className="w-full p-3 mt-1 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="OTP code"
              />
              {errors.otp && (
                <span className="text-red-500 text-sm">
                  {errors.otp.message}
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
                "Verify"
              )}
            </button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-500 text-sm mb-2">
              (Please check spam folder as well)
            </p>
            <a
              onClick={handleResendOtp}
              className={`${isResendDisabled ? "text-gray-500 cursor-not-allowed" : "text-blue-500 cursor-pointer"}`}
            >
              {isResendDisabled ? `${timeLeft}s` : "Resend OTP"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
