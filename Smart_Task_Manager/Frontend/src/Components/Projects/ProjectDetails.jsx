import React from "react";
import Sidebar from "../Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isCancel } from "axios";

function ProjectDetails() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState("medium");
  const [TaskStatus, setTaskStatus] = useState("overdue");
  const [showoptions, setshowoptions] = useState(false);
  const [IsChecked, setIsChecked] = useState(false);
  const colors = [
    "bg-[linear-gradient(to_bottom_right,#534545,#ff0000)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#00ff22)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#9d00ff)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#eeff00)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#ff00e6)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#00ffff)]",
  ];

  const HandleCheck = (e) => {
    console.log(e.target.checked);

    setIsChecked(e.target.checked);

    if (!IsChecked) {
      setTaskStatus("Done");
    } else {
      setTaskStatus("ToDo");
    }
  };

  return (
    <div className="flex ">
      <Sidebar />

      <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
        <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center px-4">
          <div className=" p-3 mx-0 sm:mx-4  ">
            <p className="text-[7px] sm:text-[11px] font-semibold text-[#64748B]">
              <span className="text-[#94A3B8]">Projects &gt;</span> E-Commerce
              Rebild
            </p>
            <h1 className="font-bold mt-[-3px] text-[#0F172A] text-[12px]">
              E-Commerce Rebild
            </h1>
          </div>
          <div className="flex  sm:flex-nowrap gap-1 sm:gap-2 items-center  w-1/2">
            <button
              type="button"
              onClick={() => {
                navigate("/projects");
              }}
              className="border sm:h-8 h-6 text-[8px] sm:text-[11px] font-bold rounded-md px-1 sm:px-3 whitespace-nowrap"
            >
              Back
            </button>
            <button
              type="button"
              className="border sm:h-8 h-6 text-[8px] sm:text-[11px] font-bold rounded-md px-1 sm:px-3 whitespace-nowrap"
            >
              📦 Archive
            </button>
            <button className="border sm:h-8 h-6 text-[8px] sm:text-[11px] text-white font-bold rounded-md px-2 sm:px-3 bg-[#4F46E5] whitespace-nowrap">
              + Add Task
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}

        <div className="p-4">
          <div className="flex  h-44 rounded-md  bg-[linear-gradient(to_right,#1E1B4B,#2731c5)] ">
            <div className="p-4 w-2/3 flex flex-col justify-between">
              <div className=" text-white">
                <div className="flex  items-center">
                  <div className=" p-[6px] text-2xl">📱</div>
                  <div className="p-1">
                    <h1 className="font-bold text-xl">E-Commerece Rebuild</h1>
                    <p className="text-[#FFFFFF99] text-[12px]">
                      Created By Alex Kumar &middot; <span>Jan 24, 2025</span>
                    </p>
                  </div>
                </div>
              </div>
              <p className=" h-auto text-[12px] text-[#FFFFFF99]">
                Complete overhaul of the online store platform with new payment
                gateway integration, improved UX, and modern tech stack
                migration.{" "}
              </p>
              <div className=" h-auto text-[#ffffff99] flex gap-4 text-[11px]">
                <p>
                  <span className="text-white">📆</span>Jan 15 - Apr 30, 2025
                </p>
                <p>
                  <span className="text-white">👥</span> 5 Members
                </p>
                <p>
                  <span className="text-white">✅</span>18 Tasks
                </p>
              </div>
            </div>
            <div className=" w-1/3 p-4 relative overflow-hidden flex flex-col justify-center items-end">
              <div className="flex  flex-col text-white items-center">
                <h1 className="text-5xl font-extrabold">72%</h1>
                <p className="text-[11px] text-[#ffffffb3]">Completed</p>
                <div className="w-40 h-2 mt-2 bg-[#FFFFFF26] rounded-lg">
                  <div className="h-[7px] bg-[#c1d3d5] w-[60%] rounded-lg "></div>
                </div>
              </div>
              <div className="absolute   w-44 h-44 bg-[#FFFFFF0D] rounded-full -top-10 -right-10"></div>
              <div className="absolute  w-32 h-32 bg-[#FFFFFF0D] rounded-full top-20 right-14"></div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}

        <div className="px-4">
          <div className="grid grid-flow-col gap-2">
            <div className="text-center border px-4 py-2 rounded-md bg-white">
              <h1 className="text-[22px] font-bold">18</h1>
              <p className="text-[12px] text-[#64748B]">Total Tasks</p>
            </div>
            <div className="text-center border px-4 py-2 rounded-md bg-white">
              <h1 className="text-[22px] font-bold  text-[#10B981]">13</h1>
              <p className="text-[12px] text-[#64748B]">Completed</p>
            </div>
            <div className="text-center border px-4 py-2 rounded-md bg-white">
              <h1 className="text-[22px] font-bold  text-[#3B82F6]">2</h1>
              <p className="text-[12px] text-[#64748B]">In Progress</p>
            </div>
            <div className="text-center border px-4 py-2 rounded-md bg-white">
              <h1 className="text-[22px] font-bold  text-[#F59E0B]">3</h1>
              <p className="text-[12px] text-[#64748B]">To Do</p>
            </div>
            <div className="text-center border px-4 py-2 rounded-md bg-white">
              <h1 className="text-[22px] font-bold text-[#EF4444]">3</h1>
              <p className="text-[12px] text-[#64748B]">Overdue</p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

        <div className="p-4 flex gap-4">
          <div className="border  rounded-md bg-white h-auto   w-4/5">
            <div className="px-4  py-2 text-[14px] font-bold ">
              <h1>Tasks</h1>
              <p className="text-[10px] font-semibold text-[#64748B]">
                18 total in this Project
              </p>
            </div>
            <div className="border bg-white  overflow-x-scroll rounded-b-md ">
              <table className=" tabel w-full text-left   text-nowra">
                <thead>
                  <tr className="border  h-8 bg-[#F1F5F9] w-full text-[10px] text-[#94A3B8]">
                    <th className="w-12"></th>
                    <th className="">TASK</th>
                    <th className="">ASSIGNEE</th>
                    <th className="">PRIORITY</th>
                    <th className="">STATUS</th>
                    <th className="">DUE DATE</th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="px-6 items-center">
                      <div class="inline-flex items-center">
                        <label class="flex items-center cursor-pointer relative">
                          <input
                            type="checkbox"
                            checked={IsChecked}
                            onChange={(e) => {
                              HandleCheck(e);
                            }}
                            class="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
                          />
                          <span class="absolute  text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div className="py-2">
                        <h1
                          className={`text-[14px] ${TaskStatus === "Done" ? "line-through text-[#94A3B8]" : ""} font-bold`}
                        >
                          Design checkout UI wireframes
                        </h1>
                        <p className="text-[#94A3B8] text-[12px]">
                          Devops setup and configuration
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <div
                          className={`border w-6 h-6 text-[10px] rounded-full items-center flex justify-center ${colors[0]} text-white font-semibold text-center`}
                        >
                          AK
                        </div>
                        <p className="text-[13px] text-[#64748B] font-semibold">
                          Alex Kumar
                        </p>
                      </div>
                    </td>
                    <td className="pr-2  text-[12px] font-semibold ">
                      <div className="flex">
                        <h1
                          className={`rounded-full py-1 px-3  ${priority === "low" ? "text-[#10B981] bg-[#F0FDF4]" : priority === "medium" ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"} `}
                        >
                          Medium
                        </h1>
                      </div>
                    </td>
                    <td className="pr-2  text-[12px] font-semibold ">
                      <div className="flex">
                        <h1
                          className={`rounded-full py-1 px-3 ${TaskStatus === "Done" ? "text-[#10B981] bg-[#F0FDF4]" : TaskStatus === "ToDo" ? "text-[#64748B] bg-[#F1F5F9]" : "text-[#EF4444] bg-[#FEF2F2]"}`}
                        >
                          Done
                        </h1>
                      </div>
                    </td>
                    <td>
                      <p className="pr-2 text-[12px] font-semibold text-[#94A3B8]">
                        Mar 10
                      </p>
                    </td>
                    <td>
                      {" "}
                      <div
                        onClick={() => {
                          setshowoptions(!showoptions);
                        }}
                        className="flex relative  cursor-pointer items-center"
                      >
                        &middot;&middot;&middot;{" "}
                        <div className="absolute border bg-white w-20 h-28  top-5 right-0"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="border h-auto rounded-md bg-white w-1/5"></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
