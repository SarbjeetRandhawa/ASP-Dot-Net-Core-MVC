import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";

function ProjectPage() {
  const navigate = useNavigate();
  const [RoleFilter, setRoleFilter] = useState("All");

  return (
    <div className="flex ">
      <Sidebar />

      <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
        <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full justify-between items-center px-4">
          <h1 className="font-bold">Projects</h1>
          <div className="flex gap-2 relative">
            <div className="absolute w-0 left-1 top-1">🔍</div>
            <input
              type="text"
              //   value={search}
              //   onChange={(e) => setsearch(e.target.value)}
              className="h-7 border pl-8 text-[11px] font-bold rounded-md focus:outline-2 outline-[#4F46E5]"
              placeholder="Search projects..."
            />
            <div className="border relative px-1 rounded-md cursor-pointer">
              <div className="absolute text-4xl -top-6 text-red-600 right-[2px]">
                .
              </div>
              🔔
            </div>
            <button
              type="button"
              onClick={() => navigate("/projects/createProjects")}
              className="border px-3 h-7 rounded-md text-[11px] font-bold bg-[#4F46E5] text-white"
            >
              + New Project
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

        <div className="Counts  p-4 flex justify-between gap-2">
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4  flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">📁</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {/* {users.length} */}12
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Total Projects
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">🟢</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {/* {adminCount} */}9
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Active
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#E2E8F0] bg-[#F1F5F9] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">📦</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {/* {managerCount} */}3
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Archived
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#FDE68A] bg-[#FFFBEB] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">⚠️</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {/* {employeeCount} */}2
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Overdue Projects
              </p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------------- */}

        <div className="filter ml-4  flex gap-2 text-[#64748B]">
          <div
            className={`border cursor-pointer px-3 rounded-full text-[11px] font-bold py-1 ${RoleFilter === "All" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("All")}
          >
            <h1>All</h1>
          </div>
          <div
            className={`border  px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Admins" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("Admins")}
          >
            <h1>Admins</h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Managers" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setRoleFilter("Managers")}
          >
            <h1>Managers</h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${RoleFilter === "Employee" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"} `}
            onClick={() => setRoleFilter("Employee")}
          >
            <h1>Employees</h1>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}

        <div className="p-4">
          <div className=" h-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            <div className="border bg-white overflow-hidden cursor-pointer z-0 p-4 relative h-auto col rounded-md text-black">
              <div className="z-0 absolute w-[10rem] h-[10rem] bg-[#ffffff2e] -right-10 -top-10 rounded-full"></div>
              <div className="">
                <div className="flex flex-col gap-3 mt-1">
                  <div className="flex gap-3 justify-between items-center">
                    <div className="flex gap-3">
                      <div className="p-1 h-9 bg-[#0040ff33] rounded-lg text-[20px]">
                        📱
                      </div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Mobile App v3.0
                        </h1>
                        <p className="text-[11px] font-semibold text-[#94A3B8]">
                          Apr 1 &nbsp;- &nbsp; Apr 30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      
                      <p className="text-[11px] font-bold text-[#10B981] px-2 py-1 bg-[#ECFDF5] rounded-lg">Active</p>
                      <div className="text-[#94A3B8] z-30  p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-three-dots"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#64748B] break-words line-clamp-3 whitespace-pre-wrap text-[11px]">
                    Third major version of the IOS/Android Application
                  </p>
                  <div className="flex justify-between text-[10px] font-semibold text-[#64748B] mb-[-7px]">
                    <p>Progress</p>
                    <p className="font-bold text-[#0040ff]">30%</p>
                  </div>
                  <div className="progressbar w-full bg-[#E2E8F0] h-1 rounded-lg">
                    <div className="w-2/12 h-1 rounded-lg bg-[#0040ff]"></div>
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-[12px] text-[#64748B]">
                      9 tasks - <span className="text-red-600">2 overdue</span>
                    </p>

                    <div className=" text-white  w-6 h-6 sm:w-6 sm:h-6 border-2 border-[#fffffff4]  rounded-full text-[10px] text-center p-[3px] bg-[blue] font-bold">
                      AK
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <div className="border bg-white overflow-hidden cursor-pointer z-0 p-4 relative h-auto col rounded-md text-black">
              <div className="z-0 absolute w-[10rem] h-[10rem] bg-[#ffffff2e] -right-10 -top-10 rounded-full"></div>
              <div className="">
                <div className="flex flex-col gap-3 mt-1">
                  <div className="flex gap-3 justify-between items-center">
                    <div className="flex gap-3">
                      <div className="p-1 h-9 bg-[#0040ff33] rounded-lg text-[20px]">
                        📱
                      </div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Mobile App v3.0
                        </h1>
                        <p className="text-[11px] font-semibold text-[#94A3B8]">
                          Apr 1 &nbsp;- &nbsp; Apr 30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      
                      <p className="text-[11px] font-bold text-[#10B981] px-2 py-1 bg-[#ECFDF5] rounded-lg">Active</p>
                      <div className="text-[#94A3B8] z-30  p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-three-dots"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#64748B] break-words line-clamp-3 whitespace-pre-wrap text-[11px]">
                    Third major version of the IOS/Android Application
                  </p>
                  <div className="flex justify-between text-[10px] font-semibold text-[#64748B] mb-[-7px]">
                    <p>Progress</p>
                    <p className="font-bold text-[#0040ff]">30%</p>
                  </div>
                  <div className="progressbar w-full bg-[#E2E8F0] h-1 rounded-lg">
                    <div className="w-2/12 h-1 rounded-lg bg-[#0040ff]"></div>
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-[12px] text-[#64748B]">
                      9 tasks - <span className="text-red-600">2 overdue</span>
                    </p>

                    <div className=" text-white  w-6 h-6 sm:w-6 sm:h-6 border-2 border-[#fffffff4]  rounded-full text-[10px] text-center p-[3px] bg-[blue] font-bold">
                      AK
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <div className="border bg-white overflow-hidden cursor-pointer z-0 p-4 relative h-auto col rounded-md text-black">
              <div className="z-0 absolute w-[10rem] h-[10rem] bg-[#ffffff2e] -right-10 -top-10 rounded-full"></div>
              <div className="">
                <div className="flex flex-col gap-3 mt-1">
                  <div className="flex gap-3 justify-between items-center">
                    <div className="flex gap-3">
                      <div className="p-1 h-9 bg-[#0040ff33] rounded-lg text-[20px]">
                        📱
                      </div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Mobile App v3.0
                        </h1>
                        <p className="text-[11px] font-semibold text-[#94A3B8]">
                          Apr 1 &nbsp;- &nbsp; Apr 30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      
                      <p className="text-[11px] font-bold text-[#10B981] px-2 py-1 bg-[#ECFDF5] rounded-lg">Active</p>
                      <div className="text-[#94A3B8] z-30  p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-three-dots"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#64748B] break-words line-clamp-3 whitespace-pre-wrap text-[11px]">
                    Third major version of the IOS/Android Application
                  </p>
                  <div className="flex justify-between text-[10px] font-semibold text-[#64748B] mb-[-7px]">
                    <p>Progress</p>
                    <p className="font-bold text-[#0040ff]">30%</p>
                  </div>
                  <div className="progressbar w-full bg-[#E2E8F0] h-1 rounded-lg">
                    <div className="w-2/12 h-1 rounded-lg bg-[#0040ff]"></div>
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-[12px] text-[#64748B]">
                      9 tasks - <span className="text-red-600">2 overdue</span>
                    </p>

                    <div className=" text-white  w-6 h-6 sm:w-6 sm:h-6 border-2 border-[#fffffff4]  rounded-full text-[10px] text-center p-[3px] bg-[blue] font-bold">
                      AK
                    </div>
                  </div>
                </div>
              </div>
            </div> <div className="border bg-white overflow-hidden cursor-pointer z-0 p-4 relative h-auto col rounded-md text-black">
              <div className="z-0 absolute w-[10rem] h-[10rem] bg-[#ffffff2e] -right-10 -top-10 rounded-full"></div>
              <div className="">
                <div className="flex flex-col gap-3 mt-1">
                  <div className="flex gap-3 justify-between items-center">
                    <div className="flex gap-3">
                      <div className="p-1 h-9 bg-[#0040ff33] rounded-lg text-[20px]">
                        📱
                      </div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Mobile App v3.0
                        </h1>
                        <p className="text-[11px] font-semibold text-[#94A3B8]">
                          Apr 1 &nbsp;- &nbsp; Apr 30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      
                      <p className="text-[11px] font-bold text-[#10B981] px-2 py-1 bg-[#ECFDF5] rounded-lg">Active</p>
                      <div className="text-[#94A3B8] z-30  p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-three-dots"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#64748B] break-words line-clamp-3 whitespace-pre-wrap text-[11px]">
                    Third major version of the IOS/Android Application
                  </p>
                  <div className="flex justify-between text-[10px] font-semibold text-[#64748B] mb-[-7px]">
                    <p>Progress</p>
                    <p className="font-bold text-[#0040ff]">30%</p>
                  </div>
                  <div className="progressbar w-full bg-[#E2E8F0] h-1 rounded-lg">
                    <div className="w-2/12 h-1 rounded-lg bg-[#0040ff]"></div>
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-[12px] text-[#64748B]">
                      9 tasks - <span className="text-red-600">2 overdue</span>
                    </p>

                    <div className=" text-white  w-6 h-6 sm:w-6 sm:h-6 border-2 border-[#fffffff4]  rounded-full text-[10px] text-center p-[3px] bg-[blue] font-bold">
                      AK
                    </div>
                  </div>
                </div>
              </div>
            </div> <div className="border bg-white overflow-hidden cursor-pointer z-0 p-4 relative h-auto col rounded-md text-black">
              <div className="z-0 absolute w-[10rem] h-[10rem] bg-[#ffffff2e] -right-10 -top-10 rounded-full"></div>
              <div className="">
                <div className="flex flex-col gap-3 mt-1">
                  <div className="flex gap-3 justify-between items-center">
                    <div className="flex gap-3">
                      <div className="p-1 h-9 bg-[#0040ff33] rounded-lg text-[20px]">
                        📱
                      </div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Mobile App v3.0
                        </h1>
                        <p className="text-[11px] font-semibold text-[#94A3B8]">
                          Apr 1 &nbsp;- &nbsp; Apr 30
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      
                      <p className="text-[11px] font-bold text-[#10B981] px-2 py-1 bg-[#ECFDF5] rounded-lg">Active</p>
                      <div className="text-[#94A3B8] z-30  p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-three-dots"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#64748B] break-words line-clamp-3 whitespace-pre-wrap text-[11px]">
                    Third major version of the IOS/Android Application
                  </p>
                  <div className="flex justify-between text-[10px] font-semibold text-[#64748B] mb-[-7px]">
                    <p>Progress</p>
                    <p className="font-bold text-[#0040ff]">30%</p>
                  </div>
                  <div className="progressbar w-full bg-[#E2E8F0] h-1 rounded-lg">
                    <div className="w-2/12 h-1 rounded-lg bg-[#0040ff]"></div>
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-[12px] text-[#64748B]">
                      9 tasks - <span className="text-red-600">2 overdue</span>
                    </p>

                    <div className=" text-white  w-6 h-6 sm:w-6 sm:h-6 border-2 border-[#fffffff4]  rounded-full text-[10px] text-center p-[3px] bg-[blue] font-bold">
                      AK
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
