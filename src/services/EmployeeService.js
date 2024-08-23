/**
 * This is an in-memory data storage, to simulate a database.
 * 
  * Employee model:
 *  - firstName
 *  - lastName
 *  - emailId
 *  - id
 **/
class EmployeeService {

    employeeDataBase = [];

    getEmployees() {
        return Promise.resolve(this.employeeDataBase);
    }

    createEmployee(employee) {
        employee.id = this.employeeDataBase.length;
        this.employeeDataBase.push(employee)
        return Promise.resolve();
    }

    getEmployeeById(employeeId) {
         const record = this.employeeDataBase.find((el)=>el.emailId === employeeId);
        return Promise.resolve(record)
    }

    updateEmployee(employee, employeeId) {
        const recordIndex = this.employeeDataBase.findIndex((el)=>el.emailId === employeeId);
        employee.id = recordIndex;
        this.employeeDataBase[recordIndex] = employee;
        return Promise.resolve();
    }

    deleteEmployee(employeeId) {
        const recordIndex = this.employeeDataBase.findIndex((el)=>el.emailId === employeeId);
        this.employeeDataBase.splice(recordIndex, 1)
        return Promise.resolve();
    }
}

const employeeService = new EmployeeService();
export default employeeService;
