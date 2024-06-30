import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DialogAddStudent from "../Dialog/Student/Add_Student";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import DeleteStudent from "./Delete_Student";
import { useStudentInfsContext } from "../../hooks/useStudentContext";
import DialogUpdateStudent from "../Dialog/Student/Edit_Student";

const StuAdmission = () => {
  const { studentinfs , dispatch } = useStudentInfsContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const [selectedStudentId, setSelectedStudentId] = useState(null); // New state for selected student ID

  const [dialogState, setDialogState] = useState(null);
  const [open, setOpen] = useState(false);
  
  const [boxHeight, setBoxHeight] = useState(400); 

  const handlePageSizeChange = (newPageSize) => {
      setBoxHeight(newPageSize * 52 + 110); // Adjust the height based on the new page size
    };


  const handleOpen = (state, id = null)=> {
    setDialogState(state);
    setSelectedStudentId(id); // Set the selected student ID
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudentId(null); // Reset the selected student ID
    setDialogState(null);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (user && user.token) {
          const response = await fetch("http://localhost:4000/api/student/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch students");
          }
          const data = await response.json();
          dispatch({ type: 'SET_STUDENTINFS', payload:  data });
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        // Handle error here, such as displaying an error message or logging out the user
      }
    };
  
    if (user) {
      fetchStudents();
    }
  }, [dispatch, user]);

  const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is null or undefined

    const formattedDate = new Date(date);
    const formattedString = formattedDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return formattedString;
  };

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

  
  const rows = studentinfs ? studentinfs.map((student, index) => ({
    id: index + 1, // Used for DataGrid's row id
    _id: student._id, // Used for identifying the student in the database
    fullName: `${student.firstName} ${student.lastName}`,
    dateOfBirth: formatDate(student.dateOfBirth),
    gender: formatGender(student.gender),
    email: student.email,
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
      field: "dateOfBirth",
      headerName: "Ngày sinh",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 90,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "actions",
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
            <DeleteStudent params={params} />
            <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => {
              handleOpen("edit", params.row._id)
              }}
            sx={{
                marginLeft: 1,
                backgroundColor: '#4CCEAC', 
                    '&:hover': {
                        backgroundColor: '#36917A', 
                    }
            }}
            >
                Chỉnh sửa
            </Button>
          </Box>
          
        );
      },
    },
  ];

  const exportToExcel = () => {
    const dataToExport = studentinfs.map(({ firstName, lastName, dateOfBirth, gender, email }, index) => ({
      STT: index + 1,
      "Họ và tên": `${firstName} ${lastName}`,
      "Ngày sinh": formatDate(dateOfBirth),
      "Giới tính": formatGender(gender),
      Email: email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  // const importFromExcel = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: 'array' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  //     console.log('Data read from Excel:', worksheet);

  //     worksheet.forEach(async (row) => {
  //       const {
  //         'Họ': lastName,
  //         'Tên': firstName,
  //         'Ngày sinh': dateOfBirth,
  //         'Địa chỉ': address,
  //         'Email': email,
  //         'Giới tính': gender
  //       } = row;
  //       await signup(firstName, lastName, dateOfBirth, address, email, gender);
  //       console.log(error);
  //     });
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

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
           {dialogState === "edit" ? <DialogUpdateStudent studentId={selectedStudentId}/> :  <DialogAddStudent />}
           </Stack>
        </DialogContent>
      </Dialog>
      <Header title="Tiếp nhận học sinh" subtitle="Student Admission" />

      <Box display="flex" justifyContent="space-between" mb="20px">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpen("add")}
        >
          Thêm học sinh
        </Button>

        <Box display="flex" gap="10px">
          {/* <input
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            id="upload-excel"
            onChange={importFromExcel}
          />
          <label htmlFor="upload-excel">
            <Button variant="contained" color="secondary" component="span">
              Nhập dữ liệu từ excel
            </Button>
          </label> */}
          <Button variant="contained" color="secondary" onClick={exportToExcel}>
            Xuất file excel
          </Button>
        </Box>
      </Box>

      <Box
        m="40px 0 0 0"
        height={boxHeight}
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
        <DataGrid rows={rows} columns={columns}  initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Box>
  );
};

export default StuAdmission;
