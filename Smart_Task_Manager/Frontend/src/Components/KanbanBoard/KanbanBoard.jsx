import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../features/Task/TaskSlice";
import { useNavigate } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";

function KanbanBoard() {
  const navigate = useNavigate();
  const [FilterBar, setFilterBar] = useState("All");
  const [page, setPage] = useState(1);
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [localTasks, setLocalTasks] = useState([]);

  const HandleTaskInfoNavigate = (e, task) => {
    e.stopPropagation();
    navigate(`/tasks/${task.id}-${task.taskCode}`);
  };

  useEffect(() => {
      setLocalTasks(tasks);
    
  }, [tasks]);

  const TodoTasks = localTasks.filter((t) => t.status === 0);
  const DoneTasks = localTasks.filter((t) => t.status === 1);
  const InProgressTasks = localTasks.filter((t) => t.status === 2);
  const OverdueTasks = localTasks.filter((t) => t.status === 3);
  const InReviewTasks = localTasks.filter((t) => t.status === 4);

  useEffect(() => {
    let status;
    const pageSize = 0;
    if (FilterBar === "ToDo") status = 0;
    else if (FilterBar === "Done") status = 1;
    else if (FilterBar === "inProgress") status = 2;
    else if (FilterBar === "Overdue") status = 3;
    else if (FilterBar === "InReview") status = 4;

    const Params = {
      page,
      status,
      search,
      PageSize: pageSize,
      myTask: FilterBar === "MyTask" ? true : false,
      OverDue: FilterBar === "Overdue" ? true : false,
    };
    dispatch(fetchTasks(Params));
  }, [FilterBar, dispatch]);

  console.log(TodoTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
  };

  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");

    setLocalTasks((prev) =>
      prev.map((t) => {
        t.id === taskId ? { ...t, status } : t;
      }),
    );

    // dispatch(updateTaskStatus({taskId, status}));
  };

  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%] lg:pt-0 pt-14">
          <div className="Navbar border bg-white justify-between  flex gap-1 sm:gap-2 h-12 w-full  items-center px-8">
            <div className="  ">
              <h1 className="font-bold  text-[#0F172A] text-[12px] md:text-[14px]  lg:text-[17px]">
                Kanban Board
              </h1>
            </div>

            <div className="flex gap-2 relative">

              {/* {(CurrentUser.role === "Admin" ||
              CurrentUser.role === "Manager") && ( */}

              <button
                type="button"
                onClick={() => navigate("/Tasks/CreateTask")}
                className="border px-3 h-7 rounded-md text-[8px] md:text-[11px] font-bold bg-[#4F46E5] text-white"
              >
                + New Task
              </button>
              {/* )} */}
            </div>
          </div>
          <DndContext onDragEnd={handleDragEnd}>
            <div className="p-4  flex gap-4">
              <div
                className="border-2 overflow-hidden rounded-lg 
                 border-t-[5px]   w-1/4 "
              >
                <div className="bg-white flex gap-2 items-center  p-4">
                  <div>⬜</div>
                  <h1 className="font-bold text-[13px]">Todo</h1>
                  <div className="border w-5 flex items-center justify-center rounded-full text-[11px] font-bold h-5 bg-[#F1F5F9] text-[#64748B]">
                    {TodoTasks.length}
                  </div>
                </div>

                <div
                  className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, 0)}
                >
                  {TodoTasks.map((t) => (
                    <div
                      className=" px-3  "
                      key={t.id}
                      draggable

                      onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", t.id);
                      }}
                    >
                      <div
                        className={`border border-l-[4px] ${t.priority === 0 ? "border-[#10B981]" : t.priority === 1 ? "border-[#F59E0B]" : "border-[#EF4444]"} p-4 rounded-lg bg-white`}
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={` flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full ${t.priority === 0 ? "text-[#10B981] bg-[#F0FDF4]" : t.priority === 1 ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"}`}
                          >

                            {" "}

                            <div
                              className={`w-2 h-2 rounded-full ${t.priority === 0 ? "bg-[#10B981]" : t.priority === 1 ? "bg-[#F59E0B]" : "bg-[#EF4444]"}`}
                            ></div>{" "}
                            {t.priority === 0
                              ? "Low"
                              : t.priority === 1
                                ? "Medium"
                                : "High"}
                          </div>
                          <p className="text-[11px] text-[#94A3B8]">
                            {t.taskCode}
                          </p>
                        </div>
                        <div className=" py-2">
                          <h1
                            className="text-[14px] font-semibold hover:underline cursor-pointer"
                            onClick={(e) => HandleTaskInfoNavigate(e, t)}
                          >
                            {t.title}
                          </h1>
                          <p className="text-[12px] text-[#94A3B8]">
                            <span className="text-white">💬</span> 2 comments{" "}
                            {""}
                            <span className="text-white">📎</span>{" "}
                            {t.filesCount} files
                          </p>
                        </div>
                        <div className="border-t-2 flex justify-between items-center pt-2">
                          <p className="text-[11px]">
                            <span className="text-white">📅</span>
                            {new Date(t.dueDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                            {t.assignedByName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="border-2 overflow-hidden rounded-lg 
                 border-t-[5px]   w-1/4"
              >
                <div className="bg-white flex gap-2 items-center  p-4">
                  <div>⌛</div>
                  <h1 className="font-bold text-[13px]">In Progress</h1>
                  <div className="border w-5 flex items-center justify-center rounded-full text-[11px] font-bold h-5 bg-[#EFF6FF] text-[#3B82F6]">
                    {InProgressTasks.length}
                  </div>
                </div>
                <div
                  className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, 1)}
                >
                  {InProgressTasks.map((t) => (
                    <div
                      className=" px-3  "
                      key={t.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", t.id);
                      }}
                    >
                      <div
                        className={`border border-l-[4px] ${t.priority === 0 ? "border-[#10B981]" : t.priority === 1 ? "border-[#F59E0B]" : "border-[#EF4444]"} p-4 rounded-lg bg-white`}
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={` flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full ${t.priority === 0 ? "text-[#10B981] bg-[#F0FDF4]" : t.priority === 1 ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"}`}
                          >
                            {" "}
                            <div
                              className={`w-2 h-2 rounded-full ${t.priority === 0 ? "bg-[#10B981]" : t.priority === 1 ? "bg-[#F59E0B]" : "bg-[#EF4444]"}`}
                            ></div>{" "}
                            {t.priority === 0
                              ? "Low"
                              : t.priority === 1
                                ? "Medium"
                                : "High"}
                          </div>
                          <p className="text-[11px] text-[#94A3B8]">
                            {t.taskCode}
                          </p>
                        </div>
                        <div className=" py-2">
                          <h1
                            className="text-[14px] font-semibold cursor-pointer hover:underline"
                            onClick={(e) => HandleTaskInfoNavigate(e, t)}
                          >
                            {t.title}
                          </h1>
                          <p className="text-[12px] text-[#94A3B8]">
                            <span className="text-white">💬</span> 2 comments{" "}
                            {""}
                            <span className="text-white">📎</span>{" "}
                            {t.filesCount} files
                          </p>
                        </div>
                        <div className="border-t-2 flex justify-between items-center pt-2">
                          <p className="text-[11px]">
                            <span className="text-white">📅</span>
                            {new Date(t.dueDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                            {t.assignedByName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="border-2 overflow-hidden rounded-lg 
                 border-t-[5px]  p- w-1/4"
              >
                <div className="bg-white flex gap-2 items-center  p-4">
                  <div>🔍</div>
                  <h1 className="font-bold text-[13px]">In Review</h1>
                  <div className="border w-5 flex items-center justify-center rounded-full text-[11px] font-bold h-5 bg-[#EFF6FF] text-[#3B82F6]">
                    {InReviewTasks.length}
                  </div>
                </div>
                <div
                  className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, 4)}
                >
                  {InReviewTasks.map((t) => (
                    <div
                      className=" px-3  "
                      key={t.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", t.id);
                      }}
                    >
                      <div
                        className={`border border-l-[4px] ${t.priority === 0 ? "border-[#10B981]" : t.priority === 1 ? "border-[#F59E0B]" : "border-[#EF4444]"} p-4 rounded-lg bg-white`}
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={` flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full ${t.priority === 0 ? "text-[#10B981] bg-[#F0FDF4]" : t.priority === 1 ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"}`}
                          >
                            {" "}
                            <div
                              className={`w-2 h-2 rounded-full ${t.priority === 0 ? "bg-[#10B981]" : t.priority === 1 ? "bg-[#F59E0B]" : "bg-[#EF4444]"}`}
                            ></div>{" "}
                            {t.priority === 0
                              ? "Low"
                              : t.priority === 1
                                ? "Medium"
                                : "High"}
                          </div>
                          <p className="text-[11px] text-[#94A3B8]">
                            {t.taskCode}
                          </p>
                        </div>
                        <div className=" py-2">
                          <h1
                            className="text-[14px] font-semibold cursor-pointer hover:underline"
                            onClick={(e) => HandleTaskInfoNavigate(e, t)}
                          >
                            {t.title}
                          </h1>
                          <p className="text-[12px] text-[#94A3B8]">
                            <span className="text-white">💬</span> 2 comments{" "}
                            {""}
                            <span className="text-white">📎</span>{" "}
                            {t.filesCount} files
                          </p>
                        </div>
                        <div className="border-t-2 flex justify-between items-center pt-2">
                          <p className="text-[11px]">
                            <span className="text-white">📅</span>
                            {new Date(t.dueDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                            {t.assignedByName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="border-2 overflow-hidden rounded-lg 
                 border-t-[5px]  p- w-1/4"
              >
                <div className="bg-white flex gap-2 items-center p-4">
                  <div>✅</div>
                  <h1 className="font-bold text-[13px]">Done</h1>
                  <div className="border w-5 flex items-center justify-center rounded-full text-[11px] font-bold h-5 bg-[#ECFDF5] text-[#10B981]">
                    {DoneTasks.length}
                  </div>
                </div>
                <div
                  className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, 2)}
                >
                  {DoneTasks.map((t) => (
                    <div
                      className=" px-3  "
                      key={t.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", t.id);
                      }}
                    >
                      <div
                        className={`border border-l-[4px] ${t.priority === 0 ? "border-[#10B981]" : t.priority === 1 ? "border-[#F59E0B]" : "border-[#EF4444]"} p-4 rounded-lg bg-white`}
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={` flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full ${t.priority === 0 ? "text-[#10B981] bg-[#F0FDF4]" : t.priority === 1 ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"}`}
                          >
                            {" "}
                            <div
                              className={`w-2 h-2 rounded-full ${t.priority === 0 ? "bg-[#10B981]" : t.priority === 1 ? "bg-[#F59E0B]" : "bg-[#EF4444]"}`}
                            ></div>{" "}
                            {t.priority === 0
                              ? "Low"
                              : t.priority === 1
                                ? "Medium"
                                : "High"}
                          </div>
                          <p className="text-[11px] text-[#94A3B8]">
                            {t.taskCode}
                          </p>
                        </div>
                        <div className=" py-2">
                          <h1
                            className="text-[14px] font-semibold cursor-pointer hover:underline"
                            onClick={(e) => HandleTaskInfoNavigate(e, t)}
                          >
                            {t.title}
                          </h1>
                          <p className="text-[12px] text-[#94A3B8]">
                            <span className="text-white">💬</span> 2 comments{" "}
                            {""}
                            <span className="text-white">📎</span>{" "}
                            {t.filesCount} files
                          </p>
                        </div>
                        <div className="border-t-2 flex justify-between items-center pt-2">
                          <p className="text-[11px]">
                            <span className="text-white">📅</span>
                            {new Date(t.dueDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                            {t.assignedByName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="border-2 overflow-hidden rounded-lg 
                 border-t-[5px]  p- w-1/4"
              >
                <div className="bg-white flex gap-2 items-center p-4">
                  <div>🔴</div>
                  <h1 className="font-bold text-[13px]">OverDue</h1>
                  <div className="border w-5 flex items-center justify-center rounded-full text-[11px] font-bold h-5  text-[#EF4444] bg-[#FEF2F2]">
                    {OverdueTasks.length}
                  </div>
                </div>
                <div
                  className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, 3)}
                >
                  {OverdueTasks.map((t) => (
                    <div
                      className=" px-3  "
                      key={t.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", t.id);
                      }}
                    >
                      <div
                        className={`border border-l-[4px] ${t.priority === 0 ? "border-[#10B981]" : t.priority === 1 ? "border-[#F59E0B]" : "border-[#EF4444]"} p-4 rounded-lg bg-white`}
                      >
                        <div className="flex gap-2 items-center">
                          <div
                            className={` flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full ${t.priority === 0 ? "text-[#10B981] bg-[#F0FDF4]" : t.priority === 1 ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEF2F2]"}`}
                          >
                            {" "}
                            <div
                              className={`w-2 h-2 rounded-full ${t.priority === 0 ? "bg-[#10B981]" : t.priority === 1 ? "bg-[#F59E0B]" : "bg-[#EF4444]"}`}
                            ></div>{" "}
                            {t.priority === 0
                              ? "Low"
                              : t.priority === 1
                                ? "Medium"
                                : "High"}
                          </div>
                          <p className="text-[11px] text-[#94A3B8]">
                            {t.taskCode}
                          </p>
                        </div>
                        <div className=" py-2">
                          <h1
                            className="text-[14px] font-semibold cursor-pointer hover:underline"
                            onClick={(e) => HandleTaskInfoNavigate(e, t)}
                          >
                            {t.title}
                          </h1>
                          <p className="text-[12px] text-[#94A3B8]">
                            <span className="text-white">💬</span> 2 comments{" "}
                            {""}
                            <span className="text-white">📎</span>{" "}
                            {t.filesCount} files
                          </p>
                        </div>
                        <div className="border-t-2 flex justify-between items-center pt-2">
                          <p className="text-[11px]">
                            <span className="text-white">📅</span>
                            {new Date(t.dueDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                            {t.assignedByName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DndContext>
        </div>
      </div>
    </>
  );
}

export default KanbanBoard;
