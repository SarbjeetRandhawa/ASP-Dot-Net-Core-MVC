import React from "react";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, deleteuser } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
// import { isAction } from "@reduxjs/toolkit";

function TeamMembers() {
  const [RoleFilter, setRoleFilter] = useState("All");
  const [search, setsearch] = useState("");
  const [appliedSearch, setappliedSearch] = useState("");
  const roleIcon = {
    Admin: "👑",
    Manager: "🗃️",
    Employee: "👤",
  };

  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.users);
  const CurrentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const adminCount = users.filter((u) => u.role === "Admin").length;
  const managerCount = users.filter((u) => u.role === "Manager").length;
  const employeeCount = users.filter((u) => u.role === "Employee").length;

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteuser(id)).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
        } catch (err) {
          Swal.fire({
            title: "Failed",
            text: "Cannot Delete Yourself",
            icon: "error",
          });
        }
      }
    });
  };

  const searchedUsers = users.filter((u) => {
    if (!appliedSearch) return true;

    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();

    return (
      fullName.includes(appliedSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(appliedSearch.toLowerCase())
    );
  });

  const filteredUsers = searchedUsers.filter((u) => {
    if (RoleFilter === "All") return true;
    if (RoleFilter === "Admins") return u.role === "Admin";
    if (RoleFilter === "Managers") return u.role === "Manager";
    if (RoleFilter === "Employee") return u.role === "Employee";
  });

  const filterAdminCount = searchedUsers.filter(
    (u) => u.role === "Admin",
  ).length;

  const filterManagerCount = searchedUsers.filter(
    (u) => u.role === "Manager",
  ).length;

  const filterEmployeeCount = searchedUsers.filter(
    (u) => u.role === "Employee",
  ).length;

  console.log(users);

  const formatLastActive = (date) => {
    const d = new Date(date.endsWith("Z") ? date : date + "Z");
    const diff = (new Date() - d) / 1000;

    if (diff < 60) return { text: "Active now", isActive: true };
    if (diff < 3600)
      return { text: `${Math.floor(diff / 60)} min ago`, isActive: false };
    if (diff < 86400)
      return { text: `${Math.floor(diff / 3600)} hrs ago`, isActive: false };

    return {
      text: d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      isActive: false,
    };
  };

  // console.log(users);
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
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="h-7 border pl-8 text-[11px] font-bold rounded-md focus:outline-2 outline-[#4F46E5]"
              placeholder="Search User..."
            />
            <button
              type="button"
              onClick={() => setappliedSearch(search)}
              className="border px-3 h-7 rounded-md text-[11px] font-bold bg-[#4F46E5] text-white"
            >
              Search
            </button>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}

        <div className="Counts  p-4 flex justify-between gap-2">
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4  flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">👥</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {users.length}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Total Members
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">👑</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {adminCount}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Admins
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">🗃️</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {managerCount}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Managers
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">👤</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {employeeCount}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Employee
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}

        <div className="filter ml-4  flex gap-2 text-[#64748B]">
          <div
            className={`border cursor-pointer px-3 rounded-full text-[11px] font-bold py-1 ${RoleFilter === "All" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("All")}
          >
            <h1>
              All ( {appliedSearch === "" ? users.length : searchedUsers.length}{" "}
              )
            </h1>
          </div>
          <div
            className={`border  px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Admins" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("Admins")}
          >
            <h1>
              Admins ( {appliedSearch === "" ? adminCount : filterAdminCount} )
            </h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Managers" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("Managers")}
          >
            <h1>
              Managers ({" "}
              {appliedSearch === "" ? managerCount : filterManagerCount} )
            </h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Employee" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"} `}
            onClick={() => setRoleFilter("Employee")}
          >
            <h1>
              Employees ({" "}
              {appliedSearch === "" ? employeeCount : filterEmployeeCount} )
            </h1>
          </div>
        </div>

        {/* --------------------------------------------------------------------------------- */}

        <div className="p-4">
          <div className="border bg-white rounded-md overflow-x-scroll h-auto">
            <table className=" table w-full text-left  text-nowrap">
              <thead>
                <tr className="border  h-8 bg-[#F1F5F9] w-full text-[10px] text-[#94A3B8]">
                  <th className="pl-4">MEMBER</th>
                  <th className="">EMAIL</th>
                  <th className="">ROLE</th>
                  <th className="">TASKS</th>
                  <th className="">PROJECTS</th>
                  <th className="">JOINED</th>
                  <th className="">LAST ACTIVE</th>
                  {CurrentUser.role === "Admin" && (
                    <th className="">ACTIONS</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const status = formatLastActive(u.lastActiveAt);
                  return (
                    <tr key={u.userId}>
                      <td className="flex gap-2 px-4 py-2 items-center">
                        <div className="border rounded-full pt-[6px] w-8 h-8 text-[12px] text-center font-semibold text-white bg-blue-500">
                          {u.firstName.charAt(0).toUpperCase()}
                          {u.lastName.charAt(0).toUpperCase()}
                        </div>
                        <div className="leading-tight">
                          <h1 className="font-semibold text-[13px]">
                            {u.firstName} {u.lastName}
                          </h1>
                          {/* <p className="text-[10px] text-[#94A3B8]">You</p> */}
                        </div>
                      </td>
                      <td className="pr-2 text-[12px] font-semibold text-[#94A3B8]">
                        {u.email}
                      </td>
                      <td className="pr-2 flex items-center text-[12px] font-semibold ">
                        <h1
                          className={`rounded-full  py-1 px-3 ${u.role === "Admin" ? "bg-[#F5F3FF] text-[#7C3AED]" : u.role === "Manager" ? "bg-[#EFF6FF] text-[#3B82F6]" : "bg-[#F0FDF4] text-[#10B981]"}`}
                        >
                          {roleIcon[u.role]} {u.role}
                        </h1>
                      </td>
                      <td className="pr-2 text-[12px] text-[#94A3B8]">
                        <span className="text-black font-semibold">12</span> / 8
                        done
                      </td>
                      <td>
                        <p className="pr-2 text-[12px] font-semibold text-[#94A3B8]">
                          {u.projectCount}{" "}
                          {u.projectCount < 2 ? "project" : "projects"}
                        </p>
                      </td>
                      <td>
                        <p className="pr-2 text-[12px] text-[#94A3B8]">
                          {new Date(u.joinedAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td>
                        <p
                          className={`text-[12px] ${status.isActive ? "text-[#10B981]" : "text-[#b8b8b8] ml-1"}  flex font-semibold`}
                        >
                          {status.text}
                        </p>
                      </td>
                      {CurrentUser.role === "Admin" && (
                        <td className="pr-2">
                          <div
                            className="text-[#f00] px-4 cursor-pointer"
                            onClick={() => HandleDelete(u.userId)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
