import React, {useRef, useContext} from "react";
import {FaBars, FaTimes} from 'react-icons/fa'
import { IoLogIn } from "react-icons/io5";
import logoImage from '../../img/logo.jpg'
import '../../styles/header.css';
import { Link, useNavigate } from "react-router-dom";
import {Context} from "../../App";

const AuthHeader = ({ navItems }) => {
    const navRef = useRef();
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle('responsive-nav');
    }
    
    const handleLoginClick = () => {

        store.logout();
        navigate("/login");
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
                    <nav className='main-nav' ref={navRef}>
                        <ul className='main-nav-menu'>
                            {navItems === null ? 0:navItems.map((item, index) => (
                                <li key={index} className='main-header-item'>
                                    <Link to={item.link}>{item.label}</Link>
                                </li>
                            ))}
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

export default AuthHeader;
