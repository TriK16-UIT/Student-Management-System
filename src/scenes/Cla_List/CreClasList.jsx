import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useLocation, Link, useNavigate, Form } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Header from "../../components/Header";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { mockDataTNSV } from "../../data/mockData";

const CreClasList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const initialClassData = location.state?.classData || { students: [] };

  const [classData, setClassData] = useState(initialClassData);

  const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }

  
  const [arrIds,setArrIds] = useState([]);
  
  const filteredDataTNSV = mockDataTNSV
  .filter(student => student.access === "noclass")
  .map((student, index) => ({
    ...student,
    stt: index + 1,  // Add sequential number starting from 1
  }));


  const columns_students = [
    { field: "stt", headerName: "STT", width: 90 },
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
      flex: 1
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
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
      flex: 1
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
            <Button
              type="button"
              color="primary"
              variant="contained"
              endIcon={<DeleteOutlineIcon />}
              sx={{
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];

  // Handle Adding students
  const HandleAddStudents = () => {
    console.log(arrIds); //update the main data grid which contain "columns" with the selected from dialog data grid
    const selectedStudents = filteredDataTNSV.filter(student => arrIds.includes(student.id));
    const updatedClassData = {
      ...classData,
      students: [...classData.students, ...selectedStudents]
    };
    setClassData(updatedClassData);
    closepopup();
  };
  return (
    <Box m="20px">

      <Dialog
      open={open} 
      onClose={closepopup} 
      fullWidth maxWidth="md" 
      >
        <DialogTitle
        sx={{
          backgroundColor: colors.purpleAccent[500], 
        }}
        > <IconButton onClick={closepopup} style={{float:'right'}}><CloseIcon color={colors.primary[500]}></CloseIcon></IconButton>  </DialogTitle>
            <DialogContent
            sx={{
              backgroundColor: colors.grey[700], 
            }}
            >
                {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                <Stack spacing={2} margin={2}>
                
                <DataGrid 
                checkboxSelection 
                rows={filteredDataTNSV} 
                columns={columns_students} 
                disableRowSelectionOnClick
                onRowSelectionModelChange={
                  (ids) => {
                    setArrIds(ids)}}
                />
                <Button 
                variant="contained" 
                color="secondary"
                onClick={HandleAddStudents}
                >Thêm sinh viên
                </Button>
                </Stack>
            </DialogContent>
        </Dialog>

      <Header title="Danh sách lớp"/>

      <Box display="flex" justifyContent="space-between" mb="20px">
        <Box display="flex" gap="10px">
        <TextField
          fullWidth
          label="Lớp"
          defaultValue={classData.class}
        />
        <TextField
          fullWidth
          label="Sỉ số tối đa"
          defaultValue={classData.classSize}
        />
        </Box>
        <Button 
        variant="contained" 
        color="secondary"
        onClick={() => {
          functionopenpopup();
          }}
        >Thêm sinh viên</Button>
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
            borderBottom: "none"
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
        <DataGrid rows={classData.students} columns={columns} />
      </Box>
    </Box>
  );
};

export default CreClasList;