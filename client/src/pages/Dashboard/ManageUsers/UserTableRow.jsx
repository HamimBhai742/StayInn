import PropTypes from "prop-types";
import UpdateRoleModal from "../../../components/Modal/UpdateRoleModal";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const handelRoleModalBtn = (user) => {
    if (user?.role === "admin") {
      toast.error("You cannot change your role because you are an admin!")
      return
    } else if (user?.status === "Verified") {
      toast.error("No request made!")
      return
    }
      setIsOpen(true);
  };
  const modalHandler = async (selected, email) => {
    console.log(selected, email);
    const usersData = {
      status: "Verified",
      role: selected,
    };
    const { data } = await axiosSecure.put(`/role/${email}`, usersData);
    console.log(data);
    toast.success("Role is update successfully!")
    refetch()
    await setIsOpen(false);
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-medium">
          {user?.role.charAt(0).toUpperCase() + user?.role.slice(1).toLowerCase()}
        </p>
      </td>
      <td className="px-5 py-5 border-b font-medium border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handelRoleModalBtn(user)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateRoleModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
          email={user?.email}
        ></UpdateRoleModal>
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
