import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../features/Task/TaskSlice";
import { useNavigate } from "react-router-dom";

import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function KanbanBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const [FilterBar, setFilterBar] = useState("All");

  // ✅ Filter Tasks
  const TodoTasks = tasks.filter((t) => t.status === 0);
  const DoneTasks = tasks.filter((t) => t.status === 1);
  const InProgressTasks = tasks.filter((t) => t.status === 2);
  const OverdueTasks = tasks.filter((t) => t.status === 3);
  const InReviewTasks = tasks.filter((t) => t.status === 4);

  // ✅ Navigate
  const HandleTaskInfoNavigate = (e, task) => {
    e.stopPropagation();
    navigate(`/tasks/${task.id}-${task.taskCode}`);
  };

  // ✅ Fetch Tasks
  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  // ✅ DRAGGABLE ITEM
  function SortableItem({ id, children }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: "grab",
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  }

  // ✅ DROPPABLE COLUMN
  function Column({ id, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
      <div ref={setNodeRef} className="w-1/4">
        {children}
      </div>
    );
  }

  // ✅ DRAG END HANDLER
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const columnId = over.id;

    const statusMap = {
      todo: 0,
      done: 1,
      inprogress: 2,
      overdue: 3,
      inreview: 4,
    };

    const newStatus = statusMap[columnId];

    console.log("Task moved:", taskId, "→", newStatus);

    // 👉 Call API / Redux here
    // dispatch(updateTaskStatus({ taskId, status: newStatus }));
  };

  // ✅ TASK CARD UI
  const TaskCard = (t) => (
    <div className="px-3">
      <div
        className={`border border-l-[4px] ${
          t.priority === 0
            ? "border-[#10B981]"
            : t.priority === 1
            ? "border-[#F59E0B]"
            : "border-[#EF4444]"
        } p-4 rounded-lg bg-white`}
      >
        <div className="flex gap-2 items-center">
          <div className="text-[10px] font-semibold px-2 rounded-full">
            {t.priority === 0 ? "Low" : t.priority === 1 ? "Medium" : "High"}
          </div>
          <p className="text-[11px] text-[#94A3B8]">{t.taskCode}</p>
        </div>

        <div className="py-2">
          <h1
            className="text-[14px] font-semibold cursor-pointer hover:underline"
            onClick={(e) => HandleTaskInfoNavigate(e, t)}
          >
            {t.title}
          </h1>

          <p className="text-[12px] text-[#94A3B8]">
            📎 {t.filesCount} files
          </p>
        </div>

        <div className="border-t pt-2 flex justify-between">
          <p className="text-[11px]">
            {new Date(t.dueDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </p>

          <div className="w-6 h-6 flex items-center justify-center text-[10px] font-bold rounded-full border">
            {t.assignedByName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ COLUMN RENDER FUNCTION
  const renderColumn = (title, items, id) => (
    <Column id={id}>
      <div className="border-2 rounded-lg bg-gray-50">
        <div className="bg-white p-4 flex justify-between items-center">
          <h1 className="font-bold text-[13px]">{title}</h1>
          <span className="text-[11px] font-bold">{items.length}</span>
        </div>

        <div className="h-[75vh] overflow-scroll flex flex-col gap-3 pt-3">
          <SortableContext
            items={items.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((t) => (
              <SortableItem key={t.id} id={t.id}>
                {TaskCard(t)}
              </SortableItem>
            ))}
          </SortableContext>
        </div>
      </div>
    </Column>
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full lg:pl-[16.66%] pt-14">
        <div className="p-4 flex justify-between bg-white border">
          <h1 className="font-bold">Kanban Board</h1>

          <button
            onClick={() => navigate("/Tasks/CreateTask")}
            className="bg-[#4F46E5] text-white px-3 py-1 rounded"
          >
            + New Task
          </button>
        </div>

        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="p-4 flex gap-4">
            {renderColumn("Todo", TodoTasks, "todo")}
            {renderColumn("In Progress", InProgressTasks, "inprogress")}
            {renderColumn("In Review", InReviewTasks, "inreview")}
            {renderColumn("Done", DoneTasks, "done")}
            {renderColumn("Overdue", OverdueTasks, "overdue")}
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default KanbanBoard;