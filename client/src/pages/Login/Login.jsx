import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ isOpen, onClose }) => {
  const { register, handleSubmit } = useForm();
  const { signIn, setLoading, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const { email, password } = data;
      console.log(email, password);
      const logUser = await signIn(email, password);
      navigate("/");
      toast.success("Signin Successfull");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handelGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
      toast.success("Signin Successfull With Google");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const [show, setShow] = useState(false);
  const handleReset = () => {
    // Handle the reset password action here, such as an API call.
    console.log("Reset email sent to:", email);
  };
  // if (!isOpen) return null;
  const handelPassShowBtn = () => {
    setShow(!show);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type={show ? "password" : "text"}
                {...register("password")}
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
              <div className="absolute top-10 right-3">
                <span onClick={handelPassShowBtn} className="text-xl">
                  {show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin m-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button
            onClick={openModal}
            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
          >
            Forgot password?
          </button>
          <ForgetPassword
            isOpen={isModalOpen}
            onClose={closeModal}
          ></ForgetPassword>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={handelGoogleLogin}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
