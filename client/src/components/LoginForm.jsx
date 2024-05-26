import React, { useState, useEffect, useContext } from 'react';
import Context from "../index";
import { observer } from "mobx-react-lite";

const LoginComp = () => {
  const { store } = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');


  return (
    <div>
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="Имя"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      />
      <input
        onChange={(e) => setRole(e.target.value)}
        value={role}
        type="text"
        placeholder="Роль"
      />
      <button onClick={() => store.logout()}>Выйти</button>
      <button onClick={() => store.login(username, password)}>Логин</button>
      <button onClick={() => store.registration(username, password, role)}>Регистрация</button>

    </div>
  );
};

export default observer(LoginComp);


/*import React, { useState, useEffect, useContext } from 'react';
import Context from "../../index";
import { observer } from "mobx-react-lite";
import LoginComp from "../../components/LoginForm";
import UserService from "../../services/UserService";

const LoginForm = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
          console.log(store.user.username)
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
  return (
    <div>
      <LoginComp/> 
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.username}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
            {users.map(user =>
                <div key={user.username}>{user.id} {user.username}</div>
            )}
        </div>
  );
};

export default observer(LoginForm);
*/