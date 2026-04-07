import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../features/project/projectSlice";
import { createTask } from "../../Services/TaskService";
import Swal from "sweetalert2";
import Tiptap from "./TextEditor";
import FileUplode from "./FileUplode";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

function CreateTask() {
  const navigate = useNavigate();
  const [Files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [DescriptionError, setDescriptionError] = useState("");

  const location = useLocation();

  const [TaskFormData, setTaskFormData] = useState({
    Title: "",
    Descriprion: "",
    ProjectId: location.state?.projectId || "",
    AssignedTo: "",
    Priority: 0,
    Status: "",
    DueDate: "",
  });
  const selectedProject = projects.find(
    (p) => p.id === Number(TaskFormData.ProjectId),
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    // watch,
  } = useForm();

  const HandleDescriptionChange = (value) => {
    setTaskFormData((prev) => ({
      ...prev,
      Descriprion: typeof value === "string" ? value : value.html,
    }));
  };

  console.log(TaskFormData);
  const getTextFromHtml = (Html) => {
    const div = document.createElement("div");
    div.innerHTML = Html;
    return div.textContent || div.innerText || "";
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
      ...(name === "ProjectId" && { AssignTo: "" }),
    }));
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  // console.log(selectedProject);

  const onSubmit = async (data) => {
    const text = getTextFromHtml(TaskFormData.Descriprion);

    if (!text.trim()) {
      setDescriptionError("Description is Required");
      return;
    }
    setDescriptionError("");

    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Description", TaskFormData.Descriprion);
    formData.append("ProjectId", data.ProjectId);
    formData.append("AssignedToUserId", data.AssignedTo);
    formData.append("Priority", TaskFormData.Priority);
    formData.append("DueDate", data.DueDate);

    Files.forEach((file) => {
      formData.append("Files", file);
    });
              
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try{
      const res = await createTask(formData);
            await Swal.fire({
              position: "top-end",
              title: "Created!",
              text: "Task is Created",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
      console.log(res);
      navigate("/projects");
    } catch (error) {
      console.error("Error creating task:", error);

    }


  };

  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
          <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center px-4">
              <div className=" p-3 mx-0 sm:mx-4 ">
                <p className="text-[7px] sm:text-[11px] font-semibold text-[#64748B]">
                  <span className="text-[#94A3B8]">Projects &gt;</span>{" "}
                  <span className="text-[#94A3B8]">
                    {selectedProject?.name && (
                      <>{selectedProject?.name} &gt;</>
                    )}{" "}
                  </span>{" "}
                  Create Task
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
                <button
                  className={`border sm:h-8 h-6 text-[8px] sm:text-[11px]  font-bold  ${selectedProject?.colorTheme ? `bg-[${selectedProject.colorTheme}] text-white` : "text-black"} rounded-md px-2 sm:px-3  whitespace-nowrap`}
                >
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
                    {...register("Title", {
                      required: "Title is required",
                    })}
                    name="Title"
                    onChange={HandleChange}
                    className="border font-semibold  focus:border-blue-600 focus:outline-none text-[12px] p-2 rounded-md"
                    placeholder="Enter a clear, descriptive title for this task..."
                  />
                  {errors.Title && (
                    <p className="text-red-500 text-sm">
                      {errors.Title.message}
                    </p>
                  )}
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

                  {DescriptionError && (
                    // <p>hello</p>
                    <p className="text-red-500 text-sm">{DescriptionError}</p>
                  )}
                </div>

                <div className="bg-white w-full p-4 border-2 rounded-md">
                  <div className="flex justify-between border-b pb-2">
                    <h1 className="text-[13px] font-bold">Attachment</h1>
                    <p className="text-[12px] text-[#64748B] font-semibold">
                      Optional - uplode relevant files
                    </p>
                  </div>
                  <div>
                    <FileUplode files={Files} setfiles={setFiles} />
                  </div>
                </div>
              </div>

              <div className="  flex flex-col gap-3 rounded-md lg:w-1/3 w-full h-auto">
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
                    <select
                      name="ProjectId"
                      {...register("ProjectId", {
                        required: "Project is required",
                      })}
                      value={TaskFormData.ProjectId || ""}
                      onChange={HandleChange}
                      className="rounded-md border p-1 px-4 text-[13px] focus:outline focus:outline-[#1313bbcc] appearance-none  "
                    >
                      <option value="" disabled hidden>
                        Select Project
                      </option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select> 
                    {errors.ProjectId && (
                      <p className="text-red-500 text-sm">
                        {errors.ProjectId.message}
                      </p>
                    )}
                  </div>
                  <div className="h-auto flex flex-col gap-2  ">
                    <label
                      htmlFor=""
                      className="text-[#64748B] text-[13px] font-bold "
                    >
                      Assign To <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="AssignedTo"
                      {...register("AssignedTo", {
                        required: "Project is required",
                      })}
                      value={TaskFormData.AssignedTo || ""}
                      onChange={HandleChange}
                      className="rounded-md border p-1 px-4 text-[13px] focus:outline focus:outline-[#1313bbcc] appearance-none  "
                    >
                      <option value="" disabled hidden>
                        Select Member
                      </option>
                      {selectedProject?.members?.slice(1).map((m) => (
                        <option key={m.userId} value={m.userId}>
                          {m.firstName} {m.lastName}
                        </option>
                      ))}
                    </select>
                    {errors.AssignedTo && (
                      <p className="text-red-500 text-sm">
                        {errors.AssignedTo.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[#64748B] text-[13px] font-bold ">
                      Priority <span className="text-red-600">*</span>
                    </p>
                    <div className="flex gap-2">
                      <div
                        className={` ${TaskFormData.Priority == 0 ? " border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#ECFDF5] border-[#A7F3D0] text-[#10B981] "}  border w-1/3 flex flex-col items-center justify-center h-16 cursor-pointer rounded-lg`}
                        onClick={() => SelectPriority(0)}
                      >
                        <div className="">🟢</div>
                        <h1 className=" text-[11px] font-bold">Low</h1>
                      </div>
                      <div
                        className={`${TaskFormData.Priority == 1 ? " border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#fdfdec] border-[#f3f2a7] text-[#b9b910]"}   border w-1/3 flex flex-col items-center justify-center h-16 cursor-pointer rounded-lg`}
                        onClick={() => SelectPriority(1)}
                      >
                        <div className="">🟡</div>
                        <h1 className=" text-[11px] font-bold">Medium</h1>
                      </div>
                      <div
                        className={` ${TaskFormData.Priority == 2 ? " border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]" : "bg-[#FEF2F2] border-[#FECACA] text-[#EF4444]"}   border w-1/3 flex flex-col items-center justify-center h-16 cursor-pointer rounded-lg`}
                        onClick={() => SelectPriority(2)}
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
                        {...register("DueDate", {
                        required: "Due Date is required",
                        onChange: (e) => {
                          const End = selectedProject.endDate;
                          const Due = e.target.value;
                          if (End && Due && Due > End) {
                            setError("DueDate", {
                              type: "manual",
                              message:
                                "Due Date cannot be Larger than Project End Date",
                            })
                          }
                          else{
                              clearErrors("DueDate");
                            } ;
                          HandleChange(e);
                        },
                      })}
                        name="DueDate"
                        className="border text-[14px] focus:outline-none focus:border-blue-600 px-4 py-1 rounded-md"
                      />
                      {errors.DueDate && (
                        <p className="text-red-500 text-sm">
                          {errors.DueDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className=" w-full flex flex-col gap-4 p-4 border-dashed border-2 border-[#C7D2FE] bg-[#EEF2FF] rounded-md"
                  style={{
                    backgroundColor: `${selectedProject?.colorTheme}33`,
                    borderColor: `${selectedProject?.colorTheme}`,
                  }}
                >
                  <h1
                    className={`text-[12px] text-[${selectedProject?.colorTheme}] font-bold tracking-wider`}
                  >
                    TASK PREVIEW
                  </h1>
                  <h1 className="text-[13px] font-bold">
                    {TaskFormData.Title || "New Task (Untitled)"}
                  </h1>
                  <div className="flex gap-2 text-[12px]">
                    
                    <div
                      className={` font-semibold ${TaskFormData.Priority == 0 ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#10B981] " : TaskFormData.Priority == 2 ? "bg-[#FEF2F2] border-[#FECACA] text-[#EF4444]" : "bg-[#FFFBEB] text-[#F59E0B]"}  px-2 rounded-full`}
                    >
                      {TaskFormData.Priority == 0
                        ? "Low"
                        : TaskFormData.Priority == 2
                          ? "High"
                          : "Medium"}
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
                  <p className="text-[12px] text-[#5f6978]">
                    <span className="text-white">🗓️</span> Due: Mar 25, 2025
                  </p>
                </div>
                <div className="bg-[#FFFBEB] border-[#FDE68A] w-full p-4 border-2  rounded-md">
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

/* Container */
