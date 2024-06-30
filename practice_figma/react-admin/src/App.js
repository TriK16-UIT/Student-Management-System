import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import StuAdmission from "./scenes/Stu_Admission";
import ClaListEdit from "./scenes/Cla_List/ClaListEdit";
import ClaList from "./scenes/Cla_List/ClaList";
import StuSearch from "./scenes/Stu_Search";
import SubScores from "./scenes/Sub_Score";
import OutReport from "./scenes/Out_Report/OutReport";

import ReportSemester from "./scenes/Out_Report/ReportSemester";
import LoginPage from "./scenes/Login";
import UserManage from "./scenes/User_Management";
import { useAuthContext } from "./hooks/useAuthContext";
import ReportSubject from "./scenes/Out_Report/ReportSubject";
import SettingPage from "./scenes/Setting";
import Subjects from "./scenes/Subjects";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const { user } = useAuthContext()

  // Hide sidebar on login page
  const hideSidebar = location.pathname === '/login';
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!hideSidebar && <Sidebar isSidebar={isSidebar} />}
          <main className="content" style={{ flex: hideSidebar ? 1 : 'initial' }}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={user ? <Dashboard /> :  <Navigate to="/login" />} />
              <Route path="/student_admission" element={user ?<StuAdmission /> : <Navigate to="/login" />} />
              <Route path="/class_list" element={user ? <ClaList /> : <Navigate to="/login" />} />
              <Route path="/class_list/:id" element={user ? <ClaListEdit /> : <Navigate to="/login" />} />
              <Route path="/subjects" element={user ? <Subjects /> : <Navigate to="/login" />} />
              <Route path="/student_look_up" element={user ? <StuSearch /> : <Navigate to="/login" />} />
              <Route path="/enter_subject_scores" element={user ? <SubScores /> : <Navigate to="/login" />} />
              <Route path="/summary_report" element={user ? <OutReport /> : <Navigate to="/login" />} />
              <Route path="/summary_report/subject" element={user ?<ReportSubject /> : <Navigate to="/login" />} />
              <Route path="/summary_report/semester" element={user ? <ReportSemester /> : <Navigate to="/login" />} />
              <Route path="/users_management" element={user ? <UserManage /> : <Navigate to="/login" />} />
              <Route path="/settings" element={user ? <SettingPage /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
