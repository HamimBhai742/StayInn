import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import DashbiardLayout from "../layouts/DashbiardLayout";
import Static from "../pages/Dashboard/Static/Static";
import AddRoomForm from "../pages/Dashboard/AddRoome/AddRoom";
import MyListing from "../pages/Dashboard/MyListing/MyListing";
import Profile from "../pages/Dashboard/Profile/Profile";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManagaBookings";
import PrivateRoute from "./PrivateRoute";
import HostRoute from "./HostRoute";
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:id",
        element: (
          <PrivateRoute>
            <GuestRoute>
              <RoomDetails />
            </GuestRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: <DashbiardLayout></DashbiardLayout>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Static></Static>
          </PrivateRoute>
        ),
      },
      {
        path: "add-room",
        element: (
          <PrivateRoute>
            <HostRoute>
              <AddRoomForm></AddRoomForm>
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            <HostRoute>
              <MyListing></MyListing>
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            {/* <GuestRoute> */}
            <MyBookings></MyBookings>
            {/* </GuestRoute> */}
          </PrivateRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <PrivateRoute>
            <HostRoute>
              <ManageBookings></ManageBookings>
            </HostRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
