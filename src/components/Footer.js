export default function Footer() {
  return (
    <div className="text-gray-500 py-4 w-full">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-0.5">
        <p className="leading-tight">Made with ❤️ by Sharad &amp; Bhaarat © 2025 SplitIn</p>
        <div className="flex items-center gap-1 leading-tight">
          {/* Innovative symbol */}
          <span className="text-yellow-500 text-lg">💡</span> 
          {/* Logo */}
          <img src="/liv2code.svg" alt="liv2code" className="h-5 inline" />
        </div>
      </div>
    </div>
  );
}
