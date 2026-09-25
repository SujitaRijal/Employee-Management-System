import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api.js";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [RememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot,setShowForgot]=useState(false);
  const [otpSent,setOtpSent]=useState(false);

  const [resetForm,setResetForm]=useState({
    email:"",
    otp:"",
    newPassword:"",
    confirmPassword:""
  });
  const { login } = useAuth();

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error =
        name === "email" ? validateEmail(value) : validatePassword(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error =
      name === "email" ? validateEmail(value) : validatePassword(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }
    try {
      const response = await api.post("/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        const user = response.data.user;

        // conditional toast based on role
        if (user.role === "admin") {
          toast.success(`Welcome Admin!`);
        } else if (user.role === "employee") {
          toast.success(`Welcome ${user.name}!`);
        }

        // store user and token
        login(user);
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          // wait a bit for toast to appear
          if (response.data.user.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/employee-dashboard");
          }
        }, 1000);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const handleSendOtp=async()=>{
    if(!resetForm.email){
      toast.error("Please enter your email")
      return;
    }
    try {
      const res=await api.post("/api/auth/send-reset-otp",
        {email:resetForm.email}
      );
      if(res.data.success)

        {
          toast.success("OTP sent to your email");
          setOtpSent(true);
        }else{
          toast.error(res.data.message)
        }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP")
      
    }
  };

  const handleResetPassword=async(req,res)=>{
    const {email,otp,newPassword,confirmPassword}=resetForm;
    if(!email || !otp || !newPassword || !confirmPassword){
      toast.error("All fields are required");
      return;
    }
    if(newPassword !== confirmPassword){
      toast.error("Password do not match")
      return;
    }
    try {
      const res=await api.post("/api/auth/reset-password",
        {
          email,otp,newPassword
        }
      );
      if(res.data.success)
      {
        toast.success("Password reset successfull");
        setShowForgot(false);
        setOtpSent(false);

        setResetForm({
          email:"",
          otp:"",
          newPassword:"",
          confirmPassword:""
        })
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset Failed")
      
    }
  }
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md">
        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 mx-auto">
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Please enter your details to sign in
              </p>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label
                htmlFor="Email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.email}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                />
              </div>
              {touched.email && errors.email && (
                <div className="mt-1 text-sm text-red-500">{errors.email}</div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label
                htmlFor="Password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.password}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
              <label className="flex items-center text-sm text-gray-700 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  checked={RememberMe}
                  onChange={() => setRememberMe(!RememberMe)}
                />
                <span className="ml-2 group-hover:text-blue-600 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowForgot(true)
                }
                }
                className="text-sm font-medium text-blue-600 hover:text-purple-600 transition-colors duration-200 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-3 mb-4 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>

          {showForgot && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="relative w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-fadeIn">

      {/* Close button */}
      <button
        onClick={() => {
          setShowForgot(false);
          setOtpSent(false);
        }}
        className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
      >
        ✕
      </button>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Reset Password
      </h3>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={resetForm.email}
        onChange={(e) =>
          setResetForm({ ...resetForm, email: e.target.value })
        }
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Send OTP Button */}
      {!otpSent && (
        <button
          onClick={handleSendOtp}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-all"
        >
          Send OTP
        </button>
      )}

      {/* OTP + New Password */}
      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={resetForm.otp}
            onChange={(e) =>
              setResetForm({ ...resetForm, otp: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg my-3"
          />

          <input
            type="password"
            placeholder="New password"
            value={resetForm.newPassword}
            onChange={(e) =>
              setResetForm({ ...resetForm, newPassword: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={resetForm.confirmPassword}
            onChange={(e) =>
              setResetForm({ ...resetForm, confirmPassword: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <button
            onClick={handleResetPassword}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-all"
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  </div>
)}
            {/* Sign Up Link */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-200 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
