import React from "react";

import "./Container.style.css";

const Container = ({ children, isDark }) => {
  return <div className="container">{children}</div>;
};

export default Container;
