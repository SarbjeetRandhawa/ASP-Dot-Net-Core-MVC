import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointer = () => setIsPointer(true);
    const handleDefault = () => setIsPointer(false);

    window.addEventListener("mousemove", move);

    document.querySelectorAll("button, a, .cursor-pointer").forEach(el => {
      el.addEventListener("mouseenter", handlePointer);
      el.addEventListener("mouseleave", handleDefault);
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-150
        ${isPointer ? "scale-150 bg-black" : "scale-100 bg-gray-500"}
      `}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
      }}
    />
  );
}