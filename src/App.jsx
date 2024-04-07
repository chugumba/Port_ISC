import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import ClientsPage from './pages/clients';
import RegPage from './pages/regInfo';
import ContactsPage from './pages/contacts';
import VacanciesPage from './pages/vacancies';
import ServicesPage from './pages/services';
import AdminPage from './pages/login/admin';

import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import SuperTokens, { SuperTokensWrapper} from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: "port_isc",
        apiDomain: "http://localhost:8080",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/login",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
});

function App() {

  return (

<div className="App">
<SuperTokensWrapper>
  <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/reg" element={<RegPage />} />
          <Route path='/contacts' element={<ContactsPage/>}/>
          <Route path='/vacancies' element={<VacanciesPage/>}/>
          <Route path='/services' element={<ServicesPage/>}/>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [EmailPasswordPreBuiltUI])}
          
          <Route path='/admin' element={<AdminPage/>}/>

        </Routes>
  </Router>
  </SuperTokensWrapper>
</div>
  );
}

export default App;
