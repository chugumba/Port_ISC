import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

function LogisticsPage() {
  const { store } = useContext(Context);

  return (
    <div>
      <h1>Logistics page</h1>
      <button onClick={() => store.logout()}>Выйти</button>
    </div>
  );
}

export default observer(LogisticsPage);

