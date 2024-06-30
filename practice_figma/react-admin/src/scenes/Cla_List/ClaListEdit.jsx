import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from "../../context/AuthContext";
import DeleteStudentID from "./Delete_Student_wClass";
import { useClassMemberContext } from "../../context/ClassMemberContext";
import { Formik } from "formik";
import * as yup from "yup";

const ClaListEdit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Extract the ID from the URL
  const [classData, setClassData] = useState({});
  const [studentsWithoutClass, setStudentsWithoutClass] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrIds, setArrIds] = useState([]);

  const { user } = useAuthContext();
  const { classMembers, dispatch } = useClassMemberContext();

  const [addToClassError, setAddToClassError] = useState(null);
  const [classMax,setClassMax] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [boxHeight, setBoxHeight] = useState(400); 

  const handlePageSizeChange = (newPageSize) => {
      setBoxHeight(newPageSize * 52 + 110); // Adjust the height based on the new page size
    };


  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/class/${id}`, {
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
  }, [id, user]);

  useEffect(() => {
    const fetchClasseMax = async () => {
      const response = await fetch("http://localhost:4000/api/config/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch classes");
      }
      const data = await response.json();
      setClassMax(data.maxClassSize);
    }
    if (user) {
      fetchClasseMax();
    }
  }, [user]);

  useEffect(() => {
    const fetchStudentsByClass = async () => {
      const response = await fetch(`http://localhost:4000/api/student/byClass/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students by class");
      }

      const data = await response.json();
      dispatch({ type: "SET_CLASS_MEMBERS", payload: data });
    };

    fetchStudentsByClass();
  }, [id, user, dispatch]);
  
  const fetchStudentsWithoutClass = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/student/withoutClass`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students without class");
      }

      const data = await response.json();
      setStudentsWithoutClass(data);
    } catch (error) {
      console.error("Error fetching students without class:", error);
    }
  };

  useEffect(() => {
    fetchStudentsWithoutClass();
  }, [user]);

  const handleOpen = () => {
    fetchStudentsWithoutClass();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToClass = async () => {
    // Check if adding selected students exceeds classMax
    if (arrIds.length + classMembers.length > classMax) {
      setAddToClassError(`Thêm học sinh đã chọn sẽ vượt quá kích thước lớp tối đa là ${classMax}`);
      return;
    }
  
    const selectedStudents = studentsWithoutClass.filter(student => arrIds.includes(student._id));
  
    const promises = selectedStudents.map(async (student) => {
      const response = await fetch(`http://localhost:4000/api/student/${student._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          ClassID: id
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update student ${student._id}`);
      }
      const patchedStudent = await response.json();
      return patchedStudent;
    });
  
    try {
      const results = await Promise.all(promises);
  
      dispatch({ type: "ADD_CLASS_MEMBERS", payload: results });
      fetchStudentsWithoutClass();
      handleClose(); // Close the dialog
      setAddToClassError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error adding students to class:", error);
    }
  };

  const columns_students = [
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
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
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
      flex: 1,
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
            <DeleteStudentID params={params} />
          </Box>
        );
      },
    },
  ];

  const formatGender = (gender) => {
    switch (gender) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      default:
        return gender;
    }
  };

  const rowsStudentsWithoutClass = studentsWithoutClass.map((student, index) => ({
    id: index + 1,
    _id: student._id,
    name: `${student.firstName} ${student.lastName}`,
    gender: formatGender(student.gender),
    email: student.email,
  }));

  const rowsstudentsByClass = classMembers ? classMembers.map((student, index) => ({
    id: index + 1,
    _id: student._id,
    name: `${student.firstName} ${student.lastName}`,
    gender: formatGender(student.gender),
    email: student.email,
  })) : [];

  const handleFormSubmit = async (values) => {
    console.log(values)
    try {
      const response = await fetch(`http://localhost:4000/api/class/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        console.log(json.error)
      } else {
        setIsLoading(false);
        setError("");
      }
    } catch (error) {
      console.error("Error updating class information:", error);
    }
  };
  const initialValues = classData
    ? {
        name: classData.name,
        gradeLevel: classData.gradeLevel,
      }
    : {
      name: "",
      gradeLevel: "",
      };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập"),
    gradeLevel: yup.string().required("Vui lòng nhập"),
  });

  return (
    <Box m="20px">
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            backgroundColor: colors.purpleAccent[500],
          }}
        >
          <IconButton onClick={handleClose} style={{ float: 'right' }}>
            <CloseIcon color={colors.primary[500]} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.grey[700],
          }}
        >
          <Stack spacing={2} margin={2}>
            <DataGrid
              checkboxSelection
              rows={rowsStudentsWithoutClass}
              columns={columns_students}
              getRowId={(row) => row._id}
              disableRowSelectionOnClick
              onRowSelectionModelChange={(data) => {
                setArrIds(data);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToClass}
              disabled={studentsWithoutClass.length === 0}
            >
              Thêm học sinh vào lớp
            </Button>
            <Box display="flex" justifyContent="center">
              {addToClassError && <div>{addToClassError}</div>}
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>

      <Header title="Danh sách lớp" />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Tên lớp"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Khối"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.gradeLevel}
              name="gradeLevel"
              error={!!touched.gradeLevel && !!errors.gradeLevel}
              helperText={touched.gradeLevel && errors.gradeLevel}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ flex: 1 }}
            />
            <Button type="submit" color="secondary" variant="contained"  disabled={isLoading}>
              Chỉnh sửa tên lớp và khối
            </Button>
            {error && <div>{error}</div>}
          </form>
        )}
      </Formik>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
        >
          Thêm học sinh
        </Button>
      </Box>

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
          "& .MuiCheckbox-root": {
            color: `${colors.purpleAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rowsstudentsByClass}
          columns={columns}
          getRowId={(row) => row._id}
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

export default ClaListEdit;
