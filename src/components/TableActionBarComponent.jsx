import React, { useState } from "react";

function TableActionBarComponent(props) {
  const [employees, setEmployees] = useState(props.employees);

  const buttonStyle = "bg-white border border-gray-300 px-2 py-1 rounded transition-all hover:bg-blue-600 hover:text-white";

  const sortAscending = () => {
    const sortedEmployees = [...employees].sort((a, b) => {
      return a.firstName.localeCompare(b.firstName);
    });
    setEmployees(sortedEmployees);
  };

  const sortDescending = () => {
    const sortedEmployees = [...employees].sort((a, b) => {
      return b.firstName.localeCompare(a.firstName);
    });
    setEmployees(sortedEmployees);
  };

  return (
    <div className="bg-gray-100 flex items-center gap-2 px-4 py-2 mb-4 rounded">
      <span>Sort by</span>
      <button className={buttonStyle} onClick={sortAscending}>A-Z</button>
      <button className={buttonStyle} onClick={sortDescending}>Z-A</button>
    </div>
  );
}

export default TableActionBarComponent;
