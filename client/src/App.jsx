import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import ClientsPage from './pages/clients';
import RegPage from './pages/regInfo';
import ContactsPage from './pages/contacts';
import VacanciesPage from './pages/vacancies';
import ServicesPage from './pages/services';
import TestPage from './pages/login/test';
import LoginPage from './pages/login/login';
import ForgotPassword from './pages/login/forgotPass';
import AdminPage from './pages/login/admin';

function App() {

  return (

<div className="App">
  <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/reg" element={<RegPage />} />
          <Route path='/contacts' element={<ContactsPage/>}/>
          <Route path='/vacancies' element={<VacanciesPage/>}/>
          <Route path='/services' element={<ServicesPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/login/forgot' element={<ForgotPassword/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/test' element={<TestPage/>}/>
        </Routes>
  </Router>
</div>
  );
}

export default App;
