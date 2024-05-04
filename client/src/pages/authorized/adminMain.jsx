import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";

function AdminPage() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => { store.getUser() }, []);

  return (
    <div>
      <h1>Admin page</h1>
    </div>
  );
}

export default observer(AdminPage);