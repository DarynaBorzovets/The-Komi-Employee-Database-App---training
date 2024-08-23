import React, { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function CreateEmployeeComponent() {
  const { id } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [navigateTo, setNavigateTo] = useState('');

  const inputGroupStyle = "flex mb-2 items-center gap-4";
  const inputStyle = "flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelStyle = "basis-[20%]";

  const handleChange = (setter) => {
    return (event) => {
      setter(event.target.value);
    };
  };

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };

    if (id === '_add') {
      EmployeeService.createEmployee(employee).then(() => {
        setNavigateTo('/employees');
      });
    } else {
      EmployeeService.updateEmployee(employee, id).then(() => {
        setNavigateTo('/employees');
      });
    }
  }

  const getTitle = () => {
    return id === '_add' ? 'Add Employee' : 'Update Employee';
  }

  useEffect(() => {
    if (id !== '_add') {
      EmployeeService.getEmployeeById(id).then((res) => {
        const employee = res;
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmailId(employee.emailId);
      });
    }
  }, [id]);

  if (navigateTo) {
    return <Navigate to={navigateTo} />;
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h1 className="text-center text-3xl my-4">{getTitle()}</h1>
            <div className="m-[15px]">
              <form>
                <div className={inputGroupStyle}>
                  <label className={labelStyle}>First Name:</label>
                  <input
                    className={inputStyle}
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange(setFirstName)}
                  />
                </div>
                <div className={inputGroupStyle}>
                  <label className={labelStyle}>Last Name:</label>
                  <input
                    className={inputStyle}
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange(setLastName)}
                  />
                </div>
                <div className={inputGroupStyle}>
                  <label className={labelStyle}>Email Id:</label>
                  <input
                    className={inputStyle}
                    placeholder="Email Address"
                    name="emailId"
                    value={emailId}
                    onChange={handleChange(setEmailId)}
                  />
                </div>

                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded transition duration-250 hover:bg-blue-600"
                  onClick={saveOrUpdateEmployee}
                >
                  Save
                </button>
                <Link
                  className="inline-block ml-2 px-4 py-2 bg-blue-500 text-white rounded transition duration-250 hover:bg-blue-600"
                  to="/employees"
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployeeComponent;
