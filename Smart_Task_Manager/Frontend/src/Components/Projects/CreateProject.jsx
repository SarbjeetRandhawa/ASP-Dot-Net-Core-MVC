// import { useDispatch } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
import Sidebar from "../Sidebar";
import "../../App.css";
import { useState } from "react";
import TeamMembers from "./TeamMembers";

function CreateProject() {
  // const dispatch = useDispatch();
  const [projectFormData, setProjectFormData] = useState({
    Icon: "📱",
    Colour: "#4F46E5",
  });
  const [text, setText] = useState("");
  const length = text.length;

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

  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full pl-[16.66%]">
        <form method="post">
          <div className="Navbar border my flex gap-2 h-12 w-full">
            <div className="p-1 mx-4">
              <p className="text-[11px] font-semibold text-[#64748B]">
                <span className="text-[#94A3B8]">Projects &gt;</span> Create New
                Project
              </p>
              <h1 className="font-bold text-[#0F172A]">Create New Project</h1>
            </div>
            <div className="flex gap-2 items-center">
              <button className="border h-2/3  text-[11px] font-bold rounded-md w-[90px]">
                Cancel
              </button>
              <button className="border h-2/3  text-[11px] font-bold rounded-md w-[120px]">
                💾 Save Draft
              </button>
              <button type="buttons" className="border h-2/3  text-[11px] font-bold rounded-md w-[145px] bg-[#4F46E5] text-white">
                🚀 Create Project
              </button>
            </div>
          </div>

          <div className="h-full flex-row flex p-4 w-full gap-4 bg-[#f8f8f8]">
            <div className=" w-2/3 h-auto gap-4 flex flex-col">
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
                    type="text"
                    name="ProjectName"
                    placeholder="Mobile App v3.0"
                    className="border-2  text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
                  />
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
                    rows="4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe the project goals, scope and any important context for your team..."
                    className="border-2  text-[12px] p-2 font-semibold rounded-md resize-none  focus:border-blue-600 focus:outline-none"
                  />
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

                <div className="p-4 flex  gap-2 ">
                  <span className="flex flex-col w-1/2">
                    <label
                      htmlFor="ProjectName"
                      className="text-[12px] font-semibold text-[#64748B]"
                    >
                      Start date <span>*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      className="border-2  text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
                    />
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
                      name="endDate"
                      className="border-2  text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
                    />
                  </span>
                </div>

                <div className="px-4 pb-4">
                  <div className="h-auto p-4 bg-[#F1F5F9] rounded-md">
                    <div className=" h-5 text-[10px] flex justify-between text-[#94A3B8]">
                      <p>Apr 1, 2025</p>
                      <p className="text-[#4F46E5] font-semibold">
                        5 months - 153 days
                      </p>
                      <p>Apr 31, 2025</p>
                    </div>
                    <div className="bg-[linear-gradient(to_right,#4F46E5,#a83aed)] h-[10px] rounded-md"></div>
                  </div>
                </div>
              </div>

              <div>
                <TeamMembers/>
              </div>
            </div>

            <div className=" w-1/3 flex flex-col gap-4 h-auto ">
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
                  <label
                    htmlFor="Status"
                    className="text-[12px] mt-3 font-semibold text-[#64748B]"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    name="Status"
                    placeholder=""
                    className="border-2  text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="proTip h-auto p-4  outline outline-[#C7D2FE] rounded-md bg-[#EEF2FF]">
                <h1 className="font-semibold text-[#3730A3]">💡Pro Tips</h1>
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
      {/* <button onClick={()=>dispatch(logout())}>logout</button> */}
    </div>
  );
}
export default CreateProject;
