import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import PopUp from './utils/popup';
import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* <PopUp>Hello pop</PopUp> */}
        <App>{/* <PopUp>Hello pop</PopUp>; */}</App>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
