import React from "react";

const Header = ({ title, children }) => (
  <header>
    <h2>{title}</h2>
    {children}
  </header>
);

export default Header;
