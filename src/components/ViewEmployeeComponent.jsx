import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function ViewEmployeeComponent() {
  const { id } = useParams();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    EmployeeService.getEmployeeById(id).then((result) => {
      setEmployee(result);
    });
  }, [id]);

  return (
    <div>
      <div className="card col-md-6 offset-md-3">
        <h1 className="text-center text-3xl my-4">View Employee Details</h1>
        <div className="text-lg">
          <div className="my-2">
            <div>
              <strong>Employee First Name: </strong>
            </div>
            <div>{employee.firstName}</div>
          </div>
          <div className="my-2">
            <div>
              <strong>Employee Last Name: </strong>
            </div>
            <div>{employee.lastName}</div>
          </div>
          <div className="my-2">
            <div>
              <strong>Employee Email ID: </strong>
            </div>
            <div>{employee.emailId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployeeComponent;
