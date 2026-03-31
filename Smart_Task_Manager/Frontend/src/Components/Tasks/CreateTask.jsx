import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";



function CreateTask() {
  const navigate = useNavigate();


  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
          <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center px-4">
            <div className=" p-3 mx-0 sm:mx-4  ">
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

          <div className="p-4 gap-4  flex">
            <div className="flex flex-col gap-3 rounded-md w-2/3 h-80">
              <div className="bg-white flex flex-col gap-2 p-4 w-full rounded-md border-2">
                <label htmlFor="" className="text-[13px] font-bold">
                  Task Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="border font-semibold  focus:border-blue-600 focus:outline-none text-[12px] p-2 rounded-md"
                  placeholder="Enter a clear, descriptive title for this task..."
                />
              </div>

              <div className="bg-white w-full p-4 border-2 rounded-md">
                <div className="flex gap-2 mb-2">
                  <button onClick={()=> editor.chain().focus().toggleBold().run()}>B</button>
                </div>
                <EditorContent editor={editor}/>
              </div>
              <div className="bg-white w-full p-4 border-2 rounded-md"></div>
            </div>
            <div className="  flex flex-col gap-3 rounded-md w-1/3 h-80">
              <div className="bg-white w-full p-4 border-2 rounded-md"></div>
              <div className="bg-white w-full p-4 border-2 rounded-md"></div>
              <div className="bg-white w-full p-4 border-2 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
