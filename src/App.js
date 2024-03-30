import React, {useState} from 'react'
import './styles/main.css';
function App() {

  return (
<div className="App">
    <header className="main-header" style={{ backgroundColor: 'lightblue', color: 'white', padding: '20px' }}>
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
    <main>
      
    </main>
  </div>
  );
}

export default App;
