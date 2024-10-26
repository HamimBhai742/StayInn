import React, { useState } from "react";
import { imgUpload } from "../../../components/Shared/Until";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
const UpadteProfileForm = ({ setIsModalOpen }) => {
  const { user, updateUserProfile, loading } = useAuth();
  const [load, setLoad] = useState(false);
  const handelProfileUpdate = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const image = { image: e.target.image.files[0] };
      const img = await imgUpload(image);
      if (!img) return;
      await updateUserProfile(name, img);
      toast.success("Profile update successfully");
      if (!loading) {
        setLoad(false);
        setIsModalOpen(false);
      }
    } catch (err) {
      setLoad(false);
      toast.error(err.message);
    }
  };
  return (
    <div className="w-full  flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 mt-4">
      <form onSubmit={handelProfileUpdate}>
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1 text-sm">
            <label htmlFor="location" className="block text-gray-600">
              Name
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="name"
              type="text"
              placeholder="Full name"
              required
            />
          </div>
          <div className=" p-4 bg-white w-full  m-auto rounded-lg">
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
              <div className="flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    hidden
                  />
                  <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                    Upload Image
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 mt-3 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          {load ? <ImSpinner9 className="animate-spin m-auto" /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpadteProfileForm;
