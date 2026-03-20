import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";
import { useState, useEffect , useRef} from "react";

function TeamMembers({ members, setMembers }) {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.users);
  console.log(users);

  const [search, setsearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(()=>{
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setShowDropdown(false);
      }
      

      }
      document.addEventListener("mousedown",handleClickOutside);
      return () => {
      document.addEventListener("mousedown",handleClickOutside);
    }
  })

  const FilteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const addMember = (user) => {
    console.log("triggered");
    if (members.find((u) => u.userId === user.userId)) return;
    setMembers([...members, user]);
    setsearch("");
    setShowDropdown(false)
    console.log(members);
  };
  const removeMember = (userId) =>{
    setMembers((prev) => prev.filter((m)=>m.userId !== userId));
  };

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

        <div className="p-4 flex gap-2 w-full relative" ref={dropdownRef}>
          
          <span className="absolute left-7 top-6 ">🔍</span>
          
          <input
            type="text"
            ref={dropdownRef}
            value={search}
            onFocus={()=>setShowDropdown(true)}
            onChange={(e) => {setsearch(e.target.value), setShowDropdown(true)}}
            
            placeholder="Search team members by name or email..."
            className="border-2 w-4/6 md:w-5/6 px-10 text-[12px] p-2 font-semibold rounded-md  focus:border-blue-600 focus:outline-none"
          />
          <button
            className="border-2 w-2/6 md:w-1/6 text-[10px] px-3 rounded-md font-semibold"
            type="button"
          >
            + Add Members
          </button>

        {showDropdown && search && (
          <div className="absolute bg-white  w-4/5 top-16 border rounded-md max-h-60 overflow-y-auto z-10">
            {FilteredUsers.map((user) => (
              <div
                className="cursor-pointer border p-2 px-4 flex justify-between"
                key={user.userId}
                onClick={() => {
                  addMember(user);
                }}
              >
                <h1 className="font-bold">{user.firstName} {user.lastName}</h1>
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
            <div key={m.userId} className=" h-14  rounded-md flex bg-[#f8f8f8]">
              <div className=" w-1/2 flex items-center">
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
                <div className="cursor-pointer" onClick={()=> removeMember(m.userId)} >❌</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeamMembers;
