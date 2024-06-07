import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

function FinancesPage() {
  const { store } = useContext(Context);

  return (
    <div>
      <h1>Finances page</h1>
      <button onClick={() => store.logout()}>Выйти</button>
    </div>
  );
}

export default observer(FinancesPage);

