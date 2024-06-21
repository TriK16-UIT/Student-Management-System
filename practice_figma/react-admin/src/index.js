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
import { ConfigContextProvider } from './context/ConfigContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <StudentInfsContextProvider>
    <ClassContextProvider>
      <ClassMemberProvider>
        <GradesContextProvider>
          <ConfigContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ConfigContextProvider>
      </GradesContextProvider>
      </ClassMemberProvider>
      </ClassContextProvider>
    </StudentInfsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

