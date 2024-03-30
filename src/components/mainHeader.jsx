import React from "react";
import '../styles/header.css';

const MainHeader = function () {
    return (

    <header className="main-header">
      <nav className='main-nav'>
        <ul className='main-nav-menu'>
          <li className='main-header-item'><a href="#">О нас</a></li>
          <li className='main-header-item'><a href="#">Клиентам</a></li>
          <li className='main-header-item'><a href="#">Регулятивная информация</a></li>
          <li className='main-header-item'><a href="#">Контакты</a></li>
          <li className='main-header-item'><a href="#">Вакансии</a></li>
        </ul>
      </nav>
    </header>

    );
}

export default MainHeader;