import React from "react";
import Sidebar from "../Sidebar";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  archiveProjectById,
  fetchProjectById,
} from "../../features/project/projectSlice";

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

  const { projectIdSlug } = useParams();
  const projectId = projectIdSlug.split("-")[0];
  const dispatch = useDispatch();
  const { selectedProject, loading } = useSelector((state) => state.projects);

  const CurrentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchProjectById(projectId));
  }, [projectId]);

  //  useEffect(() => {
  //     const HandleClickOutside = () => {
  //       setshowoptions(false);
  //     };

  //     document.addEventListener("click", HandleClickOutside);
  //     return () => document.removeEventListener("click", HandleClickOutside);
  //   }, []);

  // console.log(users);

  const HandleCheck = (e) => {
    console.log(e.target.checked);

    setIsChecked(e.target.checked);

    if (!IsChecked) {
      setTaskStatus("Done");
    } else {
      setTaskStatus("ToDo");
    }
  };

  const formFullDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysLeft = (endDate) => {
    const today = new Date();
    const due = new Date(endDate);

    const diff = due - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const HandleArchive = async (id) => {
    try {
      await dispatch(archiveProjectById(id)).unwrap();
      if (selectedProject.status == "Active") {
        await Swal.fire({
          position: "top",
          title: "Archived!",
          text: "Project is Archived",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        await Swal.fire({
          position: "top",
          title: "Unarchived!",
          text: "Project is Unarchived",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }

      navigate("/projects");
    } catch (err) {
      alert(err);
    }
  };
  const getProjectStatus = (project) => {
    if (!project) return "";
    if (project.status === "Archived") return "Archived";
    const today = new Date();
    const endDate = new Date(project.endDate);
    if (today > endDate) return "Overdue";
    return "Active";
  };

  return (
    <div className="flex ">
      <Sidebar />

      <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
        <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center px-4">
          <div className=" p-3 mx-0 sm:mx-4  ">
            <p className="text-[7px] sm:text-[11px] font-semibold text-[#64748B]">
              <span className="text-[#94A3B8]">Projects &gt;</span>{" "}
              {selectedProject?.name}
            </p>
            <h1 className="font-bold mt-[-3px] text-[#0F172A] text-[12px]">
              {selectedProject?.name}
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
            {(CurrentUser.role == "Admin" ||
              CurrentUser.role === "Manager") && (
              <button
                type="button"
                onClick={() => HandleArchive(selectedProject.id)}
                className="border sm:h-8 h-6 text-[8px] sm:text-[11px] font-bold rounded-md px-1 sm:px-3 whitespace-nowrap"
              >
                📦{" "}
                {selectedProject?.status == "Active" ? "Archive" : "Unarchive"}
              </button>
            )}
            {(CurrentUser.role == "Admin" ||
              CurrentUser.role === "Manager") && (
              <button
                onClick={() =>
                  navigate("/Tasks/CreateTask", {
                    state: {
                      projectId: selectedProject.id,
                    },
                  })
                }
                className={`border sm:h-8 h-6 text-[8px] sm:text-[11px]  font-bold rounded-md px-2 sm:px-3 ${selectedProject?.colorTheme ? `bg-[${selectedProject.colorTheme}] text-white` : "text-black"} whitespace-nowrap`}
              >
                + Add Task
              </button>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------- */}

        {loading && (
          <div className="animate-pulse p-4">
            <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
            <div className="h-6 w-80 bg-gray-200 rounded mb-3"></div>

            <div className="h-32 w-full bg-gray-200 rounded"></div>
          </div>
        )}
        {!loading && selectedProject && (
          <>
            <div className="p-4 ">
              <div
                className="flex  h-44 rounded-md  "
                style={{
                  background: `linear-gradient(to right,#1E1B4B,${selectedProject.colorTheme})`,
                }}
              >
                <div className="p-4 w-2/3 flex relative  flex-col justify-between">
                  <div className="absolute w-36 h-32   md:w-44 md:h-44 bg-[#ffffff0f] rounded-full -top-16 -right-0 md:-top-20 md:-right-0"></div>
                  <div className="absolute w-36 h-32   md:w-44 md:h-44 bg-[#ffffff0f] rounded-full top-24 right-40 md:top-20 md:right-80"></div>

                  <div className=" text-white">
                    <div className="flex  items-center">
                      <div className=" p-[6px] text-2xl">
                        {selectedProject.icon}
                      </div>
                      <div className="p-1">
                        <h1 className="font-bold md:text-xl">
                          {selectedProject.name}
                        </h1>
                        <p className="text-[#FFFFFF99] text-[8px] md:text-[12px]">
                          Created By {selectedProject.createdBy} &middot;{" "}
                          <span>
                            {formFullDate(
                              new Date(
                                selectedProject.createdAt,
                              ).toLocaleDateString(),
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className=" h-auto text-[8px] md:text-[12px] text-[#FFFFFF99]">
                    {selectedProject.description}
                  </p>
                  <div className=" h-auto text-[#ffffff99] flex gap-4 text-[7px] md:text-[11px]">
                    <p>
                      <span className="text-white">📆 </span>
                      {formFullDate(
                        new Date(
                          selectedProject.startDate,
                        ).toLocaleDateString(),
                      )}{" "}
                      -{" "}
                      {formFullDate(
                        new Date(selectedProject.endDate).toLocaleDateString(),
                      )}
                    </p>
                    <p>
                      <span className="text-white">👥</span>{" "}
                      {selectedProject.members.length} Members
                    </p>
                    <p>
                      <span className="text-white">✅</span> 18 Tasks
                    </p>
                  </div>
                </div>
                <div className=" w-1/3 p-4 relative overflow-hidden flex flex-col justify-center md:items-end">
                  <div className="flex  flex-col text-white  items-center ">
                    <h1 className="  md:text-5xl font-extrabold">72%</h1>
                    <p className="text-[11px] text-[#ffffffb3]">Completed</p>
                    <div className="w-24 md:w-40 h-2 mt-2 bg-[#FFFFFF26] rounded-lg">
                      <div className="h-[7px] bg-[#c1d3d5] w-[60%] rounded-lg "></div>
                    </div>
                  </div>
                  <div className="absolute w-36 h-32   md:w-44 md:h-44 bg-[#ffffff23] rounded-full top-0 -right-10 md:-top-10 md:-right-10"></div>
                  <div className="absolute w-24 h-24 md:w-32 md:h-32 bg-[#ffffff13] rounded-full top-24 right-6 md:top-20 md:right-14"></div>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------- */}

            <div className="px-4">
              <div className="grid grid-flow-col gap-2 text-nowrap">
                <div className="text-center border-2 px-2 py-1  md:px-4 md:py-2 rounded-md bg-white">
                  <h1 className="text-[18px] md:text-[22px] font-bold">18</h1>
                  <p className="text-[10px] md:text-[12px] text-[#64748B]">
                    Total Tasks
                  </p>
                </div>
                <div className="text-center border-2 px-2 py-1  md:px-4 md:py-2 rounded-md bg-white">
                  <h1 className="text-[18px] md:text-[22px] font-bold  text-[#10B981]">
                    13
                  </h1>
                  <p className="text-[10px] md:text-[12px] text-[#64748B]">
                    Completed
                  </p>
                </div>
                <div className="text-center border-2 px-2 py-1  md:px-4 md:py-2 rounded-md bg-white">
                  <h1 className="text-[18px] md:text-[22px] font-bold  text-[#3B82F6]">
                    2
                  </h1>
                  <p className="text-[10px] md:text-[12px] text-[#64748B]">
                    In Progress
                  </p>
                </div>
                <div className="text-center border-2 px-2 py-1  md:px-4 md:py-2 rounded-md bg-white">
                  <h1 className="text-[18px] md:text-[22px] font-bold  text-[#F59E0B]">
                    3
                  </h1>
                  <p className="text-[10px] md:text-[12px] text-[#64748B]">
                    To Do
                  </p>
                </div>
                <div className="text-center border-2 px-2 py-1  md:px-4 md:py-2 rounded-md bg-white">
                  <h1 className="text-[18px] md:text-[22px] font-bold text-[#EF4444]">
                    3
                  </h1>
                  <p className="text-[10px] md:text-[12px] text-[#64748B]">
                    Overdue
                  </p>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}

            <div className="p-4 flex flex-col lg:flex-row gap-2 ">
              <div className="border-2 rounded-md bg-white   lg:w-9/12">
                <div>
                  <div className="px-4  py-2 text-[14px] font-bold ">
                    <h1>Tasks</h1>
                    <p className="text-[10px] font-semibold text-[#64748B]">
                      18 total in this Project
                    </p>
                  </div>
                  <div className=" bg-white  w-full  overflow-x-scroll  overflow-y-scroll lg:h-auto lg:max-h-screen h-auto max-h-80 rounded-b-md ">
                    <table className=" tabel w-full text-left  text-nowrap">
                      <thead>
                        <tr className="border  h-8 bg-[#F1F5F9]  text-[10px] text-[#94A3B8]">
                          <th className=""></th>
                          <th className="">TASK</th>
                          <th className="">ASSIGNEE</th>
                          <th className="">PRIORITY</th>
                          <th className="">STATUS</th>
                          <th className="">DUE DATE</th>
                          <th className=""></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 md:px-6 items-center">
                            <div className="inline-flex items-center">
                              <label className="flex items-center cursor-pointer relative">
                                <input
                                  type="checkbox"
                                  checked={IsChecked}
                                  onChange={(e) => {
                                    HandleCheck(e);
                                  }}
                                  className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
                                />
                                <span className="absolute  text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              </label>
                            </div>
                          </td>
                          <td className="pr-4">
                            <div className="py-2">
                              <h1
                                className={`text-[10px] md:text-[14px] ${TaskStatus === "Done" ? "line-through text-[#94A3B8]" : ""} font-bold`}
                              >
                                Design checkout UI wireframes
                              </h1>
                              <p className="text-[#94A3B8] text-[8px] md:text-[12px]">
                                Devops setup and configuration
                              </p>
                            </div>
                          </td>
                          <td className="pr-4">
                            <div className="flex gap-2 items-center">
                              <div
                                className={`border w-4 h-4 md:w-6 md:h-6 text-[8px] md:text-[10px] rounded-full items-center flex justify-center ${colors[0]} text-white font-semibold text-center`}
                              >
                                AK
                              </div>
                              <p className="text-[10px] md:text-[13px] text-[#64748B] font-semibold">
                                Alex Kumar
                              </p>
                            </div>
                          </td>
                          <td className="pr-4  text-[10px] md:text-[12px] font-semibold ">
                            <div className="flex">
                              <h1
                                className={`rounded-full py-1 px-3  ${priority === "low" ? "text-[#10B981] bg-[#F0FDF4]" : priority === "medium" ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"} `}
                              >
                                Medium
                              </h1>
                            </div>
                          </td>
                          <td className="pr-4  text-[10px] md:text-[12px] font-semibold ">
                            <div className="flex">
                              <h1
                                className={`rounded-full py-1 px-3 ${TaskStatus === "Done" ? "text-[#10B981] bg-[#F0FDF4]" : TaskStatus === "ToDo" ? "text-[#64748B] bg-[#F1F5F9]" : "text-[#EF4444] bg-[#FEF2F2]"}`}
                              >
                                Done
                              </h1>
                            </div>
                          </td>
                          <td className="pr-4">
                            <p className="pr-2 text-[10px] md:text-[12px] font-semibold text-[#94A3B8]">
                              Mar 10
                            </p>
                          </td>
                          {(CurrentUser.role == "Admin" ||
                            CurrentUser.role === "Manager") && (
                            <td className="pr-4 relative">
                              {" "}
                              <div
                                onClick={() => {
                                  setshowoptions(!showoptions);
                                }}
                                className="flex z-30 cursor-pointer items-center"
                              >
                                &middot;&middot;&middot;{" "}
                                <div
                                  className={`absolute  bg-white w-20  overflow-hidden -top-4 right-12 border rounded-md transition-all duration-200 ${showoptions ? "" : "hidden"}`}
                                >
                                  <div className="text-center cursor-pointer hover:bg-[#f5f5f5]  py-1 border-b text-[13px] font-semibold">
                                    Edit
                                  </div>
                                  <div className="text-center cursor-pointer hover:bg-[#f5f5f5] py-1 text-[13px] font-semibold text-red-600">
                                    Delete
                                  </div>
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="rounded-md  lg:w-3/12 lg:flex-col flex flex-col gap-2 w-full">
                <div
                  className="flex lg:flex-col gap-2
                "
                >
                  <div className="border-2 h-auto bg-white rounded-md w-full  lg:w-full ">
                    <div className="flex items-center border-b justify-between px-2 py-1  md:px-4 md:py-2">
                      <h1 className="text-[14px] font-bold">Team Members</h1>
                    </div>
                    <div className="px-2 max-h-[250px] overflow-x-scroll">
                      <div className="border-b flex items-center justify-between gap-2 py-2">
                        <div className="flex gap-2">
                          <div
                            className={`border text-white ${colors[0]} flex justify-center p-3 items-center w-8 h-8 rounded-full text-[12px] font-bold`}
                          >
                            {selectedProject.members[0].firstName
                              .charAt(0)
                              .toUpperCase()}
                            {selectedProject.members[0].lastName
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <div>
                            <h1 className="text-[12px] font-bold">
                              {selectedProject.members[0].firstName}{" "}
                              {selectedProject.members[0].lastName}
                            </h1>
                            <p className="text-[10px] text-[#94A3B8] font-bold">
                              Admin - Project Lead
                            </p>
                          </div>
                        </div>
                        <div>
                          <h1 className="text-[10px] rounded-full  px-2 py-1 font-bold bg-[#F5F3FF] text-[#7C3AED]">
                            {selectedProject.members[0].role}
                          </h1>
                        </div>
                      </div>
                      {selectedProject.members.slice(1).map((m, index) => {
                        return (
                          <div
                            key={m.userId}
                            className="border-b flex items-center justify-between gap-2 py-2"
                          >
                            <div className="flex gap-2">
                              <div
                                className={`border text-white ${colors[index + (1 % colors.length)]} flex justify-center p-3 items-center w-8 h-8 rounded-full text-[12px] font-bold`}
                              >
                                {m.firstName.charAt(0).toUpperCase()}
                                {m.lastName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h1 className="text-[12px] font-bold">
                                  {m.firstName} {m.lastName}
                                </h1>
                                <p className="text-[10px] text-[#94A3B8] font-bold">
                                  5 task Assigned
                                </p>
                              </div>
                            </div>
                            <div>
                              <h1
                                className={`text-[10px] rounded-full  px-2 py-1 font-bold ${m.role == "Admin" || m.role == "Manager" ? "bg-[#F5F3FF] text-[#7C3AED]" : "bg-[#F0FDF4] text-[#10B981]"}`}
                              >
                                {m.role}
                              </h1>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-2 rounded-md bg-white h-auto w-1/2  lg:w-full">
                    <div className="flex items-center border-b justify-between px-2 py-1  md:px-4 md:py-2">
                      <h1 className="text-[14px] font-bold">Project Info</h1>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <div>
                        <h1 className="text-[#94A3B8] text-[10px] font-bold tracking-widest">
                          START DATE
                        </h1>
                        <p className="text-[13px] font-bold">
                          {formFullDate(
                            new Date(
                              selectedProject.startDate,
                            ).toLocaleDateString(),
                          )}
                        </p>
                      </div>
                      <div>
                        <h1 className="text-[#94A3B8] text-[10px] font-bold tracking-widest">
                          END DATE
                        </h1>
                        <p className="text-[13px] font-bold">
                          {formFullDate(
                            new Date(
                              selectedProject.endDate,
                            ).toLocaleDateString(),
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-[#94A3B8] text-[10px] font-bold tracking-widest">
                          STATUS
                        </h1>
                        <div className="flex">
                          <p
                            className={`text-[13px] ${getProjectStatus(selectedProject) == "Active" ? "text-[#10B981] bg-[#ECFDF5]" : getProjectStatus(selectedProject) == "Archived" ? " text-[#64748B] bg-[#F1F5F9]" : " text-[#f50000] bg-[#ffefef]"} px-2 py-1 rounded-full mt-1 font-bold`}
                          >
                            {getProjectStatus(selectedProject)}
                          </p>
                        </div>
                      </div>
                      {getProjectStatus(selectedProject) == "Active" && (
                        <div>
                          <h1 className="text-[#94A3B8] text-[10px] font-bold tracking-widest">
                            DAYS REMAINING
                          </h1>

                          <p className="text-[13px] text-[#F59E0B] font-bold">
                            {getDaysLeft(selectedProject.endDate)} days left
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div className="border-2 rounded-md bg-white h-auto w-full  lg:w-full">
                    <div className="flex items-center border-b justify-between px-2 py-1  md:px-4 md:py-2">
                      <h1 className="text-[14px] font-bold">Activity</h1>
                      <p className="text-[12px] hover:underline cursor-pointer font-semibold text-[#4F46E5]">
                        View All
                      </p>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <div className="border-b pb-2 flex gap-2">
                        <div className="text-[14px] flex w-8 h-8 justify-center items-center rounded-full bg-[#ECFDF5]">
                          ✔️
                        </div>
                        <div>
                          <h1 className="text-[13px] font-bold">
                            Sarah{" "}
                            <span className="font-normal font-semibold text-[#7d8a9c]">
                              Completed CI/CD Task
                            </span>
                          </h1>
                          <p className="text-[#94A3B8] text-[10px] font-bold tracking-widest">
                            2 min ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
