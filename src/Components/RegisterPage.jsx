import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { auth, provider, signInWithPopup } from "./Firebase";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigation = useNavigate();
  const [step, setStep] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  emailjs.init("z_qHrmXFspo-wkWOe");

  const HandleSubmitOtp = (e) => {
    e.preventDefault();
    try {
      setloading(true); // Start loading before sending the email

      const generatedOtp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const templateParams = {
        name: formData.name,
        user_email: formData.email,
        otp: generatedOtp,
      };

      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      emailjs
        .send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
          console.log("Email sent successfully!", response);
          setOtp(generatedOtp); // Set OTP only after a successful email send

          toast.success("OTP Sent Successfully!", { autoClose: 1500 });
        })
        .catch((error) => {
          console.error("Email sending failed", error);
          toast.error("Try again: " + error.message);
        })
        .finally(() => {
          setTimeout(() => {
            setStep("verify");
            setloading(false);
          }, 2000);
        });
    } catch (error) {
      toast.error("Try again: " + error.message);
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    try {
      setloading(true);
      if (userOtp === otp) {
        setloading(true);
        setInterval(() => {
          setloading(false);
          navigation("/");
        }, 2000);
        toast.success("OTP verified Successfully!", {
          autoClose: 1500,
        });
        localStorage.setItem("username", formData.name);
      } else {
        setTimeout(() => {
          setloading(false);
          toast.error("Incorrect OTP. Try again.");
        }, 2000);
      }
    } catch (error) {
      toast.error("try again.", error);

      return;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("username", user.displayName);
      setInterval(() => {
        setGoogleLoading(false);
        navigation("/");
      }, 2000);
    } catch (error) {
      toast.error(".Try again.", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Mail className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {step === "register"
            ? "Create your account With ChatPlatform"
            : "Verify your email"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl rounded-2xl sm:px-10 transform hover:shadow-xl transition-all duration-300">
          {step === "register" ? (
            <>
              <form onSubmit={HandleSubmitOtp} className="space-y-6">
                <div className="space-y-5">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-emerald-700 group-hover:text-emerald-600"
                    >
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-emerald-400 group-hover:text-emerald-500" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-400"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-emerald-700 group-hover:text-emerald-600"
                    >
                      Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-emerald-400 group-hover:text-emerald-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-400"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-emerald-700 group-hover:text-emerald-600"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-emerald-400 group-hover:text-emerald-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        required
                        className="block w-full pl-10 pr-10 py-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-400"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-emerald-400 hover:text-emerald-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-emerald-400 hover:text-emerald-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="ml-2">Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Creating Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-emerald-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-emerald-600">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center py-3 px-4 border border-emerald-300 rounded-lg shadow-sm text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={googleLoading}
                  >
                    {googleLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="ml-2">Connecting...</span>
                      </div>
                    ) : (
                      <>
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-emerald-600 mb-6">
                  We've sent a verification code to{" "}
                  <span className="font-medium text-emerald-700">
                    {formData.email}
                  </span>
                </p>
                <div className="flex justify-center space-x-2">
                  <input
                    type="text"
                    maxLength={6}
                    name="code"
                    required
                    placeholder="Enter OTP"
                    className="w-48 h-14 text-center text-lg border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-emerald-400"
                    value={userOtp}
                    onChange={(e) => setUserOtp(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="ml-2">Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    Verify Email
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
