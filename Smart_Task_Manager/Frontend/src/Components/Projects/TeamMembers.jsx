import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";
import { useState, useEffect, useRef } from "react";
import { fetchProjectRoles } from "../../features/project/projectRoleSlice";

function TeamMembers({ members, setMembers }) {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.users);
  const { roles = [] } = useSelector((state) => state.projectRoles);
  const currentUser = useSelector((state) => state.auth.user);

  console.log(currentUser);
  console.log(users);

  const [search, setsearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjectRoles());
  },[]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const roleAccess = {
    Admin: ["Admin", "Manager", "Employee"],
    Manager: ["Manager", "Employee"],
  };

  const FilteredUsers = users.filter((user) => {
    const isNotMe = user.userId !== currentUser?.id;

    const notAlreadySelected = !members.some((m) => m.userId === user.id);

    const allowedRoles = roleAccess[currentUser?.role] || [];
    const roleAllowed = allowedRoles.includes(user.role);

    // 🔥 APPLY SEARCH ONLY IF USER TYPES
    const matchesSearch = search
      ? `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      : true;

    return isNotMe && notAlreadySelected && roleAllowed && matchesSearch;
  });

  const addMember = (user) => {
    console.log("triggered");
    if (members.find((u) => u.userId === user.userId)) return;
    setMembers([...members, user]);
    setsearch("");
    setShowDropdown(false);
    console.log(members);
  };
  const removeMember = (userId) => {
    setMembers((prev) => prev.filter((m) => m.userId !== userId));
  };

  const handleChange = (userId, roleId) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.userId === userId ? { ...m, ProjectRoleId: roleId } : m,
      ),
    );
  };
  console.log(members);

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

        <div
          className="p-4 flex flex-col md:flex-row gap-2 w-full relative"
          ref={dropdownRef}
        >
          <span className="absolute left-7 top-6 ">🔍</span>

          <input
            type="text"
            ref={dropdownRef}
            value={search}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => {
              (setsearch(e.target.value), setShowDropdown(true));
            }}
            placeholder="Search team members by name or email..."
            className="border-2 w-full md:w-5/6 px-10 text-[12px] p-2 font-semibold rounded-md focus:border-blue-600 focus:outline-none"
          />

          <button
            type="button"
            className="border-2 w-full md:w-1/6 text-[10px] px-3 rounded-md font-semibold"
            onClick={() => {
              (setsearch(""), setShowDropdown(true));
            }}
          >
            + Add Members
          </button>

          {showDropdown && (
            <div className="absolute bg-white w-11/12 md:w-4/5 top-16 border rounded-md max-h-60 overflow-y-auto z-10">
              {FilteredUsers.map((user) => (
                <div
                  className="cursor-pointer border p-2 px-4 flex justify-between"
                  key={user.userId}
                  onClick={() => {
                    addMember(user);
                  }}
                >
                  <h1 className="font-bold">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-[#8b8a8a]">{user.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="members px-4 pb-4 flex flex-col gap-2">
          {members.length == 0 && (
            <p className="text-center text-[12px] text-[#64748b8d] font-semibold ">
              No members added Yet
            </p>
          )}

          {members.map((m) => (
            <div
              key={m.userId}
              className="min-h-[56px] rounded-md flex flex-col md:flex-row bg-[#f8f8f8]"
            >
              <div className="w-full md:w-1/2 flex items-center">
                <div className="px-4">
                  <h1 className=" p-2 rounded-full font-semibold text-white bg-[#1313bbcc] text-[11px]">
                    {m.firstName?.charAt(0)}
                    {m.lastName?.charAt(0)}
                  </h1>
                </div>
                <div>
                  <h1 className="font-bold text-[13px]">
                    {m.firstName} {m.lastName}
                  </h1>
                  <p className="text-[11px] mt-[-3px] font-semibold text-[#64748B] ">
                    {m.email}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-wrap items-center gap-2 md:gap-4 p-2 md:p-4 justify-between md:justify-end">
                <select
                  name="projectRole"
                  value={m.ProjectRoleId || ""}
                  
                  onChange={(e) => {
                    handleChange(m.userId, Number(e.target.value));
                  }}
                  className="rounded-md p-1 px-4 text-[13px] focus:outline focus:outline-[#1313bbcc] appearance-none  "
                >
                  <option value="" disabled hidden>Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <h2 className="rounded-2xl text-[10px] p-2 bg-[#F0FDF4] text-[#10B981] font-semibold">
                  {m.role}
                </h2>
                <div
                  className="cursor-pointer"
                  onClick={() => removeMember(m.userId)}
                >
                  ❌
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeamMembers;
