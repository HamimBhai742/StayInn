import React, { useState } from "react";
import { categories } from "../Categories/CategoriesData";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { DateRange } from "react-date-range";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imgUpload } from "../Shared/Until";
import { ImSpinner3, ImSpinner9 } from "react-icons/im";
const UpdateRoomForm = ({ id, setIsEditModalOpen, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  // fetch room data use id for use default value
  const { data: roomD = {}, isPending } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/room/${id}`);
      return res.data;
    },
  });

  //date selected
  const [state, setState] = useState([
    {
      startDate: new Date(roomD?.from),
      endDate: new Date(roomD?.to),
      key: "selection",
    },
  ]);

  //form submited
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const {
        location,
        description,
        category,
        bedrooms,
        bathrooms,
        price,
        title,
        guests,
      } = data;
      const img = { image: data.image[0] };
      const from = state[0].startDate;
      const to = state[0].endDate;
      const image = await imgUpload(img);
      const updateHost = {
        location,
        description,
        category,
        bedrooms,
        bathrooms,
        price,
        title,
        guests,
        image,
        to,
        from,
      };
      console.log(updateHost);
      // update request
      const res = await axiosSecure.patch(`/my-room-update/${id}`, updateHost);
      if (res.data.modifiedCount > 0) {
        refetch();
        setLoading(false);
        setIsEditModalOpen(false);
        toast.success("Room details update successful");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      {isPending ? (
        <ImSpinner3 className="animate-spin m-auto text-rose-500" />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-10">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                id="location"
                type="text"
                placeholder="Location"
                defaultValue={roomD?.location}
                {...register("location")}
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name=""
                id="title"
                type="text"
                placeholder="Title"
                defaultValue={roomD?.title}
                {...register("title")}
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name=""
                defaultValue={roomD?.category}
                {...register("category")}
              >
                <option disabled selected>
                  Select your room category
                </option>
                {categories.map((category) => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
              <div className="flex justify-center pt-2">
                <DateRange
                  rangeColors={["#F43F5E"]}
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </div>
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name=""
                      id="image"
                      accept="image/*"
                      hidden
                      {...register("image")}
                    />
                    <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name=""
                  id="price"
                  type="number"
                  placeholder="Price"
                  defaultValue={roomD?.price}
                  {...register("price", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Total guest
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name=""
                  id="guest"
                  type="number"
                  placeholder="Total guest"
                  defaultValue={roomD?.guests}
                  {...register("guests", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="bedrooms" className="block text-gray-600">
                  Bedrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name=""
                  id="bedrooms"
                  type="number"
                  placeholder="Bedrooms"
                  defaultValue={roomD?.bedrooms}
                  {...register("bedrooms", { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="bathrooms" className="block text-gray-600">
                  Bathrooms
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name=""
                  id="bathrooms"
                  type="number"
                  defaultValue={roomD?.bathrooms}
                  placeholder="Bathrooms"
                  {...register("bathrooms", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 "
                name=""
                defaultValue={roomD?.description}
                {...register("description")}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
          >
            {loading ? (
              <ImSpinner9 className="animate-spin m-auto" />
            ) : (
              "Update"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateRoomForm;
