import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
<<<<<<< HEAD

=======
import { UserContextProvider } from './context/UserContext';
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
import { StudentInfsContextProvider } from './context/StudentContext';
import { ClassContextProvider } from './context/ClassContext';
import { ClassMemberProvider } from './context/ClassMemberContext';
import { GradesContextProvider } from './context/GradeContext';
import { ConfigContextProvider } from './context/ConfigContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
<<<<<<< HEAD
      <UserContextProvider>
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
      </UserContextProvider>
=======
    <UserContextProvider>
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
    </UserContextProvider>
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
    </AuthContextProvider>
  </React.StrictMode>
);

