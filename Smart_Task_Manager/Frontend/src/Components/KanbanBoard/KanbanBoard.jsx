import React from "react";
import Sidebar from "../Sidebar";

function KanbanBoard() {
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
                // onClick={() => navigate("/Tasks/CreateTask")}
                className="border px-3 h-7 rounded-md text-[8px] md:text-[11px] font-bold bg-[#4F46E5] text-white"
              >
                + New Task
              </button>
              {/* )} */}
            </div>
          </div>

          <div className="p-4  flex gap-4">
            <div
              className="border-2 overflow-hidden rounded-lg 
                 border-t-[5px]   w-1/4 "
            >
              <div className="bg-white flex gap-2 items-center  p-4">
                <div>⬜</div>
                <h1 className="font-bold text-[13px]">Todo</h1>
                <div className="border w-5 flex items-center justify-center rounded-full text-[11px] font-bold h-5 bg-[#F1F5F9] text-[#64748B]">
                  4
                </div>
              </div>
              <div className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3">
                <div className=" px-3 ">
                  <div className="border border-l-[4px] border-[#F59E0B] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#FFFBEB] text-[#F59E0B]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>{" "}
                        Medium
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments {""}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#10B981] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#ECFDF5] text-[#10B981]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                        {""}
                        Low
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#10B981] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#ECFDF5] text-[#10B981]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                        {""}
                        Low
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#EF4444] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#FEF2F2] text-[#EF4444]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                        {""}
                        Low
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
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
                  3
                </div>
              </div>
              <div className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3">
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#F59E0B] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#FFFBEB] text-[#F59E0B]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>{" "}
                        Medium
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#10B981] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#ECFDF5] text-[#10B981]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                        {""}
                        Low
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
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
                  2
                </div>
              </div>
              <div className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3">
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#F59E0B] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#FFFBEB] text-[#F59E0B]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>{" "}
                        Medium
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
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
                  5
                </div>
              </div>
              <div className="overflow-scroll h-[78vh] pt-3 flex flex-col gap-3">
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#10B981] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#ECFDF5] text-[#10B981]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                        {""}
                        Low
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold text-[#94A3B8] line-through">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px] text-[#10B981]">
                        <span className="text-white">✅</span> Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#EF4444] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#FEF2F2] text-[#EF4444]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                        {""}
                        Low
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-3">
                  <div className="border border-l-[4px] border-[#10B981] p-4 rounded-lg bg-white">
                    <div className="flex gap-2 items-center">
                      <div className=" flex py-1 text-[10px] font-semibold items-center justify-center gap-1 px-2 rounded-full bg-[#ECFDF5] text-[#10B981]">
                        {" "}
                        <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                        {""}
                        Low
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">TF-041</p>
                    </div>
                    <div className=" py-2">
                      <h1 className="text-[14px] font-semibold">
                        Integrated Stripe payment gateway
                      </h1>
                      <p className="text-[12px] text-[#94A3B8]">
                        <span className="text-white">💬</span> 2 comments{" "}
                        <span className="text-white">📎</span> 8 files
                      </p>
                    </div>
                    <div className="border-t-2 flex justify-between items-center pt-2">
                      <p className="text-[11px]">
                        <span className="text-white">📅</span>Mar 20
                      </p>
                      <div className="w-5 h-5 flex items-center text-[10px] font-bold justify-center rounded-full border p-3">
                        SC
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KanbanBoard;
