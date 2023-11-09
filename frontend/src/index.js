import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//for context 
import { WorkoutContextProvider } from './Context/WorkoutContext';
import { AuthenticationContextProvider } from './Context/AuthenticationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
