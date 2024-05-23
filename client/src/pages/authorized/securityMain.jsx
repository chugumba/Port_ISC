import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";

function AdminPage() {
  const { store } = useContext(Context);

  return (
    <div>
      <h1>Secutity page</h1>
      <button onClick={() => store.logout()}>Выйти</button>
    </div>
  );
}

export default observer(AdminPage);

