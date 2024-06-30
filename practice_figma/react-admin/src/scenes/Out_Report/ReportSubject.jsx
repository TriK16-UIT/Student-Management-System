import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

import Header from '../../components/Header';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useAuthContext } from "../../context/AuthContext";

const ReportSubject = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();

  const [termData, setTermData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [boxHeight, setBoxHeight] = useState(400); 

  const handlePageSizeChange = (newPageSize) => {
      setBoxHeight(newPageSize * 52 + 110); // Adjust the height based on the new page size
    };

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/subject`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch subject data");
        }

        const data = await response.json();
        const formattedData = data.map(subject => ({
          ...subject,
          name: formatSubjectName(subject.name),
        }));
        setSubjectData(formattedData);
      } catch (error) {
        console.error("Error fetching subject data:", error);
      }
    };

    fetchSubjectData();
  }, [user]);

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

  useEffect(() => {
    if (selectedTerm && selectedSubject) {
      const fetchTermData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/report/term/${selectedTerm}/subject/${selectedSubject}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch term data");
          }

          const data = await response.json();
          setTermData(data);
        } catch (error) {
          console.error("Error fetching term data:", error);
        }
      };

      fetchTermData();
    }
  }, [selectedTerm, selectedSubject, user]);

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTerm && selectedSubject) {
      const fetchTermData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/report/term/${selectedTerm}/subject/${selectedSubject}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch term data");
          }

          const data = await response.json();
          setTermData(data);
        } catch (error) {
          console.error("Error fetching term data:", error);
        }
      };

      fetchTermData();
    }
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

  const exportToExcel = () => {
    const dataToExport = termData.map((student, index) => ({
      STT: index + 1,
      "Lớp": student.className,
      "Sỉ số": student.totalStudents,
      "Số lượng đạt": student.passingStudents,
      "Tỉ lệ đạt": student.passRate
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Term Data");
    XLSX.writeFile(workbook, `Term_${selectedTerm}_Subject_${selectedSubject}_Data.xlsx`);
  };

  return (
    <Box m="20px" mb="20px">
      <Header title="Lập bảng tổng kết" subtitle="Học kỳ và Môn học" />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Học kỳ</InputLabel>
              <Select
                value={selectedTerm || ''}
                onChange={handleTermChange}
                label="Học kỳ"
              >
                <MenuItem value={"I"}>1</MenuItem>
                <MenuItem value={"II"}>2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Môn học</InputLabel>
              <Select
                value={selectedSubject || ''}
                onChange={handleSubjectChange}
                label="Môn học"
              >
                {subjectData.map((subject) => (
                  <MenuItem key={subject._id} value={subject._id}>
                    {formatSubjectName(subject.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="secondary" onClick={exportToExcel}>
              Xuất file excel
            </Button>
          </Grid>
        </Grid>
      </form>
      
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
    </Box>
  );
};

export default ReportSubject;
