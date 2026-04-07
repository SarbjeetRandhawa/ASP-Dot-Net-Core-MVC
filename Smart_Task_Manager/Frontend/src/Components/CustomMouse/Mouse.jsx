import { useState, useEffect } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  
  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  
  return mousePosition;
};

export default function App() {
  const mousePosition = useMousePosition();
  
  return (
    <div style={{ position: 'relative' }}>
      {/* Custom Cursor Element */}
      <div 
        className="custom-cursor" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          width: '20px',
          height: '20px',
          backgroundColor: 'invert(100%)',
          borderRadius: '50%',
          zIndex: 9999,
        }} 
      />
      
    </div>
  );
}   