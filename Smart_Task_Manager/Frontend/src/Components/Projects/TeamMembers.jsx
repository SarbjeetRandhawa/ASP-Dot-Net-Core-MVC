import React from "react";

function TeamMembers({ members, setmembers }) {
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
          {members.length == 0 && <p className="text-center text-[12px] text-[#64748b8d] font-semibold ">No members added Yet</p>}

          {members.map((m) => {
            <div key={m.userId} className=" h-14  rounded-md flex bg-[#f8f8f8]">
              <div className=" w-1/2 flex items-center">
                <div className="px-4">
                  <h1 className=" p-2 rounded-full font-semibold text-white bg-[#1313bbcc] text-[11px]">
                    {m.FirstName?.charAt(0)}
                    {m.LastName?.charAt(0)}
                  </h1>
                </div>
                <div>
                  <h1 className="font-bold text-[13px]">{m.FirstName} {m.LastName}</h1>
                  <p className="text-[11px] mt-[-3px] font-semibold text-[#64748B] ">
                    {m.Email}
                  </p>
                </div>
              </div>
              <div className="w-1/2 flex items-center gap-4 p-4 justify-end">
                <select
                  name="projectRole"
                  className="rounded-md p-1 px-4 text-[13px] focus:outline focus:outline-[#1313bbcc] appearance-none  "
                >
                  <option value="Dev">Dev</option>
                  <option value="Backend">Backend</option>
                </select>
                <h2 className="rounded-2xl text-[10px] p-2 bg-[#F0FDF4] text-[#10B981] font-semibold">
                  {m.role}
                </h2>
                <div className="cursor-pointer">❌</div>
              </div>
            </div>;
          })}

        </div>
      </div>
    </>
  );
}

export default TeamMembers;
