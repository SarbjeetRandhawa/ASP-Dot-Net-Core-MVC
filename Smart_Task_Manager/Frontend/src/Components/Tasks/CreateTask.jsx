import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

import Tiptap from "./TextEditor";
import { Color } from "@tiptap/extension-text-style";
import FileUplode from "./FileUplode";

function CreateTask() {
  const navigate = useNavigate();
  const [Files, setFiles] = useState([])
  const [TaskFormData, setTaskFormData] = useState({
    Title: "",
    Descriprion: "",
    ProjectId: null,
    AssignTo: null,
    Priority: "",
    Status: "",
    DueDate: "",
  });
  const HandleDescriptionChange = (value) => {
    setTaskFormData((prev) => ({
      ...prev,
      Descriprion: value,
    }));
  };
  const SelectPriority = (Priority) => {
    setTaskFormData({
      ...TaskFormData,
      Priority: Priority,
    });
  };
  const HandleChange = (e) => {
    const { name, value } = e.target;

    setTaskFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(TaskFormData);
  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
          <form action="" method="post">
            <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center px-4">
              <div className=" p-3 mx-0 sm:mx-4 ">
                <p className="text-[7px] sm:text-[11px] font-semibold text-[#64748B]">
                  <span className="text-[#94A3B8]">Projects &gt;</span>{" "}
                  <span className="text-[#94A3B8]">Mobile APP &gt;</span> Create
                  Task
                </p>
                <h1 className="font-bold mt-[-1px] text-[#0F172A] text-[12px]">
                  Create New Task
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
                  Cancel
                </button>
                <button
                  type="button"
                  className="border sm:h-8 h-6 text-[8px] sm:text-[11px] font-bold rounded-md px-1 sm:px-3 whitespace-nowrap"
                >
                  💾 Save Draft
                </button>
                <button className="border sm:h-8 h-6 text-[8px] sm:text-[11px] text-white font-bold rounded-md px-2 sm:px-3 bg-[#4F46E5] whitespace-nowrap">
                  🚀 Create Task
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------------------------- */}

            <div className="p-4 gap-4  flex lg:flex-row flex-col h-auto">
              <div className="flex flex-col gap-3 rounded-md lg:w-2/3 w-full h-auto">
                <div className="bg-white flex flex-col gap-2 p-4 w-full rounded-md border-2">
                  <label htmlFor="" className="text-[13px] font-bold">
                    Task Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    onChange={HandleChange}
                    className="border font-semibold  focus:border-blue-600 focus:outline-none text-[12px] p-2 rounded-md"
                    placeholder="Enter a clear, descriptive title for this task..."
                  />
                </div>

                <div
                  className="  bg-white w-full flex flex-col gap-2 p-4 border-2 rounded-md"
                  style={{ Color: "#000000" }}
                >
                  <h1 className="text-[13px] font-bold ">Description</h1>
                  <Tiptap
                    content={TaskFormData.Descriprion}
                    onChange={HandleDescriptionChange}
                  />
                </div>

                <div className="bg-white w-full p-4 border-2 rounded-md">
                  <div className="flex justify-between border-b pb-2">
                    <h1 className="text-[13px] font-bold">Attachment</h1>
                    <p className="text-[12px] text-[#64748B] font-semibold">
                      Optional - uplode relevant files
                    </p>
                  </div>
                  <div className="py-4">
                    <FileUplode files={Files} setfiles={setFiles}/>
                  </div>
                </div>
              </div>

              <div className="  flex flex-col gap-3 rounded-md lg:w-1/3 w-full h-80">
                <div className="bg-white flex flex-col gap-4 w-full p-4 border-2 rounded-md">
                  <div className="flex justify-between border-b pb-2">
                    <h1 className="text-[13px] font-bold">Task Properties</h1>
                  </div>
                  <div className="h-auto flex flex-col gap-2  ">
                    <label
                      htmlFor=""
                      className="text-[#64748B] text-[13px] font-bold "
                    >
                      Project <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="border focus:outline-none focus:border-blue-600 px-4 py-1 rounded-md"
                    />
                  </div>
                  <div className="h-auto flex flex-col gap-2  ">
                    <label
                      htmlFor=""
                      className="text-[#64748B] text-[13px] font-bold "
                    >
                      Assign To <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="border focus:outline-none focus:border-blue-600 px-4 py-1 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#64748B] text-[13px] font-bold ">
                      Priority <span className="text-red-600">*</span>
                    </p>
                    <div className="flex gap-2">
                      <div
                        className={` ${TaskFormData.Priority == "Low" ? " border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#ECFDF5] border-[#A7F3D0] text-[#10B981] "}  border w-1/3 flex flex-col items-center justify-center h-16 cursor-pointer rounded-lg`}
                        onClick={() => SelectPriority("Low")}
                      >
                        <div className="">🟢</div>
                        <h1 className=" text-[11px] font-bold">Low</h1>
                      </div>
                      <div
                        className={`${TaskFormData.Priority == "Medium" ? " border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#fdfdec] border-[#f3f2a7] text-[#b9b910]"}   border w-1/3 flex flex-col items-center justify-center h-16 cursor-pointer rounded-lg`}
                        onClick={() => SelectPriority("Medium")}
                      >
                        <div className="">🟡</div>
                        <h1 className=" text-[11px] font-bold">Medium</h1>
                      </div>
                      <div
                        className={` ${TaskFormData.Priority == "High" ? " border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#FEF2F2] border-[#FECACA] text-[#EF4444]"}   border w-1/3 flex flex-col items-center justify-center h-16 cursor-pointer rounded-lg`}
                        onClick={() => SelectPriority("High")}
                      >
                        <div className="">🔴</div>
                        <h1 className=" text-[11px] font-bold">High</h1>
                      </div>
                    </div>

                    <div className="h-auto mt-2 flex flex-col gap-2  ">
                      <label
                        htmlFor=""
                        className="text-[#64748B] text-[13px] font-bold "
                      >
                        Due Date <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="Date"
                        name="DueDate"
                        onChange={HandleChange}
                        className="border text-[14px] focus:outline-none focus:border-blue-600 px-4 py-1 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className=" w-full flex flex-col gap-4 p-4 border-dashed border-2 border-[#C7D2FE] bg-[#EEF2FF] rounded-md">
                  <h1 className="text-[12px] text-[#4F46E5] font-bold tracking-wider">
                    TASK PREVIEW
                  </h1>
                  <h1 className="text-[13px] font-bold">
                    {TaskFormData.Title || "New Task (Untitled)"}
                  </h1>
                  <div className="flex gap-2 text-[12px]">
                    <div className="font-semibold px-2 bg-[#F1F5F9] text-[#64748B] rounded-full">
                      Todo
                    </div>
                    <div
                      className={` font-semibold ${TaskFormData.Priority == "Low" ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#10B981] " : TaskFormData.Priority == "High" ? "bg-[#FEF2F2] border-[#FECACA] text-[#EF4444]" : "bg-[#FFFBEB] text-[#F59E0B]"}  px-2 rounded-full`}
                    >
                      {TaskFormData.Priority || "Medium"}
                    </div>
                    <div>E-Commerce Rebuild</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="border flex text-[13px] p-1 rounded-full bg-[linear-gradient(to_bottom_left,#373535,#e30909)] text-white font-semibold items-center justify-center">
                      MR
                    </div>
                    <h1 className="text-[12px] text-[#64748B]">
                      Assigned to Mike Ross
                    </h1>
                  </div>
                  <p className="text-[12px] text-[#94A3B8]">
                    🗓️ Due: Mar 25, 2025
                  </p>
                </div>
                <div className="bg-[#FFFBEB] border-[#FDE68A] w-full p-4 border-2 rounded-md">
                  <h1 className=" text-[#92400E] text-[12px] font-bold">
                    💡 Pro Tips
                  </h1>
                  <ul className="ml-6 flex flex-col gap-1 text-[12px] font-semibold mt-3 text-[#92400E] ">
                    <li>Use clear, action-oriented titles</li>
                    <li>Break large tasks into subtasks</li>
                    <li>Set realistic due dates</li>
                    <li>Add detailed descriptions for complex tasks</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
