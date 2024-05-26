import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


import HomePage from './pages/home';
import AboutPage from './pages/about';
import ClientsPage from './pages/clients';
import RegPage from './pages/regInfo';
import ContactsPage from './pages/contacts';
import VacanciesPage from './pages/vacancies';
import ServicesPage from './pages/services';
import LoginPage from './pages/login/login';
import ForgotPassword from './pages/login/forgotPass';
import AdminPage from './pages/authorized/adminMain';
import SecurityPage from './pages/authorized/securityMain';

/*Возможно стоит добавить номер телефона для пользователей в БД*/ 

import Store from "./store/store";
import { observer } from "mobx-react-lite";

const store = new Store();
export const Context = React.createContext({ store });

const App = observer(() => {


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndSetIsLoading = async () => {
      if (localStorage.getItem('token')) {
        await store.checkAuth();
      }
      setIsLoading(false);
    };

    checkAuthAndSetIsLoading();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Context.Provider value={{ store }}>
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
            
            <Route path='/admin' element={store.user.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path='/security' element={store.user.role === 'security' ? <SecurityPage /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </Context.Provider>
  );
});

export default App;