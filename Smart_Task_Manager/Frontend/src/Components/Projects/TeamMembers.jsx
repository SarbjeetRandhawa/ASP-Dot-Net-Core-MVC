import React from "react";
import { ElDropdown } from "@tailwindplus/elements/react";

function TeamMembers() {
  return (
    <>
      <div className="Team-members mb-4 bg-white h-auto rounded-lg border-2">
        <div className="flex border-b-2 p-4">
          <div className="w-2/3">
            <h1 className="font-bold text-[14px]">Team Members</h1>
            <p className="text-[12px] font-semibold text-[#64748B] ">
              Add people who will work on this project
            </p>
          </div>
        </div>
{/* s */}
        <div className="p-4 flex gap-2 w-full relative">
          <span className="absolute left-7 top-6 ">🔍</span>
          <input
            type="text"
            name=""
            placeholder="Search team members by name or email..."
            className="border-2 w-4/6 md:w-5/6 px-10 text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
          />
          <button
            className="border-2 w-2/6 md:w-1/6 text-[10px] px-3 rounded-md font-semibold"
            type="button"
          >
            + Add Members
          </button>
        </div>

        <div className="members px-4 pb-4 flex flex-col gap-2">
          <div className=" h-14  rounded-md flex bg-[#f8f8f8]">
            <div className=" w-1/2 flex items-center">
              <div className="px-4">
                <h1 className=" p-2 rounded-full font-semibold text-white bg-[#1313bbcc] text-[11px]">
                  AK
                </h1>
              </div>
              <div>
                <h1 className="font-bold text-[13px]">Alex Kumar</h1>
                <p className="text-[11px] mt-[-3px] font-semibold text-[#64748B] ">
                  alex@taskflow.com
                </p>
              </div>
            </div>
            <div className="w-1/2 flex items-center">
              <el-ElDropdown class="inline-block">
                <button class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                  Options
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    data-slot="icon"
                    aria-hidden="true"
                    class="-mr-1 size-5 text-gray-400"
                  >
                    <path
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    />
                  </svg>
                </button>

                <el-menu
                  anchor="bottom end"
                  popover
                  class="w-56 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden"
                    >
                      Duplicate
                    </a>
                  </div>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden"
                    >
                      Archive
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden"
                    >
                      Move
                    </a>
                  </div>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden"
                    >
                      Share
                    </a>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden"
                    >
                      Add to favorites
                    </a>
                  </div>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden"
                    >
                      Delete
                    </a>
                  </div>
                </el-menu>
              </el-ElDropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamMembers;
