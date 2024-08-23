import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListEmployeeComponent from '../src/components/ListEmployeeComponent';
import TableActionBarComponent from '../src/components/TableActionBarComponent';
import EmployeeService from "../src/services/EmployeeService";

function getFirstNamesInTable() {
  const tableData = screen.getAllByRole('cell')
    .filter((_cell, index) => {
      return index % 4 === 0; // only first column
    })
    .map((cell) => {
      return cell.textContent;
    });
  return tableData;
}

test('UPDATE_PARENT_STATE', async () => {
  const employees = [
    {
      firstName: 'John',
      lastName: 'Doe',
      emailId: 'johndoe@example.com',
    },
    {
      firstName: 'Foo',
      lastName: 'Bar',
      emailId: 'foobar@example.com',
    },
    {
      firstName: 'Zoe',
      lastName: 'Smith',
      emailId: 'zoesmith@example.com',
    }
  ];
  const employeeNames = employees.map((employee) => {
    return employee.firstName;
  });
  const expectedAscending = [...employeeNames].sort();
  const expectedDescending = [...employeeNames].sort().reverse();

  for (let item of employees) {
    await EmployeeService.createEmployee(item);
  }

  render(
    <MemoryRouter>
      <ListEmployeeComponent />
    </MemoryRouter>
  );

  expect(screen.getAllByText('A-Z').length).toBe(1);
  expect(screen.getAllByText('Z-A').length).toBe(1);

  await waitFor(() => { // wait for content to be loaded
    screen.getByText('John');
  });

  let tableData = getFirstNamesInTable();
  expect(tableData).toEqual(employeeNames);

  act(() => {
    screen.getByText('A-Z').click();
  });
  tableData = getFirstNamesInTable();
  await waitFor(() => {
    expect(tableData).toEqual(expectedAscending);
  });

  act(() => {
    screen.getByText('Z-A').click();
  });
  tableData = getFirstNamesInTable();
  await waitFor(() => {
    expect(tableData).toEqual(expectedDescending);
  });
});

test('HAS_BUTTON_IN_CHILD', async () => {
  render(<TableActionBarComponent />);
  expect(screen.getAllByText('A-Z').length).toBe(1);
  expect(screen.getAllByText('Z-A').length).toBe(1);
});

test('USE_CHILD_COMPONENT', async () => {
  const childComponentPath = '../src/components/TableActionBarComponent';

  jest.isolateModules(() => {
    jest.mock("react", () => {
      const ActualReact = jest.requireActual("react");
      return {
        ...ActualReact,
        useContext: jest.fn(() => {
          return {
            setEmployees: jest.fn(),
          };
        }),
        useEffect: jest.fn(),
        useState: jest.fn(() => [[], jest.fn()]),
      };
    });
    jest.mock("react-router-dom", () => {
      const ActualReactRouterDom = jest.requireActual("react-router-dom");
      return {
        ...ActualReactRouterDom,
        Link: jest.fn(() => {
          return <></>;
        }),
      };
    });
    jest.mock(childComponentPath, () => {
      return {
        __esModule: true,
        default: jest.fn(() => {
          return <div data-testid='TableActionBarComponent'></div>
        }),
      }
    });

    const ListEmployeeComponent = require('../src/components/ListEmployeeComponent').default;
    render(
      <MemoryRouter>
        <ListEmployeeComponent />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('TableActionBarComponent').length).toBe(1);

    jest.dontMock(childComponentPath);
  });
});
