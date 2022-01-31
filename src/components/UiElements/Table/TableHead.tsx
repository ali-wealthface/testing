import React from "react";
import "./Table.style.scss";

const TableHead: React.FC = ({ children }) => {
  return (
    <div className="assets-table">
      <table>{children}</table>
    </div>
  );
};

export default TableHead;
