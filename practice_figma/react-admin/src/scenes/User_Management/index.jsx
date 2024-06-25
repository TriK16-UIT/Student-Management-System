import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import CloseIcon from "@mui/icons-material/Close";
import MainDialog from "../Dialog/Main";
<<<<<<< HEAD

=======
import { useAuthContext } from "../../hooks/useAuthContext";
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
import { useUserContext } from "../../hooks/useUserContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteUser from "./Delete_User";
import EditUser from "../Dialog/User/Edit_User/Edit_User";
import EditTeacher from "../Dialog/User/Edit_Teacher/Edit_Teacher";
<<<<<<< HEAD
import Edit from "@mui/icons-material/Edit";
import { useAuthContext } from "../../context/AuthContext";
=======
import { useSignup } from "../../hooks/useSignup";
import Edit from "@mui/icons-material/Edit";
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7

const UserManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
<<<<<<< HEAD
  const { users, dispatch } = useUserContext();
=======
  const { signup } = useSignup();
  const { userinfs, dispatch } = useUserContext();
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
  const [dialogState, setDialogState] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

<<<<<<< HEAD
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4000/api/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const json = await response.json();
      dispatch({ type: "SET_USERS", payload: json });
    }
  
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 1000);
  
    // Clean up the timeout if the component unmounts or the dependencies change
    return () => clearTimeout(timeoutId);
  }, [dispatch, user.token]); // Added user.token to dependency array
    
=======
  const fetchUsers = async () => {
    if (user && user.token) {
      try {
        const response = await fetch("http://localhost:4000/api/user/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const json = await response.json();
        dispatch({ type: "SET_USERS", payload: json });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
  const handleOpen = (state) => {
    setDialogState(state);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogState(null);
  };

<<<<<<< HEAD
  const RowUsers= users ? users.map((user, index) => ({
=======
  const rows = userinfs
    ? userinfs.map((user, index) => ({
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
        id: index + 1,
        _id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
<<<<<<< HEAD
      })): [];
=======
      }))
    : [];
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7

  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "fullName",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Mức độ truy cập",
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={
            row.role === "admin" ? colors.purpleAccent[600] : colors.purpleAccent[700]
          }
          borderRadius="4px"
        >
          {row.role === "admin" ? <VerifiedUserIcon /> : <GppBadIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {row.role === "admin" ? "Ban quản lý" : "Giáo viên"}
          </Typography>
        </Box>
      ),
    },
    {
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          <DeleteUser params={params} />
          {params.row.role === "teacher" ? (
            <EditTeacher params={params} />
          ) : (
            <EditUser params={params} />
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px" mb="20px">
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            backgroundColor: colors.purpleAccent[500],
          }}
        >
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon style={{ color: colors.primary[500] }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.grey[700],
          }}
        >
          <Stack spacing={2} margin={2}>
            <MainDialog />
          </Stack>
        </DialogContent>
      </Dialog>
      <Header title="Quản lý người dùng" subtitle="Users Management" />

      <Box display="flex" justifyContent="space-between" mb="20px">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpen("add")}
        >
          Thêm người dùng
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            // color: colors.redAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.purpleAccent[500],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.purpleAccent[500],
          },
        }}
      >
        <DataGrid rows={RowUsers} columns={columns} rowsPerPageOptions={[5, 10, 20]} />
      </Box>
    </Box>
  );
};

export default UserManage;
