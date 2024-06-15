import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTNSV } from "../../data/mockData";

import Header from "../../components/Header";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import Form from "../form";
import { useState } from "react";

import CloseIcon from '@mui/icons-material/Close';

const StuAdmission = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dialogState, setDialogState] = useState(null);


  const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }

  const columns = [
    { field: "id", headerName: "STT", width: 90},
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
      width: 90
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
    {
      field: "accessLevel",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "class"
                ? colors.purpleAccent[600]
                : access === "noclass"
                ? colors.purpleAccent[700] : colors.purpleAccent[700]
            }
            borderRadius="4px"
          >
            {access === "class" && <VerifiedUserIcon />}
            {access === "noclass" && <GppBadIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {access === "class" ? "Có lớp" : "Chưa có lớp"}
            </Typography>
          </Box>
        );
      },
  },
    {
      headerName: "Hành động",
      flex: 1,
      renderCell: ({ row: { access } }) => {
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

            <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => {
              functionopenpopup();
              setDialogState("edit");
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

  return (
    <Box m="20px" mb="20px" >
      <Dialog
      open={open} 
      onClose={closepopup} 
      fullWidth maxWidth="sm" 
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
                <Form params={dialogState}/>
                </Stack>
            </DialogContent>
        </Dialog>
      <Header title="Tiếp nhận sinh viên" subtitle="Student Admission" />

      <Box display="flex" justifyContent="space-between" mb="20px">

      <Button 
      variant="contained" 
      color="secondary" 
      startIcon={<AddCircleOutlineIcon />}
      onClick={() => {
        functionopenpopup();
        setDialogState("add");
        }}
      >Thêm học sinh
      </Button>

      <Box display="flex" gap="10px">
        <Button variant="contained" color="secondary">Nhập dữ liệu từ excel</Button>
        <Button variant="contained" color="secondary">Xuất file excel</Button>
      </Box>
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
          }
        }}
      >
        <DataGrid rows={mockDataTNSV} columns={columns}  rowsPerPageOptions={[5,10,20]}/>
      </Box>
    </Box>
  );
};

export default StuAdmission;