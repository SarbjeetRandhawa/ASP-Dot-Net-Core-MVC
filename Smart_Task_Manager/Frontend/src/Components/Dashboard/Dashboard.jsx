import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  });

   return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%] lg:pt-0 pt-14">
          <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center ">
            <div className="mx-0 sm:mx-4  ">
              <h1 className="font-bold mt-[-3px] text-[#0F172A] text-[17px]">
                
                Dashboard

                <span className="font-normal text-[#6c6c6c] text-[13px] pl-3">
                  Good Morning Alex 🖐️
                </span>


              </h1>
            </div>
            <div className="flex  sm:flex-nowrap gap-1 sm:gap-2 items-center  w-1/2">
              <button
                type="button"
                className="border sm:h-8 h-6 text-[8px]  sm:text-[11px] font-bold rounded-md px-1 sm:px-3 whitespace-nowrap"
              >
                🔔
              </button>

              <button
                type="button"
                onClick={()=>navigate("/Tasks/CreateTask")}
                className={`border sm:h-8 h-6 text-[8px] sm:text-[11px] bg-[#4F46E5] text-white font-bold rounded-md px-2 sm:px-3  whitespace-nowrap`}
              >
                + New Task
              </button>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-4 w-full">
            <div className="flex gap-2 w-full ">
              <div className="flex gap-2 w-full">
                <div className="shadow-md border-2 bg-white rounded-lg w-full flex flex-col items-start p-4">
                  <div className="flex p-2 justify-center items-center rounded-xl bg-[#EFF6FF] text-[12px]">
                    📋
                  </div>
                  <h1 className="text-[28px] font-extrabold">84</h1>
                  <p className="text-[12px] text-[#64748B]">Total Tasks</p>
                  <p className="text-[11px] flex font-semibold text-[#10B981]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-up-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                      />
                    </svg>{" "}
                    12% this week
                  </p>
                </div>
                <div className="shadow-md border-2 bg-white rounded-lg w-full flex flex-col items-start p-4">
                  <div className="flex p-2 justify-center items-center rounded-xl bg-[#ECFDF5] text-[12px]">
                    ✅
                  </div>
                  <h1 className="text-[28px] font-extrabold">52</h1>
                  <p className="text-[12px] text-[#64748B]">Completed</p>
                  <p className="text-[11px] flex font-semibold text-[#10B981]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-up-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
                      />
                    </svg>{" "}
                    12% this week
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <div className="shadow-md border-2 bg-white rounded-lg w-full flex flex-col items-start p-4">
                  <div className="flex p-2 justify-center items-center rounded-xl bg-[#FFFBEB] text-[12px]">
                    ⌛
                  </div>
                  <h1 className="text-[28px] font-extrabold">19</h1>
                  <p className="text-[12px] text-[#64748B]">In Progress</p>
                  <p className="text-[11px] flex font-semibold text-[#10B981]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                      />
                    </svg>{" "}
                    stable
                  </p>
                </div>
                <div className="shadow-md border-2 bg-white rounded-lg w-full flex flex-col items-start p-4">

                  <div className="flex p-2 justify-center items-center rounded-xl bg-[#FEF2F2] text-[12px]">
                    ⚠️
                  </div>

                  <h1 className="text-[28px] font-extrabold">7</h1>
                  <p className="text-[12px] text-[#64748B]">Overdue</p>
                  <p className="text-[11px] flex font-semibold text-[#f21616]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-down-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
                      />
                    </svg>{" "}
                    2 from last week
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row  w-full gap-3">
              <div className=" flex flex-col w-full lg:w-2/3 lg:flex-row gap-2">
                <div className="shadow-md border-2 p-4 w-full bg-white rounded-lg">
                  <div className="border-b pb-2">
                    <h1 className="text-[14px] font-bold">Tasks by Status</h1>
                    <p className="text-[12px] text-[#64748B]">
                      Distribution overview
                    </p>
                  </div>

                  <div className="flex flex-col mt-6 items-center justify-center">
                    <div className="flex  justify-center items-center ">
                      <div className="px-12 py-4">
                        <h1 className="text-[18px] leading-5 font-extrabold">
                          84
                        </h1>
                        <p className="text-[9px] text-[#94A3B8]">Total</p>
                      </div>
                      <div className="flex flex-col  ">

                        <div className="flex justify-between ">
                          {" "}
                          <div className="flex items-center gap-2 ">
                            <div className="r w-2 rounded-full bg-green-600 h-2"></div>
                            <h1 className="text-[12px] text-[#64748B]">Done</h1>
                          </div>
                          <h1 className="text-[13px] font-bold">52</h1>
                        </div>
                        <div className="flex justify-between ">
                          {" "}
                          <div className="flex items-center gap-2 w-24">
                            <div className=" w-2 rounded-full bg-blue-600 h-2"></div>
                            <h1 className="text-[12px] text-[#64748B]">
                              In Progress
                            </h1>
                          </div>
                          <h1 className="text-[13px] font-bold">19</h1>
                        </div>
                        <div className="flex justify-between ">
                          {" "}
                          <div className="flex items-center gap-2 ">
                            <div className=" w-2 rounded-full bg-yellow-600 h-2"></div>
                            <h1 className="text-[12px] text-[#64748B]">Todo</h1>
                          </div>
                          <h1 className="text-[13px] font-bold">13</h1>
                        </div>
                        <div className="flex justify-between ">
                          {" "}
                          <div className="flex items-center gap-2 ">
                            <div className=" w-2 rounded-full bg-red-600 h-2"></div>
                            <h1 className="text-[12px] text-[#64748B]">
                              Overdue
                            </h1>
                          </div>
                          <h1 className="text-[13px] font-bold">7</h1>
                        </div>
                      </div>
                    </div>
                    <div
                      className={` mt-6 h-[6px] flex transition-all duration-[3s] ease-in-out ${animate ? "w-full" : "w-0"}`}
                    >
                      <div className="border h-full w-[50%] border-r-0 rounded-l-lg bg-green-500"></div>
                      <div className="border h-full w-[20%] border-x-0 bg-blue-500"></div>
                      <div className="border h-full w-[20%] border-x-0 bg-yellow-500"></div>
                      <div className="border h-full w-[10%] border-l-0 rounded-r-lg bg-red-500"></div>
                    </div>
                  </div>
                </div>

                <div className="shadow-md border-2 p-4 w-full bg-white rounded-lg">
                  <div className="border-b pb-2">
                    <h1 className="text-[14px] font-bold">Weekly Activity</h1>
                    <p className="text-[12px] text-[#64748B]">
                      Tasks completed per day
                    </p>
                  </div>

                  <div className=" h-auto relative gap- flex flex-col mt-6 items-end ">
                    <h1 className="text-[10px] text-[#bcc5cf] -left-6 -top-3 absolute">
                      100
                    </h1>
                    <h1 className="text-[10px] text-[#bcc5cf] -left-6 top-[22%] absolute">
                      75
                    </h1>
                    <h1 className="text-[10px] text-[#bcc5cf] -left-6 top-[47%] absolute">
                      50
                    </h1>
                    <h1 className="text-[10px] text-[#bcc5cf] -left-6 top-[72%] absolute">
                      25
                    </h1>
                    <h1 className="text-[10px] text-[#bcc5cf] -left-6 top-[97%] absolute">
                      0
                    </h1>

                    <div className="border-dashed border-[#F1F5F9] border top-0 w-full absolute"></div>
                    <div className="border-dashed border-[#F1F5F9] border top-[25%] w-full absolute"></div>
                    <div className="border-dashed border-[#F1F5F9] border top-[50%] z-10 w-full absolute"></div>
                    <div className="border-dashed border-[#F1F5F9] border top-[75%] w-full absolute"></div>

                    <div className="flex h-40 gap-2 w-full">
                      <div className=" w-1/6 flex flex-col  z-20  justify-end items-center">
                        <div
                          className={`border relative w-full bottom bg-[#4F46E5]/50   rounded-t-md transition-all duration-1000 ease-in-out ${animate ? "h-[50%]" : "h-0"}`}
                        >
                          <h1 className="text-[9px] absolute -top-4 left-[45%]">
                            5
                          </h1>
                        </div>
                      </div>
                      <div className=" w-1/6 z-20 flex flex-col justify-end items-center">
                        <div
                          className={`border  relative w-full bottom bg-[#4F46E5]/70   rounded-t-md transition-all duration-1000 ease-in-out ${animate ? "h-[70%]" : "h-0"}`}
                        >
                          <h1 className="text-[9px] absolute -top-4 left-[45%]">
                            7
                          </h1>
                        </div>
                      </div>
                      <div className=" w-1/6 z-20 flex flex-col justify-end items-center">
                        <div
                          className={`border  relative w-full bottom bg-[#4F46E5]/40 rounded-t-md transition-all duration-1000 ease-in-out ${animate ? "h-[40%]" : "h-0"}`}
                        >

                          <h1 className="text-[9px] absolute -top-4 left-[45%]">
                            4
                          </h1>

                        </div>
                      </div>

                      <div className=" z-20  w-1/6 flex flex-col   justify-end items-center">
                        <div
                          className={`border relative w-full bottom bg-[#4F46E5]/100   rounded-t-md transition-all duration-1000 ease-in-out ${animate ? "h-[100%]" : "h-0"}`}
                        >
                          <h1 className="text-[9px] absolute -top-4 left-[45%]">
                            10
                          </h1>
                        </div>
                      </div>

                      
                      
                      <div className=" w-1/6 z-20  flex flex-col   justify-end items-center">
                        <div
                          className={`border  relative w-full bottom bg-[#4F46E5]/60   rounded-t-md transition-all duration-1000 ease-in-out ${animate ? "h-[60%]" : "h-0"}`}
                        >
                          <h1 className="text-[9px] absolute -top-4 left-[45%]">
                            6
                          </h1>
                        </div>
                      </div>
                      <div className=" w-1/6 z-20  flex flex-col    justify-end items-center">
                        <div
                          className={`border relative w-full bottom bg-[#4F46E5]/30   rounded-t-md transition-all duration-1000 ease-in-out ${animate ? "h-[30%]" : "h-0"}`}
                        >
                          {" "}
                          <h1 className="text-[9px]  absolute -top-4 left-[45%]">
                            3
                          </h1>
                        </div>
                      </div>
                      <div className=" w-1/6 z-20   flex flex-col    justify-end items-center">
                        <div
                          className={`border relative  w-full bottom bg-[#4F46E5]/10   rounded-t-md transition-all duration-1000 ease-in-out ${animate ? "h-[10%]" : "h-0"}`}
                        >
                          <h1 className="text-[9px] absolute -top-4 left-[45%]">
                            1
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full flex gap-2 justify-around">
                    <h1 className="text-[10px]  text-[#94A3B8]">Mon</h1>
                    <h1 className="text-[10px]  text-[#94A3B8]">Tue</h1>
                    <h1 className="text-[10px]  text-[#94A3B8]">Wed</h1>
                    <h1 className="text-[10px]  text-[#94A3B8]">Thu</h1>
                    <h1 className="text-[10px]  text-[#94A3B8]">Fri</h1>
                    <h1 className="text-[10px]  text-[#94A3B8]">Sat</h1>
                    <h1 className="text-[10px]  text-[#94A3B8]">Sun</h1>
                  </div>
                </div>
              </div>

              <div className="shadow-md w-full lg:w-1/3 border-2 p-4  bg-white rounded-lg">
                <div className="border-b pb-2 flex items-center justify-between">
                  <div>
                    <h1 className="text-[14px] font-bold">Active Projects</h1>
                    <p className="text-[12px] text-[#64748B] ">
                      Prgress Overview
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#4F46E5] cursor-pointer">
                      View all
                    </p>
                  </div>
                </div>
                <div className="py-1">
                  <div className=" py-2 flex gap-3 items-center">
                    <div className="w-3 h-10 rounded-full bg-[#4F46E5]"></div>
                    <div className=" w-full flex flex-col gap-">
                      <h1 className="text-[13px] font-semibold">
                        E-Commerce Rebuild
                      </h1>
                      <p className="text-[11px] text-[#667281]">
                        18 tasks - 3 overdue
                      </p>
                      <div className="mt-1 rounded-full h-[6px] bg-[#E2E8F0] w-full">
                        <div
                          className={`border h-[6px]  bg-[#4F46E5] rounded-full transition-all duration-[2s] ease-in-out ${animate ? "w-[72%]" : "w-0"}`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-[12px] font-bold text-[#4F46E5]">
                        72%
                      </h1>
                    </div> 
                  </div>

                  <div className=" py-2 flex gap-3 items-center">
                    <div className="w-3 h-10 rounded-full bg-[#10B981]"></div>
                    <div className=" w-full flex flex-col gap-3">
                      <h1 className="text-[13px] font-semibold">
                        E-Commerce Rebuild
                      </h1>
                      <p className="text-[11px] text-[#667281]">
                        18 tasks - 3 overdue
                      </p>
                      <div className="mt-1 rounded-full h-[6px] bg-[#E2E8F0] w-full">
                        <div
                          className={`border h-[6px]  bg-[#10B981] rounded-full transition-all duration-[2s] ease-in-out ${animate ? "w-[45%]" : "w-0"}`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-[12px] font-bold text-[#4F46E5]">
                        45%
                      </h1>
                    </div>
                  </div>

                  <div className=" py-2 flex gap-3 items-center">
                    <div className="w-3 h-10 rounded-full bg-[#F59E0B]"></div>
                    <div className=" w-full flex flex-col gap-">
                      <h1 className="text-[13px] font-semibold">
                        E-Commerce Rebuild
                      </h1>
                      <p className="text-[11px] text-[#667281]">
                        18 tasks - 3 overdue
                      </p>
                      <div className="mt-1 rounded-full h-[6px] bg-[#E2E8F0] w-full">
                        <div
                          className={`border h-[6px]  bg-[#F59E0B] rounded-full transition-all duration-[2s] ease-in-out ${animate ? "w-[88%]" : "w-0"}`}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <h1 className="text-[12px] font-bold text-[#4F46E5]">
                        88%
                      </h1>
                    </div>
                  </div>

                  <div className=" py-2 flex gap-3 items-center">
                    <div className="w-3 h-10 rounded-full bg-[#EF4444]"></div>
                    <div className=" w-full flex flex-col gap-">
                      <h1 className="text-[13px] font-semibold">
                        E-Commerce Rebuild
                      </h1>
                      <p className="text-[11px] text-[#667281]">
                        18 tasks - 3 overdue
                      </p>
                      <div className="mt-1 rounded-full h-[6px] bg-[#E2E8F0] w-full">
                        <div
                          className={`border h-[6px]  bg-[#EF4444] rounded-full transition-all duration-[2s] ease-in-out ${animate ? "w-[30%]" : "w-0"}`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-[12px] font-bold text-[#4F46E5]">
                        30%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 w-full">
              <div className="shadow-md border-2 p-4 w-full md:w-3/5 bg-white rounded-xl">
                <div className="border-b pb-2 flex items-center justify-between">
                  <div>
                    <h1 className="text-[14px] font-bold">My Tasks</h1>
                    <p className="text-[12px] text-[#64748B] ">
                      Assigned to you today
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#4F46E5] cursor-pointer">
                      View all
                    </p>
                  </div>
                </div>

                <div className="py-2 mt-2 flex flex-col gap-2">
                  <div className="flex justify-between items-center ">
                    <div className="flex gap-3 items-center">
                      <div className=" text-green-500 rounded-full w-4 h-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-check-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </div>
                      <div>
                        <h1 className="font-semibold text-[#94A3B8] line-through text-[13px]">
                          Set up pipline configuration
                        </h1>
                        <p className="text-[#94A3B8] text-[11px]">
                          E-Commerce Rebuild -{" "}
                          <span className="text-green-500">Completed</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#64748B]">Mar 10</p>
                  </div>

                  <div className="flex justify-between items-center ">
                    <div className="flex gap-3 items-center">
                      <div className="border-4 rounded-full w-4 h-4"></div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Set up pipline configuration
                        </h1>
                        <p className="text-[#94A3B8] text-[11px]">
                          E-Commerce Rebuild - <span>Completed</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#64748B] flex gap-1 text-red-500">
                      Mar 10{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="16"
                        fill="currentColor"
                        class="bi bi-exclamation-triangle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>

              <div className="shadow-md border-2 p-4 w-full md:w-2/5 rounded-xl bg-white">
                <div className="border-b pb-2 flex items-center justify-between">
                  <div>
                    <h1 className="text-[14px] font-bold">Recent Activity</h1>
                    <p className="text-[12px] text-[#64748B] ">Team Updates</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#4F46E5] cursor-pointer">
                      See all
                    </p>
                  </div>
                </div>
                <div className="py-2 mt-2 flex flex-col gap-2">
                  <div className="flex justify-between items-center ">
                    <div className="flex gap-3 items-center">
                      <div className=" bg-[#eafde7] rounded-full p-2 text-[11px]">
                        ✅
                      </div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Set up pipline configuration
                        </h1>
                        <p className="text-[#94A3B8] text-[11px]">
                          E-Commerce Rebuild{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center ">
                    <div className="flex gap-3 items-center">
                      <div className=" bg-[#e7f2fd] rounded-full p-2 text-[11px]">
                        💬
                      </div>
                      <div>
                        <h1 className="font-semibold text-[13px]">
                          Set up pipline configuration
                        </h1>
                        <p className="text-[#94A3B8] text-[11px]">
                          E-Commerce Rebuild{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
