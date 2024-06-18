import { useState } from "react";
import DialogSignUp from "../User/Add_User";
import TeacherSignUp from "../Teacher";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from '@mui/system';

const NavButton = styled(Button)(({ theme, active }) => ({
  margin: theme.spacing(1),
  color: active ? theme.palette.secondary.main : theme.palette.primary.contrastText,
  borderBottom: active ? `2px solid ${theme.palette.secondary.main}` : 'none',
}));

const MainDialog = () => {
  const [view, setView] = useState("teacher");

  return (
    <Container>
      <Box display="flex" justifyContent="center" my={2}>
        <NavButton
          active={view === "teacher" ? 1 : 0}
          onClick={() => setView("teacher")}
        >
          <Typography variant="h6">Giáo viên</Typography>
        </NavButton>
        <NavButton
          active={view === "admin" ? 1 : 0}
          onClick={() => setView("admin")}
        >
          <Typography variant="h6">Ban quản lý</Typography>
        </NavButton>
      </Box>
      <Box mt={3}>
        {view === "teacher" ? <TeacherSignUp /> : <DialogSignUp />}
      </Box>
    </Container>
  );
};

export default MainDialog;
