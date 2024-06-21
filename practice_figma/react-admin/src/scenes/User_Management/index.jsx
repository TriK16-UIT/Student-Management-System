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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import CloseIcon from "@mui/icons-material/Close";
import MainDialog from "../Dialog/Main";
import { useAuthContext } from "../../hooks/useAuthContext";
import EditIcon from "@mui/icons-material/Edit";

const UserManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user, users, dispatch } = useAuthContext();  // Get users from context
  const [dialogState, setDialogState] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
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
          dispatch({ type: 'SET_USERS', payload: json });
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [user, dispatch]);

  const handleOpen = (state) => {
    setDialogState(state);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogState(null);
  };

  const handleDeleteUser = async () => {
    if (!user ) {
      return;
    }
      const response = await fetch(`http://localhost:4000/api/user/${selectedUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const json = await response.json();

      // If deletion is successful, update state (optional based on your implementation)
      dispatch({ type: 'DELETE_USER', payload: json });
  };

  // Ensure each user object has all required fields
  const rows = users ? users.map((user, index) => ({
    id: index + 1,
    _id: user._id,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
  })) : [];

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
      renderCell: ({ row }) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={() => {
              setSelectedUser(row);
            }}
            endIcon={<DeleteOutlineIcon />}
            sx={{
              backgroundColor: "#f44336",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Xóa
          </Button>
          <Button
              type="button"
              color="primary"
              variant="contained"
              endIcon={<EditIcon />}
              onClick={() => handleOpen("edit")}
              sx={{
                marginLeft: 1,
                backgroundColor: "#4CCEAC",
                "&:hover": {
                  backgroundColor: "#36917A",
                },
              }}
            >
              Chỉnh sửa
            </Button>
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
        <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[5, 10, 20]} />
      </Box>
    </Box>
  );
};

export default UserManage;
