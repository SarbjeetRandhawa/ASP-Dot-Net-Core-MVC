import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setIsHover(true);
    const removeHover = () => setIsHover(false);

    window.addEventListener("mousemove", move);

    const elements = document.querySelectorAll(
      "button, a, .cursor-pointer"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
      }}
    >
      <div
        className={`rounded-full border 
        ${isHover ? "w-10 h-10" : "w-4 h-4"}
        border-white mix-blend-difference transition-all duration-200`}
      />
    </div>
  );
}