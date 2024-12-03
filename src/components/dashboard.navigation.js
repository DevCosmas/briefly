import { CiHome } from 'react-icons/ci';
import { RiBarChartGroupedLine } from 'react-icons/ri';
import { GiClick } from 'react-icons/gi';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function DashboardNavigation() {
  return (
    <header className="bg-slate-50 text-slate-900 shadow-md box-border sm:min-h-screen px-6 py-6 text-3xl w-full">
      <nav>
        <ul className="flex box-border justify-between flex-row sm:flex-col gap-6">
          <li className=" box-border  hover:text-blue-700 hover:bg-blue-100 px-2 py-2 hover:rounded-md">
            <Link
              to="/dashboard"
              className="flex flex-col sm:flex-row items-center gap-2 text-2xl">
              <CiHome className="h-10 w-10 mr-2" />
              <p className="hidden sm:block"> Home</p>
            </Link>
          </li>
          <li className=" box-border hover:text-blue-700 hover:bg-blue-100 px-2 py-2 hover:rounded-md">
            <Link
              to="/dashboard/stats"
              className="flex  flex-col sm:flex-row items-center gap-2 text-2xl">
              <RiBarChartGroupedLine className="h-10 w-10 mr-2" />
              <p className="hidden sm:block">Stats</p>
            </Link>
          </li>
          <li className=" box-border hover:text-blue-700 hover:bg-blue-100 px-2 py-2 hover:rounded-md">
            <Link
              to="/dashboard/click_stream"
              className="flex  flex-col sm:flex-row items-center gap-2 text-2xl">
              <GiClick className="h-10 w-10 mr-2" />
              <p className="hidden sm:block"> Click Rate</p>
            </Link>
          </li>

          {/* Divider for spacing */}
          <hr className="my-4 border-slate-300 hidden sm:block " />

          {/* Settings */}
          <li className=" box-border hover:text-blue-700 hover:bg-blue-100 px-2 py-2 hover:rounded-md">
            <Link
              to="/dashboard/settings"
              className="flex  flex-col sm:flex-row items-center gap-2 text-2xl">
              <FiSettings className="h-10 w-10 mr-2" />
              <p className="hidden sm:block"> Settings</p>
            </Link>
          </li>

          {/* Logout */}
          <li className=" box-border hover:text-blue-700 hover:bg-blue-100 px-2 py-2 hover:rounded-md">
            <Link
              to="/logout"
              className="flex flex-col sm:flex-row items-center gap-2 text-2xl">
              <FiLogOut className="h-10 w-10 mr-2" />
              <p className="hidden sm:block">Logout</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
