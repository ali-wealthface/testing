import React from "react";
import "./Container.style.scss";

const Container: React.FC = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
