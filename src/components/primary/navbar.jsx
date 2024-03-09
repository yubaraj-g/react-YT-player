import React from "react";

const Navbar = () => {
  return (
    <nav className="flex gap-4 bg-primary/30 shadow rounded-xl p-4 text-white justify-center">
      <span className="text-2xl font-black">
        Custom Video Player with Youtube Data API v3 & Rapid YT to Mp4 API
      </span>
    </nav>
  );
};

export default React.memo(Navbar);
