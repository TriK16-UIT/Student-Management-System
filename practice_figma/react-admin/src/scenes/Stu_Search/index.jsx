import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import Header from '../../components/Header';
import { useAuthContext } from "../../context/AuthContext";

const CustomToolbar = () => {
  return (
    <Box sx={{ p: 2 }}>
      <GridToolbarQuickFilter 
        sx={{
          '& .MuiInputBase-root': {
            border: '1px solid',
            borderColor: 'gray',
            borderRadius: '4px',
          },
          '& .MuiInputBase-input': {
            padding: '10px 5px', 
          },
          '& .MuiSvgIcon-root': {
              margin: '8px', 
          },
        }}
        placeholder="Tìm kiếm"
      />
    </Box>
  );
};

const StuSearch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const [classData, setClassData] = useState([]);
  
  const [boxHeight, setBoxHeight] = useState(400); 

  const handlePageSizeChange = (newPageSize) => {
      setBoxHeight(newPageSize * 52 + 110); // Adjust the height based on the new page size
    };
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/report/`, {
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
  }, [user]);

  const formatClass = (name) => {
    switch (name) {
      case 'No Class':
        return 'Chưa có lớp';
      default:
        return name;
    }
  };

  const rowsClassData = classData.map((student, index) => ({
    id: index + 1,
    studentID: student.studentID,
    studentName: student.studentName,
    className: formatClass(student.className),
    termIAverage: student.termIAverage,
    termIIAverage: student.termIIAverage
  }));

  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "studentName",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "className",
      headerName: "Lớp",
      width: 90,
    },
    {
      field: "termIAverage",
      headerName: "TB Học kỳ I",
      flex: 1,
      type: "number",
    },
    {
      field: "termIIAverage",
      headerName: "TB Học kỳ II",
      flex: 1,
      type: "number",
    },
  ];

  return (
    <Box m="20px" mb="20px">
      <Header title="Tra cứu học sinh" subtitle="Student Look up" />

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
        <DataGrid
          rows={rowsClassData}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Box>
  );
};

export default StuSearch;
