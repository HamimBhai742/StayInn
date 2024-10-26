import React, { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../../hooks/useAuth";

const ForgetPassword = ({ isOpen, onClose, setIsModalOpenOk }) => {
  const { resetPassword, setLoading, loading, user } = useAuth();
  const handleReset = () => {
    setLoading(true);
    const email = document.getElementById("email").value;
    try {
      resetPassword(email);
      toast.success("Request Success.Please Cheak Your Email.");
      setLoading(false);
      setIsModalOpenOk(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <input
          type="email"
          id="email"
          disabled
          defaultValue={user?.email}
          placeholder="Enter your email"
          className="border border-gray-300 p-2 w-full rounded mb-4"
        />
        <button
          onClick={handleReset}
          className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded w-full"
        >
          {loading ? (
            <ImSpinner9 className="animate-spin m-auto" />
          ) : (
            "Reset Password"
          )}
        </button>
        <button
          onClick={onClose}
          className="text-gray-600 mt-4 text-sm underline hover:text-rose-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
