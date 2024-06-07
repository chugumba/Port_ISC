// НЕ СЕРЬЁЗНЫЕ ПРОБЛЕМЫ

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// КОРРЕКТНО переписать обращения к БД на сервере, используя pool (пример в logisticsController)

// Также все обращения в Services на клиенте также переписать под async

// Прибытие судна и контейнеров фиксируется разными функциями в разное время

// Прибывшие контейнеры могут выходить за пределы вместимости

// Нет восстановления пароля

// ВСЕ СТРАНИЦЫ ПОД АВТОРИЗАЦИЕЙ - ОСНОВНОЙ КОНТЕНТ ДОЛЖЕН БЫТЬ В ОДНОМ !!!!!! ДИВЕ

// Если пользователь с открытой страницей заходит под той же ролью и не выходит, то его не выкидывает (можно починить через uuid ???)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* План

  ГОТОВО

  Фиксируется прибытие судна -> одновременно записывается информация о контейнерах, которые были оставлены
  этим судном -> Это влечёт занятие места на платформах -> конец
  
  Управление площадкой для грузов -> берутся гридом все площадки (4) -> в зависимости от числа занятых мест, изменяется их цвет
  -> Отоброжается fill/capacity -> даётся возможность переместить определённое колличество грузов

  Убытие грузов -> Создаётся документ о убытии контейнеров -> Выбираются контейнеры для удаления -> 
  -> Соответствующие контейнеры удаляются -> бд освобождает место на площадках -> БД добавляет груз в таблицу 
  departed_containers

  Отчёт о прибытии судна -> Выбирается запись о прибытии судна, из таблиц containers и departed_containers выбираются все контейнеры с
  arr_id равным id прибытия, причём в зависимости от таблицы, пишется статус - в наличии/ушёл  -> вывод на печать

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
*/

//////// СТРУКТУРА БД ДЛЯ ЛОГИСТОВ ////////

//// Платформы для контейнеров ////

  // platforms:  

  // fill - текущее заполнение, обновляется при добавлении или удалении записи из containers, 
  // capacity - максимальное заполнение 
  
  // В триггерах - before insert и before update ограничивают fill 

//// Прибытия суден ////

  // ship_arrivals: 

  // id, - ключ для containers и departed_containers
  // name - название судна, 
  // flag - флаг, под которым пришло судно, 
  // port_of_dep - порт отправления,
  // crew - число членов экипажа, 
  // pier - причал прибытия (от 1 до 4), 
  // date - дата прибытия

//// Контейнеры на складе////

//containers:

// arr_id - ид, запрашиваемое из ship_arrivals - ВНЕШНИЙ КЛЮЧ
// plat_id - ид платформы, на которой стоит контейнер - ВНЕШНИЙ КЛЮЧ
// name - номер контейнера (4 латинские буквы и 7 цифр) - УНИКАЛЬНОЕ !!!
// desc - опциональное описание - содержимое/указания

// Триггеры добавляют и удаляют контейнеры с соответствующей платформы

//// Убывшие контейнеры ////

// departed_containers: 

// arr_id - ид, запрашиваемое из ship_arrivals - ВНЕШНИЙ КЛЮЧ
// plat_id - ид платформы, на которой стоит контейнер - ВНЕШНИЙ КЛЮЧ
// name - номер контейнера (4 латинские буквы и 7 цифр) - УНИКАЛЬНОЕ !!!
// name - номер контейнера (4 латинские буквы и 7 цифр) - УНИКАЛЬНОЕ !!!
// desc - опциональное описание - содержимое/указания
// given_to - Описание того, кому был отдан товар, можно указать любую информацию - ОБЯЗАТЕЛЬНОЕ


// ТЕКУЩЕЕ: Ждать ответа

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