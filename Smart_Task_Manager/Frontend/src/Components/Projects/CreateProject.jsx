import Sidebar from "../Sidebar";
import "../../App.css";
import { useState, useMemo } from "react";
import ProjectMembers from "./ProjectMembers";
import { useForm } from "react-hook-form";
import { createProject } from "../../Services/ProjectService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AvatarGroup from "../AvtarGroup";

function CreateProject() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    // watch,
  } = useForm();
  // const startDate = watch("StartDate");
  const [members, setMembers] = useState([]);

  const [projectFormData, setProjectFormData] = useState({
    Name: "",
    Description: "",
    Status: "Active",
    StartDate: "",
    EndDate: "",
    Icon: "📱",
    Colour: "#4F46E5",
  });

  const length = projectFormData.Description?.length || 0;

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setProjectFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const SelectIcon = (Icon) => {
    setProjectFormData({
      ...projectFormData,
      Icon: Icon,
    });
  };
  const SelectColourTheme = (colour) => {
    setProjectFormData({
      ...projectFormData,
      Colour: colour,
    });
  };

  const CalculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return { error: "End date must be after start date" };

    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    let adjustedDate = new Date(start);
    adjustedDate.setMonth(start.getMonth() + months);

    if (adjustedDate > end) {
      months--;
      adjustedDate = new Date(start);
      adjustedDate.setMonth(start.getMonth() + months);
    }

    const days = Math.ceil((end - adjustedDate) / (1000 * 60 * 60 * 24));

    return {
      totalDays,
      months,
      days,
    };
  };

  const duration = useMemo(() => {
    return CalculateDuration(
      projectFormData.StartDate,
      projectFormData.EndDate,
    );
  }, [projectFormData.StartDate, projectFormData.EndDate]);

  const formFullDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const ValidateMembers = () => {
    if (members.length === 0) {
      alert("Add at least one team member");
      return false;
    }

    const invalid = members.some((m) => !m.ProjectRoleId);
    if (invalid) {
      alert("All members must have a role");
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (!ValidateMembers()) return;

    try {
      const payload = {
        Name: data.Name,
        Description: data.Description,
        StartDate: data.StartDate,
        EndDate: data.EndDate,
        colorTheme: projectFormData.Colour,
        Icon: projectFormData.Icon,
        Status: projectFormData.Status,
        Members: members.map((m) => ({
          UserId: m.userId,
          Role: m.ProjectRoleId,
        })),
      };

      await createProject(payload);
      await Swal.fire({
        position: "top-end",
        title: "Created!",
        text: "Project is Created",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/projects");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full lg:pl-[16.66%] bg-white md:pt-0 md:pl-[33%] pt-14">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="Navbar border  flex gap-1 sm:gap-2 h-12 w-full">
            <div className=" p-3 mx-0 sm:mx-4  ">
              <p className="text-[7px] sm:text-[11px] font-semibold text-[#64748B]">
                <span className="text-[#94A3B8]">Projects &gt;</span> Create New
                Project
              </p>
              <h1 className="font-bold mt-[-3px] text-[#0F172A] text-[12px]">
                Create New Project
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
                🚀 Create Project
              </button>
            </div>
          </div>

          <div className="h-full flex flex-col lg:flex-row p-2 sm:p-4 w-full gap-4 bg-[#f8f8f8]">
            <div className="w-full lg:w-2/3 h-auto gap-4 flex flex-col">
              <div className="Project-info bg-white h-auto rounded-lg border-2">
                <div className="flex border-b-2 p-4">
                  <div className="w-2/3">
                    <h1 className="font-bold text-[14px]">
                      Project Information
                    </h1>
                    <p className="text-[12px] font-semibold text-[#64748B] ">
                      Basic details about your project
                    </p>
                  </div>
                  <p className="text-[13px] text-[#94A3B8] w-1/3 text-end">
                    Step 1 of 3
                  </p>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <label
                    htmlFor="ProjectName"
                    className="text-[12px] font-semibold text-[#64748B]"
                  >
                    Project Name <span>*</span>
                  </label>
                  <input
                    {...register("Name", {
                      required: "project Name is required",
                    })}
                    type="text"
                    name="Name"
                    placeholder="Mobile App v3.0"
                    onChange={HandleChange}
                    className="border-2  text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
                  />
                  {errors.Name && (
                    <p className="text-red-500 text-sm">
                      {errors.Name.message}
                    </p>
                  )}
                  <p className="text-[11px] mt-[-5px]  text-[#94A3B8] ">
                    Choose a clear, description name for your project
                  </p>

                  <label
                    htmlFor="description"
                    className="text-[12px] font-semibold text-[#64748B]"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    {...register("Description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 Characters",
                      },
                    })}
                    rows="4"
                    maxLength="1000"
                    name="Description"
                    onClick={HandleChange}
                    value={projectFormData.Description || ""}
                    onChange={HandleChange}
                    placeholder="Describe the project goals, scope and any important context for your team..."
                    className="border-2  text-[12px] p-2 font-semibold rounded-md resize-none  focus:border-blue-600 focus:outline-none"
                  />
                  {errors.Description && (
                    <p className="text-red-500 text-sm">
                      {errors.Description.message}
                    </p>
                  )}

                  <p className="text-end  text-[12px] text-[#94A3B8] ">
                    {length}/1000 Characters
                  </p>
                </div>
              </div>

              <div className="Timeline bg-white h-auto rounded-lg border-2">
                <div className="flex border-b-2 p-4">
                  <div className="w-2/3">
                    <h1 className="font-bold text-[14px]">Timeline</h1>
                    <p className="text-[12px] font-semibold text-[#64748B] ">
                      Set the project start and end dates
                    </p>
                  </div>
                </div>

                <div className="p-4 flex flex-col sm:flex-row gap-2">
                  <span className="flex flex-col w-1/2">
                    <label
                      htmlFor="ProjectName"
                      className="text-[12px] font-semibold text-[#64748B]"
                    >
                      Start date <span>*</span>
                    </label>
                    <input
                      type="date"
                      {...register("StartDate", {
                        required: "Start Date is required",
                      })}
                      name="StartDate"
                      onChange={HandleChange}
                      className="border-2  text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
                    />
                    {errors.StartDate && (
                      <p className="text-red-500 text-sm">
                        {errors.StartDate.message}
                      </p>
                    )}
                  </span>
                  <span className="flex flex-col w-1/2">
                    <label
                      htmlFor="endDate"
                      className="text-[12px] font-semibold text-[#64748B]"
                    >
                      End Date <span>*</span>
                    </label>
                    <input
                      type="date"
                      {...register("EndDate", {
                        required: "End Date is required",
                        onChange: (e) => {
                          const start = getValues("StartDate");
                          const end = e.target.value;
                          if (start && end && end < start) {
                            setError("EndDate", {
                              type: "manual",
                              message:
                                "End Date cannot be smaller than Start Date",
                            }) ;
                          }else if(end == start){
                            setError("EndDate", {
                              type: "manual",
                              message:
                                "End Date cannot be Equal to Start Date",
                            }) ;
                          } else {
                            clearErrors("EndDate");
                          };
                          HandleChange(e);
                        },
                      })}
                      name="EndDate"
                      // onChange={HandleChange}
                      className="border-2  text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
                    />
                    {errors.EndDate && (
                      <p className="text-red-500 text-sm">
                        {errors.EndDate.message}
                      </p>
                    )}
                  </span>
                </div>

                <div className="px-4 pb-4">
                  <div className="h-auto p-4 bg-[#F1F5F9] rounded-md">
                    <div className=" h-5 text-[10px] flex justify-between text-[#94A3B8]">
                      <p>
                        {formFullDate(projectFormData.StartDate) || "Apr 1"}
                      </p>
                      <p
                        className="font-semibold"
                        style={{ color: `${projectFormData.Colour}` }}
                      >
                        {duration?.months ? `${duration.months} Months` : ``}
                        &nbsp;
                        {duration?.days ? `${duration.days} Days` : ``}
                      </p>
                      <p>{formFullDate(projectFormData.EndDate) || "Apr 30"}</p>
                    </div>
                    <div
                      className=" h-[10px] rounded-md"
                      style={{
                        background: `linear-gradient(to LEFT,${projectFormData.Colour} , ${projectFormData.Colour}66)`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <ProjectMembers members={members} setMembers={setMembers} />
              </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-4 h-auto">
              <div className="projectSetting bg-white h-auto rounded-lg border-2">
                <div className="flex border-b-2 p-4">
                  <div className="w-2/3">
                    <h1 className="font-bold text-[14px]">Project Settings</h1>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2 ">
                  <label
                    htmlFor="ProjectIcon"
                    className="text-[12px] font-semibold text-[#64748B]"
                  >
                    Project Icon
                  </label>
                  <div className="flex flex-wrap  gap-1 ">
                    <div
                      onClick={() => SelectIcon("👑")}
                      className={`cursor-pointer  p-2 rounded-md text-center ${
                        projectFormData.Icon === "👑"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>👑</div>
                    </div>

                    <div
                      onClick={() => SelectIcon("🗃️")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "🗃️"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>🗃️</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("🚀")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "🚀"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>🚀</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("⚙️")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "⚙️"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>⚙️</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("🕒")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "🕒"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>🕒</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("📊")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "📊"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>📊</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("📧")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "📧"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>📧</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("📱")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "📱"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>📱</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("💡")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "💡"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>💡</div>
                    </div>
                    <div
                      onClick={() => SelectIcon("📇")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "📇"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>📇</div>
                    </div>

                    <div
                      onClick={() => SelectIcon("👤")}
                      className={`cursor-pointer p-2 rounded-md text-center ${
                        projectFormData.Icon === "👤"
                          ? "border-2 border-indigo-500 bg-indigo-50"
                          : "border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <div>👤</div>
                    </div>
                  </div>

                  {/* colour theme */}
                  <label
                    htmlFor="colourTheme"
                    className="text-[12px] mt-3  font-semibold text-[#64748B]"
                  >
                    Colour Theme
                  </label>
                  <div className="h-auto flex flex-wrap gap-[7px]">
                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#4F46E5] ${
                        projectFormData.Colour === "#4F46E5"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#4F46E5")}
                    ></div>

                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#7C3AED] ${
                        projectFormData.Colour === "#7C3AED"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#7C3AED")}
                    ></div>

                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#06B6D4] ${
                        projectFormData.Colour === "#06B6D4"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#06B6D4")}
                    ></div>
                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#10B981] ${
                        projectFormData.Colour === "#10B981"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#10B981")}
                    ></div>
                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#F59E0B] ${
                        projectFormData.Colour === "#F59E0B"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#F59E0B")}
                    ></div>
                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#EF4444] ${
                        projectFormData.Colour === "#EF4444"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#EF4444")}
                    ></div>
                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#EC4899] ${
                        projectFormData.Colour === "#EC4899"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#EC4899")}
                    ></div>
                    <div
                      className={`rounded-full cursor-pointer border h-9 w-9 bg-[#64748B] ${
                        projectFormData.Colour === "#64748B"
                          ? "border-2 border-black "
                          : "border-2 border-gray-200"
                      }`}
                      onClick={() => SelectColourTheme("#64748B")}
                    ></div>
                  </div>
                </div>
              </div>

              <div
                className="overflow-hidden p-4 relative h-auto  rounded-md"
                style={{
                  background: `linear-gradient(to bottom, #1E1B4B, ${projectFormData.Colour})`,
                }}
              >
                <div className="z-0 absolute w-[10rem] h-[10rem] bg-[#ffffff2e] -right-10 -top-10 rounded-full"></div>
                <div className="text-white ">
                  <h1 className="text-[#FFFFFF80] text-[12px] font-semibold">
                    PREVIEW
                  </h1>
                  <div className="flex flex-col gap-3 mt-3">
                    <div className="flex gap-3">
                      <div className="block p-1 bg-[#FFFFFF26] rounded-lg text-[25px]">
                        {projectFormData.Icon}
                      </div>
                      <div>
                        <h1 className="font-semibold">
                          {projectFormData.Name || "Mobile App v3.0"}
                        </h1>
                        <p className="text-[13px] font-semibold text-[#FFFFFF80]">
                          {projectFormData.Status || "Active"}{" "}
                          &nbsp;&nbsp;&nbsp;
                          {formFullDate(projectFormData.StartDate) ||
                            "Apr 1"}{" "}
                          &nbsp;- &nbsp;{" "}
                          {formFullDate(projectFormData.EndDate) || "Apr 30"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#FFFFFFA6] break-words line-clamp-3 whitespace-pre-wrap ">
                      {projectFormData.Description ||
                        "Third major version of the IOS/Android Application"}
                    </p>
                    <div className="progressbar w-full bg-[#FFFFFF2A] h-2 rounded-lg">
                      <div className="w-2/12 h-2 rounded-lg bg-white"></div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <AvatarGroup members={members} />
                      </div>
                      <p className="mb-4 text-[#FFFFFFA6]">0 tasks - 0% done</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="proTip h-auto p-4  outline outline-[#C7D2FE] rounded-md bg-[#EEF2FF]">
                <h1 className="font-semibold text-[#3730A3]">💡 Pro Tips</h1>
                <ul className="ml-6 flex flex-col gap-2 mt-3 text-[#4338CA] ">
                  <li>Keep project names short and specific</li>
                  <li>Set a realistic end date with buffer time</li>
                  <li>Add all stakeholders from the start</li>
                  <li>Create tasks right after project setup</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateProject;
