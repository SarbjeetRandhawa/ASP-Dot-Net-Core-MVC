import React, { useEffect } from "react";
import { Paperclip, HeartIcon, AtSign, AtSignIcon } from "lucide-react";
import { useState } from "react";
import Sidebar from "../Sidebar";
import { fetchProjectById } from "../../features/project/projectSlice";
import { useSelector , useDispatch } from "react-redux";

function TaskDetail() {

  const [TaskStatus, setTaskStatus] = useState("ToDo");
  const {selectedTask , loading} = useSelector((state)=>state.tasks);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProjectById(4));
  },[dispatch])

  // console.log(selectedTask);

  
  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
          <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center px-4">
            <div className=" p-3 mx-0 sm:mx-4 ">
              <p className="text-[7px] sm:text-[11px] font-semibold text-[#64748B]">
                <span className="text-[#94A3B8]">Projects &gt;</span>{" "}
                <span className="text-[#94A3B8]">Project Name &gt;</span>{" "}
                <span className="text-[#94A3B8]">Task Detail </span>{" "}
              </p>
              <h1 className="font-bold mt-[-1px] text-[#0F172A] text-[12px]">
                Create New Task
              </h1>
            </div>
            <div className="flex  sm:flex-nowrap gap-1 sm:gap-2 items-center  w-1/2">
              <button
                type="button"
                onClick={() => {
                  // navigate("/projects");
                }}
                className="border sm:h-8 h-6 text-[8px] sm:text-[11px] font-bold rounded-md px-1 sm:px-3 whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="button"
                className="border sm:h-8 h-6 text-[8px] sm:text-[11px] font-bold rounded-md px-1 sm:px-3 whitespace-nowrap"
              >
                ✏️ Edit
              </button>
              <button
                // ${selectedProject?.colorTheme ? `bg-[${selectedProject.colorTheme}] text-white` : "text-black"}
                className={`border sm:h-8 h-6 text-[8px] sm:text-[11px]  font-bold   rounded-md px-2 sm:px-3  whitespace-nowrap`}
              >
                🗑️ Delete
              </button>
            </div>
          </div>

          {/* ------------------------------------- */}

          <div className="flex lg:flex-row flex-col gap-2 p-4">
            <div className=" w-full lg:w-2/3  flex flex-col gap-3 ">
              <div className=" shadow-md bg-white rounded-xl border-2 p-4 flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="px-4 py-1 font-semibold text-[12px] text-[#3B82F6] bg-[#EFF6FF] rounded-full">
                    ⌛ In Progress
                  </div>
                  <div className="px-4 py-1 font-semibold text-[12px] text-[#EF4444] bg-[#FEE2E2] rounded-full">
                    🔴 High Priority
                  </div>
                  <div className="px-4 py-1 flex  font-semibold text-[12px] text-[#EF4444] bg-[#FEE2E2] rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-exclamation-triangle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>{" "}
                    &nbsp; Overdue by 4 days
                  </div>
                </div>

                <div className=" pb-2  border-b">
                  <h1 className="font-bold text-[20px]">
                    Design checkout Ui wireFrams for E-Commerce platform
                  </h1>
                </div>

                <div>
                  <h1 className="font-semibold text-[12px] text-[#64748B] tracking-wider">
                    DESCRIPTION
                  </h1>
                </div>
                <div>Discription Content</div>
              </div>

              <div className="shadow-md bg-white border-2 rounded-xl p-4">
                <div className="flex  justify-between items-center">
                  <div>
                    <h1 className="font-bold text-[14px]">Attachments</h1>
                    <p className="text-[12px] tracking-wide font-semibold text-[#64748B]">
                      3 files uploaded
                    </p>
                  </div>
                  <div
                    className="border-2 cursor-pointer flex items-center 
                     px-4 h-8 text-[12px] font-semibold rounded-md"
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Upload File
                  </div>
                </div>
                <div className="flex gap-4 mt-4  w-full flex-wrap">
                  <div className="hover:shadow-md cursor-pointer border p-6 rounded-md flex flex-col gap-2 items-center text-[#64748B] text-[10px]  w-[190px]">
                    <img
                      src="/public/pdf_4726010.png"
                      className="w-10"
                      alt=""
                    />
                    <h1 className="text-black font-semibold text-[12px]">
                      design-specs.pdf
                    </h1>
                    <p>2.4MB - Emma Davis</p>
                    <p>Mar 10, 2023</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 shadow-md">
                <div>
                  <div className="flex p-4 justify-between items-center">
                    <div>
                      <h1 className="font-bold text-[14px]">Comments</h1>
                      <p className="text-[12px] tracking-wide font-semibold text-[#64748B]">
                        4 Comments
                      </p>
                    </div>
                  </div>
                  <div className="border-t p-4 ">
                    <div className="flex ">
                      <div>
                        <div className="w-8 h-8 bg-[#096dfa] rounded-full flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">
                            JD
                          </span>
                        </div>
                      </div>
                      <div className="ml-4  w-full">
                        <div className="flex justify-between ">
                          <h1 className="font-bold text-[13px]">
                            John Doe{" "}
                            <span className="ml-3  text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F5F3FF] text-[#7C3AED]">
                              Admin
                            </span>
                          </h1>
                          <p className="text-[12px] text-[#94A3B8]">
                            Mar 12, 2023 at 2:30 PM
                          </p>
                        </div>
                        <p className="mt-2  bg-[#F1F5F9] p-3 pr-10 rounded-xl text-[13px]  text-[#374151]">
                          Emma, please make sure the checkout flow is aligned
                          with our mobile-first approach. Reference the design
                          system doc I shared earlier. Also, please include a
                          guest checkout option.
                        </p>
                        <p className="mt-2 flex text-[#94A3B8] gap-1 items-center ">
                          <HeartIcon className="w-4 h-4 text-black cursor-pointer hover:fill-red-600 hover:text-red-600 " />{" "}
                          2 &nbsp;{" "}
                          <span className="text-[12px] text-blue-600 font-semibold tracking-wider cursor-pointer">
                            Reply
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4  flex ">
                  <div className="  gap-4 w-full ">
                    <div className="flex gap-4 items-start mb-2">
                      <div className="w-[35px] h-8 bg-[#096dfa] rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">
                          AK
                        </span>
                      </div>
                      <div className="w-full">
                        <textarea
                          className="w-full h-20 resize-none border rounded-md p-2 text-[12px] font-semibold hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Write a comment..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2 ml-12">
                        <div
                          className="border-2 cursor-pointer flex items-center 
                     px-4 h-8 text-[12px] font-semibold rounded-md hover:shadow-md"
                        >
                          <Paperclip className="w-4 h-4 mr-2" />
                          Attach
                        </div>
                        <div
                          className="border-2 cursor-pointer flex items-center 
                     px-4 h-8 text-[12px] font-semibold rounded-md  hover:shadow-md"
                        >
                          <AtSignIcon className="w-4 h-4 mr-2" />
                          Mention
                        </div>
                      </div>
                      <div
                        className="border-2 cursor-pointer flex items-center 
                     px-4 h-8 text-[12px] font-semibold rounded-md bg-[#4F46E5] text-white hover:bg-[#6059e5]"
                      >
                        Post Comment
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-2 shadow-md bg-white rounded-xl">
                
                  <h1 className="font-bold text-[14px] ">Activity Timeline</h1>
                
                <div className="mt-4 relative flex flex-col gap-4 pt-4 border-t-2">

                  <div className="absolute border-2 border-[#eeeeee] h-full left-[7px]  z-10"></div>
                  <div className="bg-white absolute w-10 h-[35px]  z-20 -bottom-4" ></div>

                  <div className="flex gap-4 z-20 ">
                    <div className="w-4 h-4 mt-1 border-4  border-red-500 bg-[#f9e6e6] rounded-full"></div>
                    <div>
                      <p className="text-[13px]  ">
                        <span className="font-bold"> Alice Smith </span>
                        <span className="">uploaded</span>{" "}
                        <span className="text-blue-600"> wireframe-v1.png</span>{" "}
                        -{" "}
                      </p>
                      <span className="text-[11px] text-[#94A3B8]">
                        2 hours ago
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4  z-20">
                    <div className="w-4 h-4 mt-1 border-4  border-red-500 bg-[#f9e6e6] rounded-full"></div>
                    <div>
                      <p className="text-[13px]  ">
                        <span className="font-bold"> Alice Smith </span>
                        <span className="">uploaded</span>{" "}
                        <span className="text-blue-600"> wireframe-v1.png</span>{" "}
                        -{" "}
                      </p>
                      <span className="text-[11px] text-[#94A3B8]">
                        2 hours ago
                      </span>
                    </div>
                  </div>

                  

                </div>
              </div>
            </div>

            <div className="  w-full lg:w-1/3  flex flex-col gap-3">
              <div className=" shadow-md border-2 rounded-xl bg-white">
                <div className="p-4 border-b">
                  <h1 className="text-[14px] font-semibold">Task Details</h1>
                </div>

                <div className="p-4 flex flex-col gap-4">
                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      STATUS
                    </h1>
                    <div className="flex items-center   mt-2">
                      <div
                        className="flex items-center w-32 gap-2 cursor-pointer"
                        onClick={() => setTaskStatus("ToDo")}
                      >
                        <div className="w-3 h-3 bg-[#7a7a7a] rounded-full"></div>
                        <p className="text-[12px] font-semibold">ToDo</p>
                        {TaskStatus === "ToDo" && <div>✅</div>}
                      </div>
                      <div
                        className="flex items-center w-32 gap-2 cursor-pointer"
                        onClick={() => setTaskStatus("In Progress")}
                      >
                        <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
                        <p className="text-[12px] font-semibold">In Progress</p>
                        {TaskStatus === "In Progress" && <div>✅</div>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      Priority
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
                      <p className="text-[12px] font-semibold">High</p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      ASSIGNEE
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 bg-[#64748B] rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">
                          JD
                        </span>
                      </div>
                      <p className="text-[12px] font-semibold">John Doe</p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      DUE DATE
                    </h1>
                    <div className=" rounded-md p-2 mt-2 text-[12px] font-semibold flex  gap-1 items-center justify-between bg-[#fae5e5] text-[#EF4444]">
                      <p className=" font-semibold">🗓️ Mar 15, 2023</p>
                      <p>Overdue</p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      PROJECT
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-3 h-3 bg-[#0261fb] rounded-full flex items-center justify-center"></div>
                      <p className="text-[12px] text-[#0261fb] font-semibold">
                        Product Development
                      </p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      CREATED BY
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 bg-[#64748B] rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">
                          AS
                        </span>
                      </div>
                      <p className="text-[12px] font-semibold">Alice Smith</p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      CREATED AT
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-[12px] font-semibold">
                        🗓️ Mar 10, 2023
                      </p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                      UPDATED AT
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-[12px] font-semibold">
                        🗓️ Mar 20, 2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" shadow-md bg-white border-2 rounded-xl">
                <div>
                  <h1 className=" p-4 text-[14px] font-semibold border-b">
                    Quick Action
                  </h1>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="shadow-md  hover:border-blue-500  border-2 px-4 py-2 font-semibold text-[12px] rounded-md cursor-pointer">
                    ✅ Mark as Done
                  </div>
                  <div className="shadow-md border-2 hover:border-blue-500 px-4 py-2 font-semibold text-[12px] rounded-md cursor-pointer">
                    ✉️ Send Reminder
                  </div>
                  <div className="shadow-md border-2 hover:border-blue-500 px-4 py-2 font-semibold text-[12px] rounded-md cursor-pointer">
                    🔗 Copy Link
                  </div>
                  <div className=" border-2 px-4 py-2 font-semibold text-[12px] rounded-md cursor-pointer text-[#EF4444] border-[#EF4444] bg-[#fef2f2]">
                    🗑️ Delete Task
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

export default TaskDetail;
