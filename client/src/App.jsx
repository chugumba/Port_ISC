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

// Главные для авторизованных пользователей
import AdminPage from './pages/authorized/adminMain';
import FinancesPage from './pages/authorized/financesMain';

//HR
import HrPage from './pages/authorized/hrMain';

//Logistics
import LogisticsPage from './pages/authorized/logisticsMain';
import PlatformsPage from './pages/authorized/logisticsPlatforms';
import DeparturePage from './pages/authorized/logisticsDeparture';
import DocumentsPage from './pages/authorized/documents'

import SecurityPage from './pages/authorized/securityMain';
import HrApplications from './pages/authorized/hrApplications';

//

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

            {/* Пути для неавторизованных пользователй */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/reg" element={<RegPage />} />
            <Route path='/contacts' element={<ContactsPage/>}/>
            <Route path='/vacancies' element={<VacanciesPage/>}/>
            <Route path='/services' element={<ServicesPage/>}/>

            {/* Пути для авторизации */}
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/login/forgot' element={<ForgotPassword/>}/>

            {/* Пути для авторизованных пользователй */}
            <Route path='/admin' element={store.user.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
            
            {/**/}
            
            <Route path='/security' element={store.user.role === 'security' ? <SecurityPage /> : <Navigate to="/login" />} />
            <Route path='/finances' element={store.user.role === 'finances' ? <FinancesPage /> : <Navigate to="/login" />} />
            
            {/**/}
            
            {/*hr*/}
            <Route path='/hr' element={store.user.role === 'hr' ? <HrPage /> : <Navigate to="/login" />} />
            <Route path='/hr/applications' element={store.user.role === 'hr' ? <HrApplications /> : <Navigate to="/login" />} />

            {/*Логистика*/}
            <Route path='/logistics' element={store.user.role === 'logistics' ? <LogisticsPage /> : <Navigate to="/login" />} />
            <Route path='/logistics/departure' element={store.user.role === 'logistics' ? <DeparturePage /> : <Navigate to="/login" />} />
            <Route path='/logistics/platforms' element={store.user.role === 'logistics' ? <PlatformsPage /> : <Navigate to="/login" />} />
            <Route path='/logistics/documents' element={store.user.role === 'logistics' ? <DocumentsPage /> : <Navigate to="/login" />} />
            
          </Routes>
        </Router>
      </div>
      
    </Context.Provider>
  );
});

export default App;