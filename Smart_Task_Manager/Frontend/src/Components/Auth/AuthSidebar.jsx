
function AuthSidebar() {
  return (
    <div className="auth-sidebar" class="w-1/3 h-screen bg-[linear-gradient(to_bottom_right,#1E1B4B,#312E81,#4338CA,#06B6D4)] p-8 justify-between flex flex-col">
        <div class="flex">
          <div class="bg-[#FFFFFF26] p-1.5 w-10 h-10 rounded-[30%] text-[120%]">⚡</div>
          <div>
            <h1 class="text-[white] font-bold text-[1.1rem] pl-2">TaskFlow</h1>
            <p class="text-[#FFFFFF80] text-[0.8rem] pl-2 mt-[-5px]">Smart Task Management</p>
          </div>
        </div>
        <div class="text-[white] font-bold text-[2.2rem] ">
          <h1 class="leading-9">Manage tasks, <br/> <span class="text-[#67E8F9]"> boost productivity. </span></h1>
          <p class="text-[1rem] font-normal text-[#FFFFFFA6] mt-5" >A powerful platform to manage projects, assign tasks, track progress, and collaborate with your team span <br/>— all in one place. </p>
        </div>

        <div class="text-[#FFFFFF] text-[.8rem] ">
          <div class="flex items-center gap-3 mb-2 border-b border-[#FFFFFF26] pb-2">
            <div class="p-1.5 bg-[#FFFFFF26] rounded-full ">📊</div>
            <p>Real-time dashboard & analytics</p>
          </div>
          <div class="flex items-center gap-3 mb-2 border-b border-[#FFFFFF26] pb-2">
            <div class="p-1.5 bg-[#FFFFFF26] rounded-full">🎯</div>
            <p>Smart task assignment & tracking</p>
          </div>
          <div class="flex items-center gap-3 mb-2 border-b border-[#FFFFFF26] pb-2" >
            <div class="p-1.5 bg-[#FFFFFF26] rounded-full">💬</div>
            <p>Collaborative comments & activity log</p>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <div class="p-1.5 bg-[#FFFFFF26] rounded-full">📋</div>
            <p>Kanban board with drag & drop</p>
          </div>
        </div>


    </div>
  );   
}
export default AuthSidebar