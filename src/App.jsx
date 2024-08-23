import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container mx-auto">
          <Routes>
            <Route index Component={ListEmployeeComponent} />
            <Route path="/employees" Component={ListEmployeeComponent} />
            <Route path="/add-employee/:id" Component={CreateEmployeeComponent} />
            <Route path="/view-employee/:id" Component={ViewEmployeeComponent} />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
