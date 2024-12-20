import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {UserProvider} from "./contex/userContex";
import { AuthProvider } from './contex/auth';
import {ClaimProvider} from "./contex/claimContex"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <UserProvider>
        <ClaimProvider>
          <App />
        </ClaimProvider>
      </UserProvider> 
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
