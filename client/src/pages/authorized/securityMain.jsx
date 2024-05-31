import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";

function SecurityPage() {
  const { store } = useContext(Context);

  return (
    <div>
      <h1>Security page</h1>
      <button onClick={() => store.logout()}>Выйти</button>
    </div>
  );
}

export default observer(SecurityPage);

