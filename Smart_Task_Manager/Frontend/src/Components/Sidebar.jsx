import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();


  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-gray-50 text-black p4">
        <h1>SmartTask</h1>
        <button onClick={() => setIsOpen(!isOpen)}>⇶</button>
      </div>
      {isOpen && (
        <div
          className="fixed z-10 inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`z-20 w-1/6 md:flex md:flex-col  md:justify-between h-screen bg-[linear-gradient(to_bottom_right,#1E1B4B,#312E81,#3730A3)]
      fixed top-0 left-0  transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block`}
      >
        <div>
          <div className="border-b border-[#ffffff31] flex h-20 p-4 gap-2">
            <div className="p-2 text-[20px] bg-[#06B6D4] rounded-2xl ">⚡</div>
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
            <div className="text-white p-4">
              <h1 className="text-[#FFFFFF59] text-[12px]">MAIN</h1>
              <div className="ml-2  flex flex-col gap-1 mt-2">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div>📊</div>
                  <span>DashBoard</span>
                </NavLink>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div>📂</div>
                  <span>Projects</span>
                </NavLink>
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div>✅</div>
                  <span>My Tasks</span>
                </NavLink>
                <NavLink
                  to="/kanban"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div>📋</div>
                  <span>Kanban Board</span>
                </NavLink>
              </div>
            </div>
            <div className="text-white p-4">
              <h1 className="text-[#FFFFFF59] text-[12px]">TEAM</h1>
              <div className="ml-2  flex flex-col mt-2">
                <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div className="bg-[#ffffff70] rounded-md">👥</div>
                  <span>Team Members</span>
                </NavLink>
                <NavLink
                  to="/activity"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div>🕒</div>
                  <span>Activity Log</span>
                </NavLink>
              </div>
            </div>
            <div className="text-white p-4">
              <h1 className="text-[#FFFFFF59] text-[12px]">ADMIN</h1>
              <div className="ml-2  flex flex-col mt-2">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div>⚙️</div>
                  <span>Settings</span>
                </NavLink>
                <NavLink
                  to="/notification"
                  className={({ isActive }) =>
                    `hover:bg-[#FFFFFF26] hover:rounded-lg  p-2 flex gap-2 text-[13px] text-[#FFFFFFA6] ${isActive ? "bg-[#FFFFFF26] rounded-lg" : ""}`
                  }
                >
                  <div>🔔</div>
                  <span>Notifications</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center border-t-[1px] border-t-[#ffffff25] p-3 gap-3 text-white">
          <div className="p-2 h-10 w-10 rounded-full bg-[linear-gradient(to_bottom,#06B6D4,#7C3AED)] font-semibold">AK</div>
          <div>
            <h1>Alex Kumar</h1>
            <p className="text-[#FFFFFF73] text-[14px] mt-[-5px]">Admin</p>
          </div>
          <button onClick={()=>dispatch(logout())} type="button" className="border px-3 h-7 text-[10px] font-bold rounded-lg ml-7">LogOut</button>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
