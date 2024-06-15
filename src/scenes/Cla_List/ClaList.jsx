import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataLDSL } from "../../data/mockData";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Header from "../../components/Header";

const ClaList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleEditClick = (params) => {
    navigate(`/class_list/${params.class}`, { state: { classData: params } });
  };

  const handleDeleteClick = (id) => {
    // Implement delete logic here
    console.log(`Deleting class with id: ${id}`);
  };

  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "class",
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
      field: "classSize",
      headerName: "Sỉ số",
      flex: 1,
      renderCell: (params) => {
        const studentCount = params.row.students ? params.row.students.length : 0;
        return `${studentCount}/${params.row.classSize}`;
      },
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
              onClick={() => handleDeleteClick(params.row.id)}
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
              onClick={() => handleEditClick(params.row)}
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
    <Box m="20px">
      <Header title="Lập danh sách lớp" subtitle="Create a class list" />

      <Box display="flex" justifyContent="flex-end" mb="20px">
        <Link to={`/class_list/edit`}>
          <Button variant="contained" color="secondary">Thêm danh sách mới</Button>
        </Link>
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
          }
        }}
      >
        <DataGrid rows={mockDataLDSL} columns={columns} />
      </Box>
    </Box>
  );
};

export default ClaList;
