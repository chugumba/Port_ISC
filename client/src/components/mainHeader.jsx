import React, {useRef, useContext} from "react";
import {FaBars, FaTimes} from 'react-icons/fa'
import { IoLogIn } from "react-icons/io5";
import logoImage from '../img/logo.jpg'
import '../styles/header.css';
import { Link, useNavigate } from "react-router-dom";
import {Context} from "../App";

const MainHeader = function () {

    const navRef = useRef();
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle('responsive-nav');
    }
    
    const handleLoginClick = () => {
        if (!store.user.role) {
          navigate("/login");
        } else {
          navigate(`/${store.user.role}`);
        }
      };

    return (
    <header className='main-header'>
        <div className='header-container'>

                <div className='header-left'>
                    <Link to="/" className="header-logo-action">
                        <img src={logoImage} alt='Logo' className="header-logo"/>
                        <div className='header-text'>
                            <span>Речной Порт</span>
                            <span>"Волга"</span>
                        </div>
                    </Link>
                </div>
                
                <div className="header-mid">
                    <nav className='main-nav' ref ={navRef}>
                        <ul className='main-nav-menu'>
                            <li className='main-header-item'><Link to="/about">О нас</Link></li>
                            <li className='main-header-item'><Link to="/clients">Клиентам</Link></li>
                            <li className='main-header-item'><Link to="/reg">Регулятивная информация</Link></li>
                            <li className='main-header-item'><Link to="/contacts">Контакты</Link></li>
                            <li className='main-header-item'><Link to="/vacancies">Вакансии</Link></li>
                            <li className='main-header-item'><Link to="/services">Услуги</Link></li>
                        </ul>
                    <button onClick={showNavbar} className="nav-button nav-close-button">
                        <FaTimes/>
                    </button>
                    </nav>
                </div>
                
                <div className="header-right">
                    
                    <button onClick={showNavbar} className="nav-button">
                        <FaBars/>
                    </button>
                    
                <button onClick={handleLoginClick} className="nav-button login-button">
                    <IoLogIn />
                </button>

                </div>
                
        </div>
    </header>

    );
}

export default MainHeader;