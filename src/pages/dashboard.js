// import { useEffect, useState } from 'react';
// import Axios from 'axios';
// import Header from '../components/header';
// import Logo from '../components/logo';
// import Button from '../components/button';
// import { useAuth } from '../context/authContext';
// import ClipCopy from '../components/clip';
// import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
// import ShowAlert from '../components/showAlert';
// import Setting from '../components/settingBar';
// import { BASEURLPROD } from '../utils/constant';

import { Outlet } from 'react-router-dom';
import DashboardNavigation from '../components/dashboard.navigation';

export default function DashBoard() {
  return (
    <div className="bg-white relative text-black box-border flex flex-col-reverse sm:flex-row text-xl min-h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="sm:w-80 w-full box-border fixed bottom-0 top-100 right-0 left-0  z-50">
        <DashboardNavigation />
      </div>
      {/* Main Content */}
      <div className=" w-full sm:w-full sm:ml-80 px-6 min-h-screen ">
        <p className="mb-6 py-6 px-6 shadow-lg w-full bg-white capitalize font-bold text-2xl">
          Welcome 🖐 John Doe
        </p>
        <div className="px-4 mb-44">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
