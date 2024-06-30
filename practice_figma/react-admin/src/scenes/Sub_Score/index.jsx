import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid, Box, Button, Dialog, DialogTitle, IconButton, DialogContent, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useAuthContext } from '../../context/AuthContext';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import PatchGrade from './Edit_Grade';
import { useGradesContext } from '../../hooks/useGradeContext';

const SubScores = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const [dialogState, setDialogState] = useState(null);
  const [open, setOpen] = useState(false);

  const { grades, dispatch } = useGradesContext();

  const [boxHeight, setBoxHeight] = useState(400); 

  const handlePageSizeChange = (newPageSize) => {
      setBoxHeight(newPageSize * 52 + 110); // Adjust the height based on the new page size
    };

  const handleOpen = (state, id = null) => {
    setDialogState(state);
    setSelectedStudentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudentId(null);
    setDialogState(null);
  };

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSubject && selectedTerm) {
      fetchGrades();
    }
  }, [selectedClass, selectedSubject, selectedTerm]);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/subject', {
        headers: { Authorization: `Bearer ${user.token}` },
        method: "GET",
      });
      if (!response.ok) throw new Error('Failed to fetch subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/class/', {
        headers: { Authorization: `Bearer ${user.token}` },
        method: "GET",
      });
      if (!response.ok) throw new Error('Failed to fetch classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/student', {
        headers: { Authorization: `Bearer ${user.token}` },
        method: "GET",
      });
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const formatSubjectName = (name) => {
    switch (name.toLowerCase()) {
      case 'math':
        return 'Toán';
      case 'physics':
        return 'Vật lý';
      case 'chemistry':
        return 'Hóa học';
      case 'biology':
        return 'Sinh học';
      case 'history':
        return 'Lịch sử';
      case 'geography':
        return 'Địa lý';
      case 'literature':
        return 'Ngữ văn';
      case 'ethics':
        return 'Đạo đức';
      case 'pe':
        return 'Thể dục';
      default:
        return name;
    }
  };

  const formatScore = (score) => {
    return score.toFixed(2);
  };

  const fetchGrades = async () => {
    try {
      if (!selectedClass || !selectedSubject || !selectedTerm) {
        console.warn('Please select all fields');
        return;
      }
      const response = await fetch(`http://localhost:4000/api/grade/class/${selectedClass}/subject/${selectedSubject}/term/${selectedTerm}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        method: "GET",
      });
      if (!response.ok) throw new Error('Failed to fetch grades');
      const data = await response.json();
      dispatch({ type: 'SET_GRADES', payload: data });
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  const getStudentNameByStudentId = (studentId) => {
    const student = students.find(s => s._id === studentId);
    return student ? student.firstName + " " + student.lastName : '';
  };

  const columns = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'studentName', headerName: 'Học sinh', flex: 1, minWidth: 150 },
    { field: 'score15Min', headerName: 'Điểm 15 phút', width: 150 },
    { field: 'score45Min', headerName: 'Điểm 45 phút', width: 150 },
    { field: 'scoreAverage', headerName: 'Điểm trung bình', width: 180 },
    {
      field: 'actions',
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => (
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
            endIcon={<EditIcon />}
            onClick={() => handleOpen("edit", params.row._id)}
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
      ),
    },
  ];

  const rows = grades ? grades.map((student, index) => ({
    id: index + 1,
    _id: student._id,
    studentName: getStudentNameByStudentId(student.StudentID),
    score15Min: student.score15Min,
    score45Min: student.score45Min,
    scoreAverage: formatScore(student.scoreAverage),
  })) : [];

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
            <PatchGrade studentId={selectedStudentId} />
          </Stack>
        </DialogContent>
      </Dialog>
      <Header title="Nhập bảng điểm môn" subtitle="" />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Lớp</InputLabel>
            <Select value={selectedClass} onChange={handleClassChange}>
              {classes.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.gradeLevel + cls.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Môn học</InputLabel>
            <Select value={selectedSubject} onChange={handleSubjectChange}>
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  {formatSubjectName(subject.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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

      {selectedClass && selectedSubject && selectedTerm ? (
        <Box
          m="40px 0 0 0"
          height={boxHeight}
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
            disableSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      ) : (
        <Box mt="20px">
          <p>Vui lòng chọn đầy đủ Lớp, Môn học và Học Kỳ để hiển thị bảng điểm.</p>
        </Box>
      )}
    </Box>
  );
};

export default SubScores;
