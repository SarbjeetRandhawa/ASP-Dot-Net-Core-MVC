import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="lg:hidden fixed top-0  left-0 w-full gap-2 flex items-center bg-gray-50 text-black p-5 z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
        <h1 className="font-bold text-sm">SmartTask</h1>
      </div>
      {isOpen && (
        <div
          className="fixed z-40 inset-0  bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`z-40 w-64  lg:w-1/6 flex flex-col justify-between lg:flex lg:flex-col lg:justify-between h-screen bg-[linear-gradient(to_bottom_right,#1E1B4B,#312E81,#3730A3)]
      fixed overflow-y-scroll top-14 lg:top-0 left-0  transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:block`}
      >
        <div>
          <div className="border-b border-[#ffffff31] flex h-20 p-4 gap-2">
            <div className="p-2 flex items-center justify-center text-2xl bg-[#217a8a4c] rounded-2xl ">⚡</div>
            <div>
              <h1 className="text-white text-[15px] font-bold leading-5">
                TaskFlow
              </h1>
              <p className="text-[10px] text-[#FFFFFF80]">
                SMART TASK <br /> MANAGEMENT
              </p>
            </div>
          </div>
          <div>
            <div className="text-white p-1 px-4 sm:p-4">
              <h1 className=" text-[#FFFFFF59] text-[12px]">MAIN</h1>
              <div className="ml-2  flex flex-col gap-1 mt-2">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="text-white">📊</div>
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="text-white">📂</div>
                  <span>Projects</span>
                </NavLink>
                <NavLink
                  to="/Tasks"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="text-white">✅</div>
                  <span>My Tasks</span>
                </NavLink>
                <NavLink
                  to="/kanban"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="text-white">📋</div>
                  <span>Kanban Board</span>
                </NavLink>
              </div>
            </div>
            <div className="text-white p-1 px-4 sm:p-4">
              <h1 className="text-[#FFFFFF59] text-[12px]">TEAM</h1>
              <div className="ml-2  flex flex-col mt-2">
                <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="text-white rounded-md">👥</div>
                  <span>Team Members</span>
                </NavLink>
                
              </div>
            </div>
            {/* <div className="text-white p-1 px-4 sm:p-4">
              <h1 className="text-[#FFFFFF59] text-[12px]">ADMIN</h1>
              <div className="ml-2  flex flex-col mt-2">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="text-white">⚙️</div>
                  <span>Settings</span>
                </NavLink>
                <NavLink
                  to="/notification"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="text-white">🔔</div>
                  <span>Notifications</span>
                </NavLink>
              </div>
            </div> */}
          </div>
        </div>
        <div className="flex mb-[56px] md:mb-[56px] lg:mb-0 items-center border-t-[1px] border-t-[#ffffff25] p-2 sm:p-3 gap-3 text-white justify-between">
          <div className="flex items-center gap-2 ">
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[linear-gradient(to_bottom,#06B6D4,#7C3AED)] font-semibold">
              {user.firstName.charAt(0).toUpperCase()}
              {user.lastName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-[11px] font-semibold ">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-[#FFFFFF73] text-[11px] mt-[-2px]">
                {user.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(logout())}
            type="button"
            className="border px-3 h-7 text-[10px] font-bold rounded-lg "
          >
            LogOut
          </button>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
