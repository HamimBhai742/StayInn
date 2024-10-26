import { format } from "date-fns";
import React, { useState } from "react";
import DeleteModal from "../../../components/Modal/DeleteModal";
import UpdateRoomModal from "../../../components/Modal/UpdateRoomModal";

const FromData = ({ room, refetch, handelDeleteBtn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handelBtn = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handelUpOpBtn = () => {
    setIsEditModalOpen(true);
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={room?.image}
                className="mx-auto object-cover rounded h-10 w-14"
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.to), "P")}
        </p>
      </td>
      <td
        onClick={handelBtn}
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        {/* Delete modal */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          id={room?._id}
          setIsOpen={setIsOpen}
          handelDeleteBtn={handelDeleteBtn}
        ></DeleteModal>
      </td>
      <td
        onClick={handelUpOpBtn}
        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
      >
        <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
        <UpdateRoomModal refetch={refetch} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} id={room?._id}></UpdateRoomModal>
        {/* Update Modal */}
      </td>
    </tr>
  );
};

export default FromData;
