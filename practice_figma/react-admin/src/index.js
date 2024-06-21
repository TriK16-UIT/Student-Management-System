import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { StudentInfsContextProvider } from './context/StudentContext';
import { ClassContextProvider } from './context/ClassContext';
import { ClassMemberProvider } from './context/ClassMemberContext';
import { GradesContextProvider } from './context/GradeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <StudentInfsContextProvider>
    <ClassContextProvider>
      <ClassMemberProvider>
        <GradesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </GradesContextProvider>
      </ClassMemberProvider>
      </ClassContextProvider>
    </StudentInfsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

