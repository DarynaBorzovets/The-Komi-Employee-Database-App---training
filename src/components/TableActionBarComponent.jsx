import React from 'react';

function TableActionBarComponent({ onSortAsc, onSortDesc }) {
  const buttonStyle = "bg-white border border-gray-300 px-2 py-1 rounded transition-all hover:bg-blue-600 hover:text-white";

  return (
    <div className="bg-gray-100 flex items-center gap-2 px-4 py-2 mb-4 rounded">
      <span>Sort by</span>
      <button className={buttonStyle} onClick={onSortAsc}>A-Z</button>
      <button className={buttonStyle} onClick={onSortDesc}>Z-A</button>
    </div>
  );
}

export default TableActionBarComponent;
