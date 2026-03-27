const AvatarGroup = ({ members = [] }) => {
  const visibleMembers = members.slice(0, 3);
  const remaining = members.length - 3;
  const colors = [
   "bg-[linear-gradient(to_bottom_right,#534545,#ff0000)]",
   "bg-[linear-gradient(to_bottom_right,#363434,#9d00ff)]",
   "bg-[linear-gradient(to_bottom_right,#363434,#00ff22)]",
   "bg-[linear-gradient(to_bottom_right,#363434,#eeff00)]",
   "bg-[linear-gradient(to_bottom_right,#363434,#ff00e6)]",
   "bg-[linear-gradient(to_bottom_right,#363434,#00ffff)]",
  ]
  return (
    <div className="flex items-center">

      {visibleMembers.map((m, index) => (
        <div
          key={m.userId}
          className={`w-8 h-8 rounded-full ${colors[index % colors.length]} text-white flex items-center justify-center text-sm font-bold border-2 border-white`}
          style={{
            marginLeft: index === 0 ? "0px" : "-10px",
            zIndex: 0 + index
          }}
        >
          {m.firstName?.[0]}{m.lastName?.[0]}
        </div>
      ))}

      {remaining > 0 && (
        <div
          className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-bold border-2 border-white"
          style={{
            marginLeft: "-10px",
            zIndex: 20
          }}
        >
          +{remaining}
        </div>
      )}

    </div>
  );
};

export default AvatarGroup;