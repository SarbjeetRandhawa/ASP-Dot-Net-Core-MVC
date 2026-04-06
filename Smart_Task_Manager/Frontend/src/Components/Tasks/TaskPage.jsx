import React, { use, useEffect } from "react";
import { useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../features/Task/TaskSlice";
import { Key } from "lucide-react";

function TaskPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, loading, totalCount } = useSelector((state) => state.tasks);
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  //  const [Filters, setFilters] = useState({
  //   priority: "",
  //   Status: 0
  //  });
  const PageSize = 1;
  const [FilterBar, setFilterBar] = useState("All");
  const [priority, setPriority] = useState("medium");
  const [TaskStatus, setTaskStatus] = useState("");
  const colors = [
    "bg-[linear-gradient(to_bottom_right,#534545,#ff0000)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#00ff22)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#9d00ff)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#eeff00)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#ff00e6)]",
    "bg-[linear-gradient(to_bottom_right,#363434,#00ffff)]",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let status;

    if (FilterBar === "ToDo") status = 0;
    else if (FilterBar === "Done") status = 1;
    else if (FilterBar === "inProgress") status = 2;

    dispatch(fetchTasks({ page, status, search }));
  }, [debouncedSearch, page, FilterBar, dispatch]);

  // const HandleFilterChange = (Key, value) => {
  //   setPage(1);
  //   setFilters((prev) => ({
  //     ...prev,
  //     [Key]: value
  //   }));
  // }

  const totalPages = Math.ceil(totalCount / PageSize);

  const HandleClearFilter = () => {
    setFilterBar("All");
  };
  console.log(tasks);

  const StatusMap = {
    0: "ToDo",
    1: "Done",
    2: "In Progress",
  };
  const PriorityMap = {
    0: "low",
    1: "medium",
    2: "high",
  };

  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%]   md:pt-0 md:pl-[33%] pt-14">
          <div className="Navbar border bg-white justify-between  flex gap-1 sm:gap-2 h-12 w-full  items-center px-8">
            <div className="  ">
              <h1 className="font-bold  text-[#0F172A]  text-[17px]">
                All Tasks
              </h1>
            </div>
            <div className="flex gap-2 relative">
              <div className="absolute w-0 left-1 top-1">🔍</div>
              <input
                type="text"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="h-7 border pl-8 text-[11px] font-bold rounded-md focus:outline-2 outline-[#4F46E5]"
                placeholder="Search Tasks..."
              />

              {/* {(CurrentUser.role === "Admin" ||
              CurrentUser.role === "Manager") && ( */}
              <button
                type="button"
                onClick={() => navigate("/Tasks/CreateTask")}
                className="border px-3 h-7 rounded-md text-[11px] font-bold bg-[#4F46E5] text-white"
              >
                + New Task
              </button>
              {/* )} */}
            </div>
          </div>

          {/* ------------------------------------------------------- */}

          <div className="m-5 bg-white border-2 flex p-3 h-auto rounded-md justify-between items-center">
            <div className="flex items-center gap-4 text-[#64748B]">
              <p className="text-[13px] ml-2 font-semibold ">Filter by:</p>
              <div className=" px-2 py-1 text-[12px] font-semibold cursor-pointer rounded-md border">
                All
              </div>
              <div className=" px-2 py-1 text-[12px] font-semibold cursor-pointer rounded-md border">
                ToDo
              </div>
              <div className=" px-2 py-1 text-[12px] font-semibold cursor-pointer rounded-md border">
                Done
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-2 cursor-pointer py-1 text-[12px] font-semibold border rounded-md border-red-600 text-red-600">
                🔴Overdue (7)
              </div>
              <div
                onClick={HandleClearFilter}
                className="px-2 cursor-pointer py-1 text-[12px] font-semibold border-2 rounded-md  text-[#64748B]"
              >
                Clear Filters
              </div>
            </div>
          </div>

          <div className="mx-5 my-3 flex  rounded-md">
            <h1
              className={` px-5 py-1 cursor-pointer text-[13px] font-semibold  ${FilterBar === "All" ? "border-blue-600 text-[#4F46E5] border-b-2 " : "text-[#94A3B8] border-gray-300"} `}
              onClick={() => setFilterBar("All")}
            >
              All Tasks (84)
            </h1>
            <h1
              className={`px-5 py-1 font-semibold cursor-pointer text-[13px] ${FilterBar === "MyTask" ? "border-blue-600 text-[#4F46E5] border-b-2 " : "text-[#94A3B8] border-gray-300"}`}
              onClick={() => setFilterBar("MyTask")}
            >
              My Tasks (4)
            </h1>
            <h1
              className={`px-5 py-1 font-semibold cursor-pointer text-[13px] ${FilterBar === "ToDo" ? "border-blue-600 text-[#4F46E5] border-b-2 " : "text-[#94A3B8] border-gray-300"}`}
              onClick={() => setFilterBar("ToDo")}
            >
              ToDo (12)
            </h1>
            <h1
              className={`px-5 py-1 font-semibold cursor-pointer text-[13px] ${FilterBar === "inProgress" ? "border-blue-600 text-[#4F46E5] border-b-2 " : "text-[#94A3B8] border-gray-300"}`}
              onClick={() => setFilterBar("inProgress")}
            >
              In Progress (8)
            </h1>
            <h1
              className={`px-5  py-1 font-semibold cursor-pointer text-[13px] ${FilterBar === "Done" ? "border-blue-600 text-[#4F46E5] border-b-2 " : "text-[#94A3B8] border-gray-300"}`}
              onClick={() => setFilterBar("Done")}
            >
              Done (52)
            </h1>
            <h1
              className={`flex gap-1 px-5 py-1 font-semibold cursor-pointer text-[13px] text-red-600 ${FilterBar === "Overdue" ? "border-blue-600  border-b-2 " : "text-[#94A3B8] border-gray-300"}`}
              onClick={() => setFilterBar("Overdue")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
              Overdue (7)
            </h1>
          </div>

          <div className="px-4">
            {loading ? (
              <div className="flex flex-col gap-2 animate-pulse  p-4 h-64">
                <div className="bg-gray-200 rounded-md h-8 w-1/2"></div>
                <div className="bg-gray-200 rounded-md h-14 w-72"></div>
                <div className="bg-gray-200 rounded-md h-20 w-96"></div>
              </div>
            ) : (
              <div className="border-2 rounded-md bg-white  ">
                <div>
                  <div className=" bg-white  w-full  overflow-x-scroll  overflow-y-scroll lg:h-auto lg:max-h-screen h-auto max-h-80 rounded-b-md ">
                    <table className=" tabel w-full text-left  text-nowrap">
                      <thead>
                        <tr className="border  h-8 bg-[#F1F5F9]  text-[10px] text-[#94A3B8]">
                          <th className="pl-8 min-w-80">TASK</th>
                          <th className="">PROJECT</th>
                          <th className="">ASSIGNEE</th>
                          <th className="">PRIORITY</th>
                          <th className="">STATUS</th>
                          <th className="">DUE DATE</th>
                          <th className="">CREATED</th>
                          <th className=" pr-3">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task, index) => (
                          <tr key={task.id} className="">
                            <td className="pl-8 pr-4 py-1">
                              <div className="py-2">
                                <h1
                                  className={`cursor-pointer hover:underline text-[10px] md:text-[14px] ${task.status === 1 ? "line-through text-[#94A3B8]" : ""} font-bold`}
                                >
                                  {task.title}
                                </h1>
                                <p className="text-[#94A3B8] text-[8px] md:text-[12px]">
                                  {/* Devops setup and configuration */}
                                </p>
                              </div>
                            </td>
                            <td className="pr-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${colors[(index + 3) % colors.length]}`}
                                ></div>
                                <p className="text-[12px] font-semibold text-[#64748B]">
                                  {task.projectName}
                                </p>
                              </div>
                            </td>
                            <td className="pr-4">
                              <div className="flex gap-2 items-center">
                                <div
                                  className={` w-4 h-4 md:w-6 md:h-6 text-[8px] md:text-[10px]  items-center flex justify-center ${colors[index % colors.length]} text-white font-semibold rounded-full`}
                                >
                                  {task.assignedByName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </div>
                                <p className="text-[10px] md:text-[13px] text-[#64748B] font-semibold">
                                  {task.assignedToName}
                                </p>
                              </div>
                            </td>
                            <td className="pr-4  text-[10px] md:text-[12px] font-semibold ">
                              <div className="flex">
                                <h1
                                  className={`rounded-full py-1 px-3  ${task.priority === 0 ? "text-[#10B981] bg-[#F0FDF4]" : task.priority === 1 ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"} `}
                                >
                                  {PriorityMap[task.priority]}
                                </h1>
                              </div>
                            </td>
                            <td className="pr-4  text-[10px] md:text-[12px] font-semibold ">
                              <div className="flex">
                                <h1
                                  className={`rounded-full py-1 px-3 ${task.status === 1 ? "text-[#10B981] bg-[#F0FDF4]" : task.status === 0 ? "text-[#64748B] bg-[#F1F5F9]" : task.status === 2 ? "bg-[#EFF6FF] text-[#3B82F6]" : "text-[#EF4444] bg-[#FEF2F2]"} `}
                                >
                                  {StatusMap[task.status]}
                                </h1>
                              </div>
                            </td>
                            <td>
                              <div className="pr-4 flex items-center text-red-600">
                                <p
                                  className={`pr-2 text-[10px] md:text-[12px] font-semibold ${TaskStatus === "overdue" ? "text-red-600" : "text-[#94A3B8]"} `}
                                >
                                  {new Date(task.dueDate).toLocaleDateString(
                                    undefined,
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </p>

                                {TaskStatus === "overdue" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-exclamation-triangle-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                  </svg>
                                )}
                              </div>
                            </td>
                            <td>
                              <p
                                className={`pr-2 text-[10px] md:text-[12px] font-semibold ${TaskStatus === "overdue" ? "text-red-600" : "text-[#94A3B8]"} `}
                              >
                                {new Date(task.createdAt).toLocaleDateString(
                                  undefined,
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </p>
                            </td>

                            <td className="pr-4 relative">
                              {" "}
                              <div className="flex z-30 cursor-pointer items-center justify-center">
                                &middot;&middot;&middot;{" "}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            <div className="flex p-4  justify-between">
              <div>
                <p className="text-[13px] text-[#64748B] font-semibold">Showing {tasks.length} of {totalCount} Tasks</p>
              </div>
              <div className="flex gap-1">
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-2 py- bg-blue-500 text-white rounded-md hover:bg-blue-600 ${page === i + 1 ? "bg-blue-700" : ""}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
<div className="flex items-center gap-2 mt-4">

  {/* Prev */}
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, i) => {
    const pageNumber = i + 1;

    return (
      <button
        key={pageNumber}
        onClick={() => setPage(pageNumber)}
        className={`px-3 py-1 border rounded ${
          page === pageNumber ? "bg-blue-600 text-white" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  })}

  {/* Next */}
  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
export default TaskPage;
