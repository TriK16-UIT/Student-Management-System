import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import CloseIcon from "@mui/icons-material/Close";
import { useClassContext } from "../../hooks/useClassContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import DialogAddClass from "../Dialog/Class/Add_class";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import  DeleteClass  from "../Cla_List/Delete_Class"

const ClaList = () => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { classes, dispatch } = useClassContext();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        if (user && user.token) {
          const response = await fetch("http://localhost:4000/api/class/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch classes");
          }
          const data = await response.json();
          dispatch({ type: "SET_CLASSES", payload: data });
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        // Handle error here, such as displaying an error message or logging out the user
      }
    };

    if (user) {
      fetchClasses();
    }
  }, [dispatch, user]);

  const handleEditClick = (id) => {
    navigate(`/class_list/${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log(`Deleting class with id: ${id}`);
    // Implement delete logic here
  };

  const rows = classes
    ? classes.map((cls, index) => ({
        id: index + 1,
        _id: cls._id,
        name: cls.name,
        grade: cls.gradeLevel,
        numofStudents: cls.numofStudents, // Ensure this property matches your actual data structure
      }))
    : [];

  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "name",
      headerName: "Lớp",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "grade",
      headerName: "Khối",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "numofStudents",
      headerName: "Sỉ số",
      flex: 1,
      renderCell: (params) => {
        return `${params.value}/40`;
      },
    },
    {
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <DeleteClass params={(params)} />
          <Button
            color="primary"
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => handleEditClick(params.row._id)}
            sx={{
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
    <Box m="20px">
      <Header title="Lập danh sách lớp" subtitle="Create a class list" />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <DialogAddClass />
          </Stack>
        </DialogContent>
      </Dialog>
      <Box
        display="flex"
        justifyContent="flex-end"
        mb="20px"
        onClick={handleOpen}
      >
        <Button variant="contained" color="secondary">
          Thêm danh sách mới
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
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </Box>
    </Box>
  );
};

export default ClaList;
