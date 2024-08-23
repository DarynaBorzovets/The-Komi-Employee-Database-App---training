import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import TableActionBarComponent from './TableActionBarComponent';

function ListEmployeeComponent() {
  const [employees, setEmployees] = useState([]);

  const cellButtonStyle = "inline-block px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600";
  const tableCellStyle = "border border-gray-300 px-4 py-2";

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id).then(() => {
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    });
  };

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res);
    });
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl my-4">Employees List</h1>
      <div>
        <Link
          className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded transition duration-250 hover:bg-blue-600"
          to="/add-employee/_add"
        >
          Add Employee
        </Link>
      </div>
      <div className="mb-8">
        <TableActionBarComponent employees={employees} />
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className={tableCellStyle}>Employee First Name</th>
              <th className={tableCellStyle}>Employee Last Name</th>
              <th className={tableCellStyle}>Employee Email Id</th>
              <th className={tableCellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} role="listitem">
                <td className={tableCellStyle}>{employee.firstName}</td>
                <td className={tableCellStyle}>{employee.lastName}</td>
                <td className={tableCellStyle}>{employee.emailId}</td>
                <td className={tableCellStyle + " flex gap-2"}>
                  <Link
                    className={cellButtonStyle}
                    to={`/add-employee/${employee.emailId}`}
                  >
                    Update
                  </Link>
                  <button
                    className={cellButtonStyle + " bg-red-500 hover:bg-red-600"}
                    onClick={() => deleteEmployee(employee.emailId)}
                  >
                    Delete
                  </button>
                  <Link
                    className={cellButtonStyle}
                    to={`/view-employee/${employee.emailId}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListEmployeeComponent;
