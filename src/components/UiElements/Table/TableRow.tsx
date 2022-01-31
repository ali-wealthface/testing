import React, { ReactElement, ReactNode } from "react";

const TableRow: React.FC<{ rowData: Array<ReactNode | ReactElement> }> = ({
  rowData,
}) => {
  if (rowData.length === 0) return null;

  return (
    <tr>
      {rowData.map((td) => (
        <td>{td}</td>
      ))}
    </tr>
  );
};

export default TableRow;
