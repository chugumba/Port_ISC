import React from "react";
import '../styles/header.css';
import logoImage from '../img/logo.jpg'

const MainHeader = function () {
    return (

    <header className='main-header'>
        <div className='header-container'>
                <div className='header-left'>
                    <a href="#" className="header-logo-action">
                    <img src={logoImage} alt='Logo' className="header-logo"/>
                    <div className='header-text'>
                        <span>Речной Порт</span>
                        <span>"Волга"</span>
                    </div>
                    </a>
                </div>
                <nav className='main-nav'>
                    <ul className='main-nav-menu'>
                        <li className='main-header-item'><a href="#">О нас</a></li>
                        <li className='main-header-item'><a href="#">Клиентам</a></li>
                        <li className='main-header-item'><a href="#">Регулятивная информация</a></li>
                        <li className='main-header-item'><a href="#">Контакты</a></li>
                        <li className='main-header-item'><a href="#">Вакансии</a></li>
                    </ul>
                </nav>
        </div>
    </header>

    );
}

export default MainHeader;