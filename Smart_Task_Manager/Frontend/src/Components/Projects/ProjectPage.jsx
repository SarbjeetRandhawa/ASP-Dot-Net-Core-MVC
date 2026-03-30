import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProjects } from "../../features/project/projectSlice";


import { useDispatch } from "react-redux";
import AvatarGroup from "../AvtarGroup";

function ProjectPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const [StatusFilter, setStatusFilter] = useState("All");
  const [Status, setStatus] = useState("Active");
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(null);
  const [search, setsearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const CurrentUser = useSelector((state) => state.auth.user);

  const ActiveProjects = projects.filter((u) => u.status === "Active").length;
  const ArchievedProjects = projects.filter(
    (u) => u.status === "Archived",
  ).length;
  const OverdueProjects = projects.filter((u) => u.status === "overdue").length;
 

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // useEffect(() => {
  //   const HandleClickOutside = () => {
  //     setIsProjectMenuOpen(null);
  //   };

  //   document.addEventListener("click", HandleClickOutside);
  //   return () => document.removeEventListener("click", HandleClickOutside);
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);

  const searchedProjects = projects.filter((p) => {
    if (!debounceSearch) return true;

    return p.name.toLowerCase().includes(debounceSearch.toLowerCase());
  });

  const filteredProjects = searchedProjects.filter((u) => {
    if (StatusFilter === "All") return true;
    if (StatusFilter === "Active") return u.status === "Active";
    if (StatusFilter === "Archived") return u.status === "Archived";
    if (StatusFilter === "Overdue") return u.status === "Overdue";
  });

  const filterActiveCount = searchedProjects.filter(
    (u) => u.status === "Active",
  ).length;

  const filterArchivedCount = searchedProjects.filter(
    (u) => u.status === "Archived",
  ).length;

  const filterOverdueCount = searchedProjects.filter(
    (u) => u.status === "Overdue",
  ).length;

  const formFullDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const HandleProjectInfoNavigate = (project) => {
    navigate(`/projects/${project.id}-${createSlug(project.name)}`);
  };

  const HandleMenuClick = (e, projectId) => {
    e.stopPropagation();
    setIsProjectMenuOpen((prev) => (prev === projectId ? null : projectId));
  };
  const HandleEdit = (id) => {
    console.log(id);
    setIsProjectMenuOpen(null);
  };
  const HandleDelete = (id) => {
    console.log(id);
    setIsProjectMenuOpen(null);
  };

  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g,"-");
  };

  return (
    <div className="flex ">
      <Sidebar />

      <div className="w-full lg:pl-[16.66%]  md:pt-0 md:pl-[33%] pt-14">
        <div className="Navbar border bg-white  flex gap-1 sm:gap-2 h-12 w-full justify-between items-center px-4">
          <h1 className="font-bold">Projects</h1>
          <div className="flex gap-2 relative">
            <div className="absolute w-0 left-1 top-1">🔍</div>
            <input
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="h-7 border pl-8 text-[11px] font-bold rounded-md focus:outline-2 outline-[#4F46E5]"
              placeholder="Search projects..."
            />
            <div className="border relative px-1 rounded-md cursor-pointer">
              <div className="absolute text-4xl -top-6 text-red-600 right-[2px]">
                .
              </div>
              🔔
            </div>
            {(CurrentUser.role === "Admin" ||
              CurrentUser.role === "Manager") && (
              <button
                type="button"
                onClick={() => navigate("/projects/createProjects")}
                className="border px-3 h-7 rounded-md text-[11px] font-bold bg-[#4F46E5] text-white"
              >
                + New Project
              </button>
            )}
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}

        <div className="Counts  p-4 flex justify-between gap-2">
          <div className="border-2 w-1/4 border-[#C7D2FE] bg-[#EEF2FF] px-4  flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">📁</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {projects.length}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Total Projects
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">🟢</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {ActiveProjects}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Active
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#E2E8F0] bg-[#F1F5F9] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">📦</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {ArchievedProjects}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Archived
              </p>
            </div>
          </div>
          <div className="border-2 w-1/4 border-[#FDE68A] bg-[#FFFBEB] px-4 py-2 flex items-center gap-2 rounded-lg">
            <div className="text-[20px] md:text-[25px]">⚠️</div>
            <div className="leading-tight">
              <h1 className="font-bold text-[15px] md:text-[20px]">
                {OverdueProjects}
              </h1>
              <p className="text-[#64748B] text-[10px] md:text-[13px]">
                Overdue Projects
              </p>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------------- */}

        <div className="filter ml-4  flex gap-2 text-[#64748B]">
          <div
            className={`border cursor-pointer px-3 rounded-full text-[11px] font-bold py-1 ${StatusFilter === "All" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setStatusFilter("All")}
          >
            <h1>
              All ({" "}
              {debounceSearch === ""
                ? projects.length
                : searchedProjects.length}{" "}
              )
            </h1>
          </div>
          <div
            className={`border  px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${StatusFilter === "Active" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setStatusFilter("Active")}
          >
            <h1>
              Active ({" "}
              {debounceSearch === "" ? ActiveProjects : filterActiveCount} )
            </h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${StatusFilter === "Archived" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"}`}
            onClick={() => setStatusFilter("Archived")}
          >
            <h1>
              Archived ({" "}
              {debounceSearch === "" ? ArchievedProjects : filterArchivedCount}{" "}
              )
            </h1>
          </div>
          <div
            className={`border px-3 rounded-full text-[11px] font-bold py-1 cursor-pointer ${StatusFilter === "Overdue" ? "border-[#C7D2FE] bg-[#EEF2FF] text-[#4F46E5]" : "bg-white"} `}
            onClick={() => setStatusFilter("Overdue")}
          >
            <h1>
              Overdue ({" "}
              {debounceSearch === "" ? OverdueProjects : filterOverdueCount} )
            </h1>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}

        <div className="p-4">
          <div className=" h-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            {filteredProjects.map((p) => {
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    HandleProjectInfoNavigate(p);
                  }}
                  className="border  bg-white hover:border-[#4F46E5] overflow-hidden cursor-pointer z-0 p-4 relative h-auto col rounded-md text-black"
                >
                  <div className="z-0 absolute w-[10rem] h-[10rem] bg-[#ffffff2e] -right-10 -top-10 rounded-full"></div>
                  <div className="">
                    <div className="flex flex-col gap-3 mt-1">
                      <div className="flex gap-3 justify-between items-center">
                        <div className="flex gap-3">
                          <div
                            className={`p-1 h-9 rounded-lg text-[20px]`}
                            style={{ background: `${p.colorTheme}33` }}
                          >
                            {p.icon}
                          </div>
                          <div>
                            <h1 className="font-semibold text-[13px]">
                              {p.name}
                            </h1>
                            <p className="text-[11px] font-semibold text-[#94A3B8]">
                              {formFullDate(
                                new Date(p.startDate).toLocaleDateString(),
                              )}{" "}
                              &nbsp;- &nbsp;{" "}
                              {formFullDate(
                                new Date(p.endDate).toLocaleDateString(),
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center ">
                          <p
                            className={`text-[11px] font-bold ${Status == "Active" ? "text-[#10B981] bg-[#ECFDF5]" : Status == "Archived" ? " text-[#64748B] bg-[#F1F5F9]" : " text-[#f50000] bg-[#ffefef]"} px-2 py-1  rounded-lg`}
                          >
                            {p.status}
                          </p>
                          {(CurrentUser.role === "Admin" ||
                            CurrentUser.role === "Manager") && (
                            <div
                              className="text-[#94A3B8]  hover:bg-[#dfdfdf33] rounded-3xl z-30  p-2"
                              onClick={(e) => {
                                HandleMenuClick(e, p.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-three-dots"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                              </svg>
                            </div>
                          )}

                          <div
                            onClick={(e) => e.stopPropagation()}
                            className={` border absolute right-2 top-12  bg-white shadow-md rounded h-auto w-28 z-50 transform transition- duration-300 ${isProjectMenuOpen == p.id ? "translate-x-0" : "translate-x-32"}`}
                          >
                            <div
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-semibold"
                              onClick={() => HandleEdit(p.id)}
                            >
                              Edit
                            </div>
                            <div
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-semibold text-red-600"
                              onClick={() => HandleDelete(p.id)}
                            >
                              Delete
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#64748B] line-clamp-2 h-9 break-words  whitespace-pre-wrap text-[11px]">
                        {p.description}
                      </p>
                      <div className="flex justify-between text-[10px] font-semibold text-[#64748B] mb-[-7px]">
                        <p>Progress</p>
                        <p
                          className={`font-bold`}
                          style={{ color: `${p.colorTheme}` }}
                        >
                          30%
                        </p>
                      </div>
                      <div className="progressbar w-full bg-[#E2E8F0] h-1 rounded-lg">
                        <div
                          className={`w-2/12 h-1 rounded-lg bg-[${p.colorTheme}]`}
                        ></div>
                      </div>
                      <div className="flex justify-between relative">
                        <p className="text-[12px] text-[#64748B]">
                          9 tasks -{" "}
                          <span className="text-red-600">2 overdue</span>
                        </p>
                        <AvatarGroup members={p.members} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
