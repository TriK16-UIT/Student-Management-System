import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataBeta } from "../../data/mockData";
import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';

const ReportSemester = () => {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [rows, setRows] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setRows(getFilteredGrades());
  }, [selectedTerm]);

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  const getFilteredGrades = () => {
    if (!selectedTerm) {
      return [];
    }

    // Filter grades by selected term
    const filteredGrades = mockDataBeta.grades.filter(
      (grade) => grade.Term === parseInt(selectedTerm, 10)
    );

    // Group grades by class
    const classGroups = {};
    filteredGrades.forEach((grade) => {
      const student = mockDataBeta.students.find((s) => s.StudentID === grade.StudentID);
      if (student) {
        if (!classGroups[student.ClassID]) {
          classGroups[student.ClassID] = {
            className: mockDataBeta.classes.find((cls) => cls.ClassID === student.ClassID).Name,
            classSize: 0,
            numPass: 0
          };
        }
        classGroups[student.ClassID].classSize += 1;
        if (grade.ScoreAverage >= 5) {
          classGroups[student.ClassID].numPass += 1;
        }
      }
    });

    // Format the result for the DataGrid
    const classData = Object.entries(classGroups).map(([classID, data], index) => ({
      id: index + 1,
      className: data.className,
      classSize: data.classSize,
      numPass: data.numPass,
      rate: ((data.numPass / data.classSize) * 100).toFixed(2) + '%'
    }));

    return classData;
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'className', headerName: 'Lớp', flex: 1 },
    { field: 'classSize', headerName: 'Sỉ số', flex: 1 },
    { field: 'numPass', headerName: 'Số lượng đạt', flex: 1 },
    { field: 'rate', headerName: 'Tỉ lệ', width: 180 },
  ];

  return (
    <Box m="20px" mb="20px">
      <Header title="Lập bảng tổng kết" subtitle="Học kỳ" />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Term</InputLabel>
            <Select value={selectedTerm} onChange={handleTermChange}>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
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
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default ReportSemester;
