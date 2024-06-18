import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid, Box, Button } from '@mui/material';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';

import { mockDataAlpha } from "../../data/mockData";
import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import EditToolbar from '../../components/EditToolbar';

const SubScores = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [cellModesModel, setCellModesModel] = useState({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setRows(getFilteredGrades());
  }, [selectedClass, selectedSubject, selectedTerm]);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  const getFilteredGrades = () => {
    if (!selectedClass || !selectedSubject || !selectedTerm) {
      return [];
    }
    return mockDataAlpha.grades
      .filter(
        (grade) =>
          mockDataAlpha.students.find(
            (student) => student.StudentID === grade.StudentID && student.ClassID === selectedClass
          ) && grade.SubjectID === selectedSubject && grade.Term === parseInt(selectedTerm, 10)
      )
      .map((grade, index) => ({
        id: index + 1,
        studentName: getStudentName(grade.StudentID),
        score15Min: grade.Score15Min,
        score45Min: grade.Score45Min,
        scoreAverage: ((grade.Score15Min + 2 * grade.Score45Min) / 3).toFixed(2),
      }));
  };

  const getStudentName = (studentID) => {
    const student = mockDataAlpha.students.find((student) => student.StudentID === studentID);
    return student ? `${student.FirstName} ${student.LastName}` : '';
  };

  const handleCellEditCommit = (params) => {
    const updatedRows = rows.map((row) => {
      if (row.id === params.id) {
        row[params.field] = params.value;
        row.scoreAverage = (
          (parseFloat(row.score15Min) + 2 * parseFloat(row.score45Min)) /
          3
        ).toFixed(2);
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleCellFocus = useCallback((event) => {
    const row = event.currentTarget.parentElement;
    const id = row.dataset.id;
    const field = event.currentTarget.dataset.field;
    if (field === 'score15Min' || field === 'score45Min') {
      setSelectedCellParams({ id, field });
    }
  }, []);

  const cellMode = useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = useCallback(
    (params, event) => {
      if (event.key === 'Enter' && cellMode === 'edit') {
        setCellModesModel((prev) => ({
          ...prev,
          [params.id]: {
            ...prev[params.id],
            [params.field]: { mode: GridCellModes.View },
          },
        }));
        handleCellEditCommit(params);
      }
    },
    [cellMode]
  );

  const handleCellEditStop = useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === 'edit') {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'studentName', headerName: 'Student Name', flex: 1, editable: false },
    { field: 'score15Min', headerName: 'Score 15 Min', flex: 1, editable: true },
    { field: 'score45Min', headerName: 'Score 45 Min', flex: 1, editable: true },
    { field: 'scoreAverage', headerName: 'Score Average', width: 180, editable: false },
  ];

  return (
    <Box m="20px" mb="20px">
      <Header title="Nhập bảng điểm môn" subtitle="blah..blah.." />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select value={selectedClass} onChange={handleClassChange}>
              {mockDataAlpha.classes.map((cls) => (
                <MenuItem key={cls.ClassID} value={cls.ClassID}>
                  {cls.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select value={selectedSubject} onChange={handleSubjectChange}>
              {mockDataAlpha.subjects.map((subject) => (
                <MenuItem key={subject.SubjectID} value={subject.SubjectID}>
                  {subject.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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
          '& .name-column--cell': {
            // color: colors.redAccent[300],
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
          onCellEditCommit={handleCellEditCommit}
          onCellKeyDown={handleCellKeyDown}
          cellModesModel={cellModesModel}
          onCellEditStop={handleCellEditStop}
          onCellModesModelChange={(model) => setCellModesModel(model)}
          isCellEditable={(params) => params.field === 'score15Min' || params.field === 'score45Min'}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              cellMode,
              selectedCellParams,
              setSelectedCellParams,
              cellModesModel,
              setCellModesModel,
            },
            cell: {
              onFocus: handleCellFocus,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SubScores;
