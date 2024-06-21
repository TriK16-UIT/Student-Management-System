import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useAuthContext } from "../../context/AuthContext";

const ReportSemester = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();

  const [termData, setTermData] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");

  useEffect(() => {
    if (selectedTerm) {
      const fetchClassData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/report/term/${selectedTerm}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch class data");
          }

          const data = await response.json();
          setTermData(data);
        } catch (error) {
          console.error("Error fetching class data:", error);
        }
      };

      fetchClassData();
    }
  }, [selectedTerm, user]);

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  const rows = termData.map((student, index) => ({
    id: index + 1,
    className: student.className,
    totalStudents: student.totalStudents,
    passingStudents: student.passingStudents,
    passRate: student.passRate
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'className', headerName: 'Lớp', flex: 1 },
    { field: 'totalStudents', headerName: 'Sỉ số', flex: 1 },
    { field: 'passingStudents', headerName: 'Số lượng đạt', flex: 1 },
    { field: 'passRate', headerName: 'Tỉ lệ', width: 180 },
  ];

  return (
    <Box m="20px" mb="20px">
      <Header title="Lập bảng tổng kết" subtitle="Học kỳ" />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Học Kỳ</InputLabel>
            <Select value={selectedTerm} onChange={handleTermChange}>
              <MenuItem value={"I"}>1</MenuItem>
              <MenuItem value={"II"}>2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: colors.purpleAccent[500],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.purpleAccent[500],
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default ReportSemester;
