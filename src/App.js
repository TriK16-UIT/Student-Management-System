import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import StuAdmission from "./scenes/Stu_Admission";
import ClaListEdit from "./scenes/Cla_List/ClaListEdit";
import ClaList from "./scenes/Cla_List/ClaList";
import CreClasList from "./scenes/Cla_List/CreClasList";
import StuSearch from "./scenes/Stu_Search";
import SubScores from "./scenes/Sub_Score";
import OutReport from "./scenes/Out_Report/OutReport";
import ReportSubject from "./scenes/Out_Report/ReportSubject";
import ReportSemester from "./scenes/Out_Report/ReportSemester";
import LoginPage from "./scenes/Login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

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
              <Route path="/" element={<Dashboard />} />
              <Route path="/student_admission" element={<StuAdmission />} />
              <Route path="/class_list" element={<ClaList />} />
              <Route path="/class_list/edit" element={<CreClasList />} />
              <Route path="/class_list/*" element={<ClaListEdit />} />
              <Route path="/student_look_up" element={<StuSearch />} />
              <Route path="/enter_subject_scores" element={<SubScores />} />
              <Route path="/summary_report" element={<OutReport />} />
              <Route path="/summary_report/subject" element={<ReportSubject />} />
              <Route path="/summary_report/semester" element={<ReportSemester />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
