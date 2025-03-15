import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../config/axios";

type Inputs = {
  otp: number;
};

const Otp = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Otp:", data);
    navigate("/login");
  };

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

  const handleResendOtp = () => {
    console.log("Resending OTP...");
    setTimeLeft(120);
    setIsResendDisabled(true);
    try {
      const response = api.post("/otp/resend-otp", email);
    } catch (error) {}
  };

  return (
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
              <span className="text-red-500 text-sm">{errors.otp.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            onClick={handleResendOtp}
            className={`${isResendDisabled ? "text-gray-500 cursor-not-allowed" : "text-blue-500 cursor-pointer"}`}
          >
            {isResendDisabled ? `${timeLeft}s` : "Resend OTP"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Otp;
