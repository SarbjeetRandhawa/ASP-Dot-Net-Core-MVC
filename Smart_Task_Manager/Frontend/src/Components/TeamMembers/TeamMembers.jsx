import React from "react";
import Sidebar from "../Sidebar";
import { useState } from "react";

function TeamMembers() {
  const [RoleFilter, setRoleFilter] = useState("All");
  const [TableRole, setTableRole] = useState("Admin");
  const roleIcon = {
    Admin: "👑",
    Manager: "🗃️",
    Employee: "👤",
  };

  return (
    <div className="flex ">
      <Sidebar />

      <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
        <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full justify-between items-center px-4">
          <h1 className="font-bold">Team Members</h1>
          <div className="flex gap-2 relative">
            <div className="absolute w-0 left-1 top-1">🔍</div>
            <input
              type="text"
              className="h-7 border pl-8 text-[11px] font-bold rounded-md focus:outline-2 outline-[#4F46E5]"
              placeholder="Search User..."
            />
            <button
              type="button"
              className="border px-3 h-7 rounded-md text-[11px] font-bold bg-[#4F46E5] text-white"
            >
              + Invite Member
            </button>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}

        <div className="Counts  p-4 flex justify-between gap-2">
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4  flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">👥</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">12</h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">Total Members</p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">👑</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">2</h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">Admins</p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">🗃️</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">3</h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">Managers</p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">👤</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">7</h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">Employee</p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}

        <div className="filter ml-4  flex gap-2 text-[#64748B]">
          <div
            className={`border cursor-pointer px-3 rounded-full text-[11px] font-bold py-1 ${RoleFilter === "All" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("All")}
          >
            <h1>All (12)</h1>
          </div>
          <div
            className={`border  px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Admins" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("Admins")}
          >
            <h1>Admins (2)</h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Managers" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("Managers")}
          >
            <h1>Managers (3)</h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Employee" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"} `}
            onClick={() => setRoleFilter("Employee")}
          >
            <h1>Employees (7)</h1>
          </div>
        </div>

        {/* --------------------------------------------------------------------------------- */}

        <div className="p-4">
          <div className="border bg-white rounded-md overflow-x-scroll h-auto">
            <table className=" table w-full text-left  text-nowrap">
              <tr className="border  h-8 bg-[#F1F5F9] w-full text-[10px] text-[#94A3B8]">
                <th className="pl-4">MEMBER</th>
                <th className="">EMAIL</th>
                <th className="">ROLE</th>
                <th className="">TASKS</th>
                <th className="">PROJECTS</th>
                <th className="">JOINED</th>
                <th className="">LAST ACTIVE</th>
                <th className="">ACTIONS</th>
              </tr>

              <tr>
                <td className="flex gap-2 px-4 py-2 items-center">
                  <div className="border rounded-full p-1 text-[12px] font-semibold text-white bg-blue-500">
                    AK
                  </div>
                  <div className="leading-tight">
                    <h1 className="font-bold text-[13px]">Alex Kumar</h1>
                    <p className="text-[10px] text-[#94A3B8]">You</p>
                  </div>
                </td>
                <td className="pr-2 text-[12px] font-semibold text-[#94A3B8]">
                  alex@taskflow.com
                </td>
                <td className="pr-2 flex items-center text-[12px] font-semibold ">
                  <h1
                    className={`rounded-full  py-1 px-3 ${TableRole === "Admin" ? "bg-[#F5F3FF] text-[#7C3AED]" : TableRole === "Manager" ? "bg-[#EFF6FF] text-[#3B82F6]" : "bg-[#F0FDF4] text-[#10B981]"}`}
                  >
                    {roleIcon["Admin"]}Admin
                  </h1>
                </td>
                <td className="pr-2 text-[12px] text-[#94A3B8]">
                  <span className="text-black font-semibold">12</span> / 8 done
                </td>
                <td>
                  <p className="pr-2 text-[12px] font-semibold text-[#94A3B8]">
                    5 projects
                  </p>
                </td>
                <td>
                  <p className="pr-2 text-[12px] text-[#94A3B8]">Jan 1, 2025</p>
                </td>
                <td>
                  <p className="text-[12px] text-[#10B981] flex font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-dot"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    </svg>{" "}
                    Active now
                  </p>
                </td>

                <td className="pr-2">
                  <div></div>
                </td>
              </tr>

              <tr>
                <td className="flex gap-2 pl-4 py-2 items-center">
                  <div className="border rounded-full p-1 text-[12px] font-semibold text-white bg-blue-500">
                    AK
                  </div>
                  <div className="leading-tight">
                    <h1 className="font-bold text-[13px]">Alex Kumar</h1>
                    <p className="text-[10px] text-[#94A3B8]">You</p>
                  </div>
                </td>
                <td className="text-[12px] font-semibold text-[#94A3B8]">
                  alex@taskflow.com
                </td>
                <td className="flex items-center text-[12px] font-semibold ">
                  <h1
                    className={`rounded-full  py-1 px-3 ${TableRole === "Admin" ? "bg-[#F5F3FF] text-[#7C3AED]" : TableRole === "Manager" ? "bg-[#EFF6FF] text-[#3B82F6]" : "bg-[#F0FDF4] text-[#10B981]"}`}
                  >
                    {roleIcon["Admin"]}Admin
                  </h1>
                </td>
                <td className="text-[12px] text-[#94A3B8]">
                  <span className="text-black font-semibold">12</span> / 8 done
                </td>
                <td>
                  <p className="text-[12px] font-semibold text-[#94A3B8]">
                    5 projects
                  </p>
                </td>
                <td>
                  <p className="text-[12px] text-[#94A3B8]">Jan 1, 2025</p>
                </td>
                <td>
                  <p className="text-[12px] text-[#10B981] flex font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-dot"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                    </svg>{" "}
                    Active now
                  </p>
                </td>

                <td>
                  <div></div>
                </td>
              </tr>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
