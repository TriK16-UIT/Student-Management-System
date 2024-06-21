import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from "../../context/AuthContext";
import DeleteStudentID from "./Delete_Student_wClass";
import { useClassMemberContext } from "../../context/ClassMemberContext";

const ClaListEdit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Extract the ID from the URL
  const [classData, setClassData] = useState({});
  const [studentsWithoutClass, setStudentsWithoutClass] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrIds, setArrIds] = useState([]);

  const { user } = useAuthContext();
  const { classMembers, dispatch } = useClassMemberContext();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/class/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch class data");
        }

        const data = await response.json();
        setClassData(data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClassData();
  }, [id, user]);

  useEffect(() => {
    const fetchStudentsByClass = async () => {
      const response = await fetch(`http://localhost:4000/api/student/byClass/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students by class");
      }

      const data = await response.json();
      dispatch({ type: "SET_CLASS_MEMBERS", payload: data });
    };

    fetchStudentsByClass();
  }, [id, user, dispatch]);
  
  const fetchStudentsWithoutClass = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/student/withoutClass`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students without class");
      }

      const data = await response.json();
      setStudentsWithoutClass(data);
    } catch (error) {
      console.error("Error fetching students without class:", error);
    }
  };


  useEffect(() => {
    fetchStudentsWithoutClass();
  }, [user]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToClass = async () => {
    console.log(arrIds); // Use the new selection model
    const selectedStudents = studentsWithoutClass.filter(student => arrIds.includes(student._id));

    const promises = selectedStudents.map(async (student) => {
      const response = await fetch(`http://localhost:4000/api/student/${student._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          ClassID: id
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update student ${student._id}`);
      }
      const patchedStudent = await response.json();
      return patchedStudent;
    });

    const results = await Promise.all(promises);
    console.log("Updated students:", results);

    dispatch({ type: "ADD_CLASS_MEMBERS", payload: results });
    fetchStudentsWithoutClass();
    handleClose(); // Close the dialog
  };

  const columns_students = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "name",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Giới tính",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];

  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "name",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Giới tính",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <DeleteStudentID params={params} />
          </Box>
        );
      },
    },
  ];

  const formatGender = (gender) => {
    switch (gender) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      default:
        return gender;
    }
  };

  const rowsStudentsWithoutClass = studentsWithoutClass.map((student, index) => ({
    id: index + 1,
    _id: student._id,
    name: `${student.firstName} ${student.lastName}`,
    gender: formatGender(student.gender),
    email: student.email,
  }));

  const rowsstudentsByClass = classMembers ? classMembers.map((student, index) => ({
    id: index + 1,
    _id: student._id,
    name: `${student.firstName} ${student.lastName}`,
    gender: formatGender(student.gender),
    email: student.email,
  })) : [];

  return (
    <Box m="20px">
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            backgroundColor: colors.purpleAccent[500],
          }}
        >
          <IconButton onClick={handleClose} style={{ float: 'right' }}>
            <CloseIcon color={colors.primary[500]} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.grey[700],
          }}
        >
          <Stack spacing={2} margin={2}>
            <DataGrid
              checkboxSelection
              rows={rowsStudentsWithoutClass}
              columns={columns_students}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              onRowSelectionModelChange={(data) => {
                setArrIds(data);
                console.log(data); // Log the new selection model
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToClass}
              disabled={studentsWithoutClass.length === 0}
            >
              Thêm sinh viên vào lớp
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Header title="Danh sách lớp" />

      <Box display="flex" justifyContent="space-between" mb="20px">
        <Box display="flex" gap="10px">
          <TextField
            fullWidth
            label="Tên lớp"
            value={classData.name || ""}
            InputProps={{
              readOnly: true,
              sx: {
                "&:hover": {
                  cursor: "default",
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Khối"
            value={classData.gradeLevel || ""}
            InputProps={{
              readOnly: true,
              sx: {
                "&:hover": {
                  cursor: "default",
                },
              }}
            }
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
        >
          Thêm sinh viên
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
          "& .MuiCheckbox-root": {
            color: `${colors.purpleAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rowsstudentsByClass}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default ClaListEdit;
