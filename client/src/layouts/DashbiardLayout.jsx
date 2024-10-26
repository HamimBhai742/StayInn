import React from "react";
import Sidebar from "../components/Shared/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashbiardLayout = () => {
  return (
    <div className="md:flex ">
      <Sidebar></Sidebar>
      <div className="flex-1 md:ml-64">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashbiardLayout;
