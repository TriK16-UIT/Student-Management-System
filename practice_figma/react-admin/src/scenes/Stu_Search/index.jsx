import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { mockDataTCSV } from '../../data/mockData';
import { tokens } from '../../theme';
import { useTheme } from '@mui/material';
import Header from '../../components/Header';

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

  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "name",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "class",
      headerName: "Lớp",
      width: 90,
    },
    {
      field: "TBHK1",
      headerName: "TB Học kỳ I",
      flex: 1,
      type: "number",
    },
    {
      field: "TBHK2",
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
        <DataGrid
          rows={mockDataTCSV}
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
        />
      </Box>
    </Box>
  );
};

export default StuSearch;
