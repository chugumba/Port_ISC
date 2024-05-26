import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { UsersTable } from '../../components/auth/admin/UsersTable';
import { observer } from "mobx-react-lite";

function AdminPage() {
  const { store } = useContext(Context);

  return (
    <div>
      <h1>Admin page</h1>
      <button onClick={() => store.logout()}>Выйти</button>

      <UsersTable/>
    </div>
  );
}

export default observer(AdminPage);

