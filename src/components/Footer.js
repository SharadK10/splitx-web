export default function Footer() {
  return (
    <div className="text-gray-500 py-4 w-full">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-0.5">
        <p className="leading-tight">Made with ❤️ by Sharad &amp; Bhaarat © 2025</p>
        <div className="flex items-center gap-2 opacity-60 mt-1">
          {/* SplitIn Logo */}
          <img src="/splitin-logo.svg" alt="splitin" className="h-5 inline" />

          {/* Cool Symbol */}
          <span className="text-gray-400 text-sm">🤝</span>

          {/* Liv2Code Logo */}
          <img src="/liv2code.svg" alt="liv2code" className="h-5 inline" />
        </div>
      </div>
    </div>
  );
}
