import React from "react";

export default function Loader() {
  const elements = ["💰", "💵"];

  return (
    <div className="relative w-full h-96 flex justify-center items-center overflow-hidden">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(30px) scale(0.8); opacity: 0; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
          100% { transform: translateY(-50px) scale(1); opacity: 0; }
        }
      `}</style>

      {elements.map((el, idx) => (
        <span
          key={idx}
          className="absolute text-4xl"
          style={{
            animation: `floatUp 1.5s ease-in-out ${idx * 0.75}s infinite`,
          }}
        >
          {el}
        </span>
      ))}
    </div>
  );
}
