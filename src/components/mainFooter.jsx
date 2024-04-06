import React, {useRef} from "react";
import { FaGithub } from "react-icons/fa";
import logoImage from '../img/logo.jpg'
import '../styles/footer.css';

const MainFooter = function () {

    const navRef = useRef();

    return (
    <header className='main-footer'>
        <div className='footer-container'>

                <div className='footer-left'>
                    <a href="#" className="footer-logo-action">
                    <img src={logoImage} alt='Logo' className="footer-logo"/>
                    <div className='footer-text'>
                        <span>Речной Порт</span>
                        <span>"Волга"</span>
                    </div>
                    </a>
                </div>
                
                <div className="footer-mid">
                    <p> Наш телефон: +79999999999</p>
                    <p>Почта: mpryanishnikov02@gmail.com</p>
                    <p style={{color: '#9a9a9a'}}>
                        Данный является выпускной работой и
                        не предоставляет коммерческих услуг.
                    </p>
                </div>
                
                <div className="footer-right">
                    <a href="https://github.com/chugumba" target="_blank" rel="noopener noreferrer">
                        <button className="git-button">
                            <FaGithub />
                        </button>

                    </a>
                </div>   
        </div>
    </header>

    );
}

export default MainFooter;