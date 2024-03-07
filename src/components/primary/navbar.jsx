import React from "react";

const Navbar = () => {
  return (
    <nav className="flex gap-4 bg-primary/50 shadow rounded-xl p-4 text-white justify-center">
      <span className="text-xl">LOGO</span>
    </nav>
  );
};

export default React.memo(Navbar);
