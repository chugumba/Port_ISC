import React, {useRef} from "react";
import { FaGithub } from "react-icons/fa";
import logoImage from '../img/logo.jpg'
import '../styles/footer.css';
import { Link } from "react-router-dom";
import { Button} from '@mantine/core';

const MainFooter = function () {

    const navRef = useRef();

    return (
    <footer className='main-footer'>
        <div className='footer-container'>

                <div className='footer-left'>
                    <Link to="/" className="footer-logo-action">
                        <img src={logoImage} alt='Logo' className="footer-logo"/>
                        <div className='footer-text'>
                            <span>Речной Порт</span>
                            <span>"Волга"</span>
                        </div>
                    </Link>
                </div>
                
                <div className="footer-mid">
                    <Button  variant="transparent" color="white" justify="left" fullWidth onClick={() => window.location.href = `tel:${"mpryanishnikov02@gmail.com"}`}>
                    <p> Наш телефон: +79999999999</p>
                    </Button>
                    <Button  variant="transparent" color="white" justify="left" fullWidth onClick={() => window.location.href = `mailto:${"mpryanishnikov02@gmail.com"}`}>
                    <p>Почта: mpryanishnikov02@gmail.com</p>
                    </Button>
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
    </footer>

    );
}

export default MainFooter;