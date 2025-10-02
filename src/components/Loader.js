import React from "react";

export default function Loader() {
  return (
    <div className="relative w-full h-96 flex justify-center items-center overflow-hidden">
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(1); }
        }
      `}</style>

      <img
        src="/liv2code.svg"
        alt="liv2code"
        className="h-24 w-24"
        style={{
          animation: "fadeInOut 2.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}
