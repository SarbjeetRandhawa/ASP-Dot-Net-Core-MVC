import React, { useEffect, useRef } from "react";
import { Paperclip, HeartIcon, AtSign, AtSignIcon } from "lucide-react";
import { useState } from "react";
import Sidebar from "../Sidebar";
import { fetchTaskById } from "../../features/Task/TaskSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchComments, createComment } from "../../features/Task/CommentSlice";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { likeComment } from "../../features/Task/CommentSlice";
import { searchUsers } from "../../features/users/userSlice";


<div className="relative w-full">
  <textarea
    value={text}
    onChange={handleChange}
    className="w-full border p-2 rounded"
    placeholder="Write a comment... use @ to mention"
  />

  {showSuggestions && (
    <div className="absolute bg-white border w-full shadow rounded mt-1 z-10">
      {suggestions?.map((user) => (
        <div
          key={user.id}
          onClick={() => handleSelectUser(user)}
          className="p-2 cursor-pointer hover:bg-gray-200"
        >
          {user.name}
        </div>
      ))}
    </div>
  )}
</div>


function TaskDetail() {
  const { SelectedTask, loading } = useSelector((state) => state.tasks);
  const { comments } = useSelector((state) => state.comments);
  const {suggestion} = useSelector((state)=> state.user);
  const [text, settext] = useState("");
  const [query, setQuery] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [replyingto, setreplyingto] = useState(null);
  const [replyingtoName, setreplyingtoName] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  // const [showReplies, setShowReplies] = useState(false);
  const TextAreaRef = useRef(null);
  const [isReplyOpen, setisReplyOpen] = useState(null);

  const wrapperRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;
  console.log(comments);

  const { taskIdSlug } = useParams();
  const projectId = taskIdSlug.split("-")[0];

  useEffect(() => {
    dispatch(fetchTaskById(projectId));
    dispatch(fetchComments(SelectedTask?.id));
  }, [dispatch, SelectedTask?.id]);

  const handleAdd = () => {
    console.log(replyingto);

    if (!text.trim()) return;
    dispatch(
      createComment({
        taskId: SelectedTask?.id,
        commentText: text,
        parentCommentId: replyingto,
      }),
    );
    settext("");
  };

  const StatusMap = {
    0: "ToDo",
    1: "Done",
    2: "In Progress",
    3: "Overdue",
  };

  const PriorityMap = {
    0: "low",
    1: "medium",
    2: "high",
  };
  // console.log(SelectedTask);

  const isImage = (file) => {
    return file?.fileName?.match(/\.(jpg|png|jpeg|gif|webp)$/i);
  };
  const isPdf = (file) => {
    return file?.fileName?.match(/\.pdf$/i);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setreplyingto(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const HandleMenuClick = (e, commentId) => {
    e.stopPropagation();
    setisReplyOpen((prev) => (prev === commentId ? null : commentId));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    settext(value);

    const cursor = e.target.selectionStart;
    const textTillCursor = value.slice(0,cursor);

    const match = textTillCursor.match(/@(\w*)$/);


    if(match){
      setQuery(match[1]);
      setShowSuggestion(true);
      dispatch(searchUsers(match[1]));
    }else{
      setShowSuggestion(false);
    }
  };

 const  handleSelectUser = (user) => {
    const newText = text.replace(/@(\w*)$/,`@${user.name}`);
    settext(newText);
    setShowSuggestion(false);
  }

  return (
    <>
      <div className="flex ">
        <Sidebar />

        <div className="w-full lg:pl-[16.66%] lg:pt-0 pt-14">
          <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full  items-center px-4">
            <div className=" p-3 mx-0 sm:mx-4 ">
              <p className="text-[7px] sm:text-[11px] font-semibold text-[#64748B]">
                <span className="text-[#94A3B8]">Projects &gt;</span>{" "}
                <span className="text-[#94A3B8]">
                  {SelectedTask?.projectName} &gt;
                </span>{" "}
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
                  navigate("/tasks");
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

          {preview && (
            <div
              className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
              onClick={() => setPreview(null)}
            >
              <div className="bg-white w-[80%] h-[90%] rounded-lg p-4 relative">
                <button
                  className="absolute top-4 right-4 text-red-600  text-xl "
                  onClick={(e) => {
                    (e.preventDefault(), setPreview(null));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-x-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                  </svg>
                </button>
                <div className="w-full h-full flex justify-center items-center">
                  {isImage(preview) && (
                    <img
                      src={API_URL + preview?.filePath}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                  {isPdf(preview) && (
                    <iframe
                      src={API_URL + preview?.filePath}
                      className="w-full h-full"
                      title="pdf-preview?"
                    />
                  )}
                  {!isImage(preview) && !isPdf(preview) && (
                    <div className="text-center">
                      {" "}
                      <p>No Preview available</p>{" "}
                      <a
                        href={API_URL + preview?.filePath}
                        download
                        className="text-blue-500 underline"
                      >
                        Download File
                      </a>{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex lg:flex-row flex-col gap-2 p-4">
            {loading ? (
              <div className="flex flex-col gap-2 animate-pulse  p-4 h-64">
                <div className="bg-gray-200 rounded-md h-8 w-1/2"></div>
                <div className="bg-gray-200 rounded-md h-14 w-72"></div>
                <div className="bg-gray-200 rounded-md h-20 w-96"></div>
              </div>
            ) : (
              <>
                <div className=" w-full lg:w-2/3  flex flex-col gap-3 ">
                  <div className=" shadow-md bg-white rounded-xl border-2 p-4 flex flex-col gap-3">
                    <div className="flex gap-2">
                      <div
                        className={`px-4 py-1 font-semibold text-[12px]  rounded-full ${SelectedTask?.status == 0 ? "text-[#64748B] bg-[#F1F5F9]" : SelectedTask?.status == 1 ? "text-[#10B981] bg-[#F0FDF4]" : SelectedTask?.status == 2 ? "text-[#3B82F6] bg-[#EFF6FF]" : " text-[#EF4444] border-[#EF4444] bg-[#fef2f2]"}`}
                      >
                        {SelectedTask?.status == 0
                          ? "⌛"
                          : SelectedTask?.status == 1
                            ? "✅"
                            : SelectedTask?.status == 2
                              ? "✏️"
                              : "❌"}{" "}
                        {StatusMap[SelectedTask?.status]}
                      </div>
                      <div
                        className={`px-4 py-1 font-semibold text-[12px]  ${SelectedTask?.priority == 0 ? "text-[#10B981] bg-[#F0FDF4]" : SelectedTask?.priority == 1 ? "text-[#F59E0B] bg-[#FFFBEB]" : "text-[#EF4444] bg-[#FEE2E2]"} rounded-full`}
                      >
                        {SelectedTask?.priority == 0
                          ? "🟢"
                          : SelectedTask?.priority == 1
                            ? "🟡"
                            : "🔴"}{" "}
                        {PriorityMap[SelectedTask?.priority]}
                      </div>
                      {StatusMap[SelectedTask?.status] == 3 && (
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
                      )}
                    </div>

                    <div className=" pb-2  border-b">
                      <h1 className="font-bold text-[20px]">
                        {SelectedTask?.title}
                      </h1>
                    </div>

                    <div className="prose">
                      <h1 className="font-semibold text-[12px] text-[#64748B] mb-2 tracking-wider">
                        Descripion
                      </h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(SelectedTask?.description),
                        }}
                      />
                    </div>
                  </div>

                  <div className="shadow-md bg-white border-2 rounded-xl p-4">
                    <div className="flex  justify-between items-center">
                      <div>
                        <h1 className="font-bold text-[14px]">Attachments</h1>
                        <p className="text-[12px] tracking-wide font-semibold text-[#64748B]">
                          {SelectedTask?.files?.length} files uploaded
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
                      {SelectedTask?.files?.map((f) => (
                        <div
                          key={f.id}
                          onClick={() => setPreview(f)}
                          className="hover:shadow-md cursor-pointer border p-6 rounded-md flex flex-col gap-2 items-center text-[#64748B] text-[10px]  w-[190px]"
                        >
                          {f.type.startsWith("image/") ? (
                            <img
                              src={API_URL + f.filePath}
                              className="h-14 w-14"
                              alt=""
                            />
                          ) : f.type.startsWith("application/pdf") ? (
                            <img
                              src={"/public/pdf_4726010.png"}
                              className="h-14 w-14"
                              alt=""
                            />
                          ) : f.type.startsWith("application/msword") ||
                            f.type.startsWith(
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ) ? (
                            <img
                              src={"/public/doc_10301478.png"}
                              className="h-14 w-14"
                              alt=""
                            />
                          ) : f.type.startsWith("application/vnd.ms-excel") ||
                            f.type.startsWith(
                              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            ) ? (
                            <img
                              src={"/public/excel-file_11384076.png"}
                              className="h-14 w-14"
                              alt=""
                            />
                          ) : (
                            " "
                          )}
                          <h1 className="text-black font-semibold text-[12px]">
                            {f.orignalName}
                          </h1>
                          <p>2.4MB - {f.uploadedByUser}</p>
                          <p>
                            {new Date(f.uploadedAt).toLocaleDateString(
                              undefined,

                              {
                                month: "short",
                                day: "2-digit",
                                year: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border-2 shadow-md">
                    <div>
                      <div className="flex p-4 justify-between items-center">
                        <div>
                          <h1 className="font-bold text-[14px]">Comments</h1>
                          <p className="text-[12px] tracking-wide font-semibold text-[#64748B]">
                            {comments.length} Comments
                          </p>
                        </div>
                      </div>
                      <div className="border-t px-4 ">
                        {comments.map((c) => (
                          <div className="flex my-6 " key={c.id}>
                            <div>
                              <div className="w-8 h-8 bg-[#096dfa] rounded-full flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">
                                  {c.commentedbyUserName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4  w-full">
                              <div className="flex justify-between ">
                                <h1 className="font-bold text-[13px]">
                                  {c.commentedbyUserName}{" "}
                                  <span className="ml-3  text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F5F3FF] text-[#7C3AED]">
                                    Admin
                                  </span>
                                </h1>
                                <p className="text-[12px] text-[#94A3B8]">
                                  {new Date(c?.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                      month: "short",
                                      day: "2-digit",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </p>
                              </div>

                              <p className="mt-2  bg-[#F1F5F9] p-3 pr-10 rounded-xl text-[13px]  text-[#374151]">
                                {c.commentText}
                              </p>

                              <p className="mt-2 flex text-[#94A3B8] gap-1 items-center">
                                <HeartIcon
                                  onClick={() =>
                                    dispatch(
                                      likeComment({
                                        commentId: c.id,
                                        taskId: SelectedTask?.id,
                                      }),
                                    )
                                  }
                                  className={`w-4 h-4 text-black cursor-pointer ${
                                    c.isLikedByCurrentUser
                                      ? " fill-red-600 text-red-600"
                                      : ""
                                  }  `}
                                />{" "}
                                {c.likeCount} &nbsp;{" "}
                                <span
                                  className="text-[12px] text-blue-600 font-semibold tracking-wider cursor-pointer"
                                  onClick={() => {
                                    console.log(c.id);
                                    setreplyingto(c?.id);
                                    setreplyingtoName(c?.commentedbyUserName);

                                    setTimeout(() => {
                                      TextAreaRef.current?.focus();
                                    }, 0);
                                  }}
                                >
                                  Reply &nbsp;{" "}
                                </span>
                                <span
                                  onClick={(e) => HandleMenuClick(e, c.id)}
                                  className="text-[12px] font-semibold tracking-wider cursor-pointer"
                                >
                                  {c.replies.length > 0 &&
                                    (isReplyOpen === c.id
                                      ? "Hide Replies"
                                      : `Show ${c.replies.length} Replies`)}
                                </span>
                              </p>
                              {isReplyOpen === c.id &&
                                c.replies?.map((r) => (
                                  <div className="border-l-2 p-2 " key={r.id}>
                                    <div className="p-4 ">
                                      <div className="flex ">
                                        <div>
                                          <div className="w-8 h-8 bg-[#096dfa] rounded-full flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold">
                                              {c.commentedbyUserName
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .toUpperCase()}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ml-4  w-full">
                                          <div className="flex justify-between ">
                                            <h1 className="font-bold text-[13px]">
                                              {r.commentedbyUserName}{" "}
                                              <span className="ml-3  text-[10px] font-semibold px-2 py-1 rounded-full bg-[#F5F3FF] text-[#7C3AED]">
                                                Admin
                                              </span>
                                            </h1>
                                            <p className="text-[12px] text-[#94A3B8]">
                                              {new Date(
                                                r?.createdAt,
                                              ).toLocaleDateString(undefined, {
                                                month: "short",
                                                day: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </p>
                                          </div>
                                          <p className="mt-2  bg-[#F1F5F9] p-3 pr-10 rounded-xl text-[13px]  text-[#374151]">
                                            {r.commentText}
                                          </p>
                                          <p className="mt-2 flex text-[#94A3B8] gap-1 items-center ">
                                            <HeartIcon
                                              onClick={() =>
                                                dispatch(
                                                  likeComment({
                                                    commentId: r.id,
                                                    taskId: SelectedTask?.id,
                                                  }),
                                                )
                                              }
                                              className={`w-4 h-4 text-black cursor-pointer ${
                                                r.isLikedByCurrentUser
                                                  ? " fill-red-600 text-red-600"
                                                  : ""
                                              }  `}
                                            />{" "}
                                            {r.likeCount} &nbsp;{" "}
                                            <span
                                              className="text-[12px] text-blue-600 font-semibold tracking-wider cursor-pointer"
                                              onClick={() => {
                                                console.log(c.id);
                                                setreplyingto(c?.id);

                                                setreplyingtoName(
                                                  r?.commentedbyUserName,
                                                );

                                                setTimeout(() => {
                                                  TextAreaRef.current?.focus();
                                                }, 0);
                                              }}
                                            >
                                              Reply
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border flex " ref={wrapperRef}>
                      <div className="  gap-4 w-full ">
                        <div className="flex gap-4 items-start mb-2">
                          <div className="w-[35px] h-8 bg-[#096dfa] rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">
                              AK
                            </span>
                          </div>

                          <div className="w-full">
                            <textarea
                              value={text}
                              ref={TextAreaRef}
                              onChange={(e) => settext(e.target.value)}
                              className="w-full h-20 resize-none border rounded-md p-2 text-[12px] font-semibold hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={
                                replyingto
                                  ? `Replying to ${replyingtoName}`
                                  : "Write a comment..."
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex gap-2 ml-12">
                            <div
                              className="border-2 cursor-pointer flex items-center 
                     px-4 h-8 text-[12px] font-semibold rounded-md  hover:shadow-md"
                            >
                              <AtSignIcon className="w-4 h-4 mr-2" />
                              Mention
                            </div>
                          </div>
                          <button
                            onClick={handleAdd}
                            className="border-2 cursor-pointer flex items-center 
                     px-4 h-8 text-[12px] font-semibold rounded-md bg-[#4F46E5] text-white hover:bg-[#6059e5]"
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-2 shadow-md bg-white rounded-xl">
                    <h1 className="font-bold text-[14px] ">
                      Activity Timeline
                    </h1>

                    <div className="mt-4 relative flex flex-col gap-4 pt-4 border-t-2">
                      <div className="absolute border-2 border-[#eeeeee] h-full left-[7px]  z-10"></div>
                      <div className="bg-white absolute w-10 h-[35px]  z-20 -bottom-4"></div>

                      <div className="flex gap-4 z-20 ">
                        <div className="w-4 h-4 mt-1 border-4  border-red-500 bg-[#f9e6e6] rounded-full"></div>
                        <div>
                          <p className="text-[13px]  ">
                            <span className="font-bold"> Alice Smith </span>
                            <span className="">uploaded</span>{" "}
                            <span className="text-blue-600">
                              {" "}
                              wireframe-v1.png
                            </span>{" "}
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
                            <span className="text-blue-600">
                              {" "}
                              wireframe-v1.png
                            </span>{" "}
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
                      <h1 className="text-[14px] font-semibold">
                        Task Details
                      </h1>
                    </div>

                    <div className="p-4 flex flex-col gap-4">
                      <div>
                        <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                          STATUS
                        </h1>
                        <div className="flex items-center   mt-2">
                          <div
                            className="flex items-center w-32 gap-2 cursor-pointer"
                            // onClick={() => setTaskStatus("ToDo")}
                          >
                            <div className="w-3 h-3 bg-[#7a7a7a] rounded-full"></div>
                            <p className="text-[12px] font-semibold">ToDo</p>
                            {StatusMap[SelectedTask?.status] === "ToDo" && (
                              <div>✅</div>
                            )}
                          </div>
                          <div
                            className="flex items-center w-32 gap-2 cursor-pointer"
                            // onClick={() => setTaskStatus("In Progress")}
                          >
                            <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
                            <p className="text-[12px] font-semibold">
                              In Progress
                            </p>
                            {StatusMap[SelectedTask?.status] ===
                              "In Progress" && <div>✅</div>}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                          PRIORITY
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                          <div
                            className={`w-3 h-3 bg-[#EF4444] rounded-full`}
                          ></div>
                          <p className="text-[12px] font-semibold">
                            {PriorityMap[SelectedTask?.priority]}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                          ASSIGNEE
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-6 h-6 bg-[#64748B] rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">
                              {SelectedTask?.assignedToName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[12px] font-semibold">
                            {SelectedTask?.assignedToName}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                          DUE DATE
                        </h1>
                        <div
                          className={` rounded-md p-2 mt-2 text-[12px] font-semibold flex  gap-1 items-center justify-between ${SelectedTask?.status == 3 ? "bg-[#fae5e5] text-[#EF4444]" : "text-green-600 bg-[#e8fce1]"} `}
                        >
                          <p className=" font-semibold">
                            🗓️{" "}
                            {new Date(SelectedTask?.dueDate).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p>{SelectedTask?.status == 3 ? "Overdue" : ""}</p>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                          PROJECT
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-3 h-3 bg-[#0261fb] rounded-full flex items-center justify-center"></div>
                          <p className="text-[12px] text-[#0261fb] font-semibold">
                            {SelectedTask?.projectName}
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
                              {SelectedTask?.assignedByName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[12px] font-semibold">
                            {SelectedTask?.assignedByName}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                          CREATED AT
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-[12px] font-semibold">
                            🗓️{" "}
                            {new Date(
                              SelectedTask?.createdAt,
                            ).toLocaleDateString(undefined, {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      {SelectedTask?.updatedAt && (
                        <div>
                          <h1 className="text-[11px] text-[#94A3B8] font-semibold tracking-widest">
                            UPDATED AT
                          </h1>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-[12px] font-semibold">
                              🗓️{" "}
                              {new Date(
                                SelectedTask?.updatedAt,
                              ).toLocaleDateString(undefined, {
                                month: "short",
                                day: "2-digit",
                                year: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      )}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetail;
