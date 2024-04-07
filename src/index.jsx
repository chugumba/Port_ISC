import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import App from './App';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <App/>
  </MantineProvider>
);