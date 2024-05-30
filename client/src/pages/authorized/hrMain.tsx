import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { UsersTable } from '../../components/auth/admin/UsersTable';
import { observer } from "mobx-react-lite";

function AdminPage() {
  const { store } = useContext(Context);

  return (
    <div>
      <h1>HR page</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      {/*Заготовка для таблицы управления пользователями*/}
      <UsersTable/>
    </div>
  );
}

export default observer(AdminPage);

