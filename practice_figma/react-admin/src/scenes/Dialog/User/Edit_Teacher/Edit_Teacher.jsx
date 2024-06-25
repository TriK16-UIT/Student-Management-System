import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
<<<<<<< HEAD
=======
  CircularProgress,
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useUserContext } from "../../../../hooks/useUserContext";
<<<<<<< HEAD
import { tokens } from "../../../../theme";
=======
import { tokens } from "../../../../theme"
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
import Header from "../../../../components/Header";

const formatSubjectName = (name) => {
  switch (name.toLowerCase()) {
<<<<<<< HEAD
    case "math":
      return "Toán";
    case "physics":
      return "Vật lý";
    case "chemistry":
      return "Hóa học";
    case "biology":
      return "Sinh học";
    case "history":
      return "Lịch sử";
    case "geography":
      return "Địa lý";
    case "literature":
      return "Ngữ văn";
    case "ethics":
      return "Giáo dục công dân";
    case "pe":
      return "Thể dục";
=======
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
      return 'Giáo dục công dân';
    case 'pe':
      return 'Thể dục';
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
    default:
      return name;
  }
};

const EditTeacher = ({ params }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const { dispatch } = useUserContext();
  const { row } = params;
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    subject: "",
  });
  const [teacherID,setTeacherID] = useState([])

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/subject", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setSubjects(data);
        console.log(subjects)
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/teacher/byUser/${row._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        const fetchedUserDetails = {
          firstName: data.UserID.firstName,
          lastName: data.UserID.lastName,
          subject: data.SubjectID.name,
        };
        setInitialValues(fetchedUserDetails);
        setTeacherID(data._id);
      } else {
        console.error("Failed to fetch user data:", data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Vui lòng nhập"),
    lastName: yup.string().required("Vui lòng nhập"),
  });

  const handleEditClick = () => {
    fetchSubjects();
    fetchUser();
=======
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/subject', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
          method: "GET"
        });
        const data = await response.json();
        console.log("Fetched subjects data:", data); // Debug log
        if (Array.isArray(data)) {
          setSubjects(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      }
    };
    fetchSubjects();
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/user/${row._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
          method: "GET"
        });
        const data = await response.json();
        if (response.ok) {
          setUserDetails(data);
        } else {
          console.error('Failed to fetch user data:', data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [user, row._id]);

  if (!userDetails) {
    return <CircularProgress />;
  }

  const initialValues = {
    username: userDetails.username,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    role: userDetails.role,
    subject: userDetails.subject,
  };

  const checkoutSchema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập"),
    firstName: yup.string().required("Vui lòng nhập"),
    lastName: yup.string().required("Vui lòng nhập"),
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập"),
    subject: yup.string().when("role", {
      is: "teacher",
      then: yup.string().required("Vui lòng chọn môn học"),
      otherwise: yup.string(),
    }),
  });

  const handleEditClick = () => {
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
<<<<<<< HEAD
    try {
      const selectedSubject = subjects.find((subject) => subject.name === values.subject);
  
      const payload = {
        SubjectID: selectedSubject._id
      };
      // update subject
      const response = await fetch(`http://localhost:4000/api/teacher/${teacherID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        handleClose();
        console.log("Updated subject: ", updatedUser);
      } else {
        console.error("Không thể cập nhật thông tin người dùng");
      }
      
      // update personal info
      const payload2 = {
        firstName: values.firstName,
        lastName: values.lastName,
      };
      const response1 = await fetch(`http://localhost:4000/api/user/${row._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload2), // values but except values
      });
  
      if (response1.ok) {
        const updatedUser = await response1.json();
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
        handleClose();
        console.log("Updated teacher: ", updatedUser);
=======
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/user/${row._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
        handleClose();
        console.log("Updated user: ", updatedUser)
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
      } else {
        console.error("Không thể cập nhật thông tin người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
<<<<<<< HEAD
=======
    } finally {
      setLoading(false);
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
    }
  };

  return (
    <>
      <Button
        type="button"
        color="primary"
        variant="contained"
        endIcon={<EditIcon />}
        onClick={handleEditClick}
        sx={{
          marginLeft: 1,
          backgroundColor: "#4CCEAC",
          "&:hover": {
            backgroundColor: "#36917A",
          },
        }}
      >
<<<<<<< HEAD
        CHỈNH SỬA
=======
        {loading ? <CircularProgress size={24} /> : "CHỈNH SỬA"}
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
      </Button>

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
          <Box m="20px" textAlign="center">
            <Header title="Chỉnh sửa thông tin người dùng" />
          </Box>
          <Stack spacing={2} margin={2}>
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
<<<<<<< HEAD
              enableReinitialize
=======
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Họ"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Tên"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
<<<<<<< HEAD
                    <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                      <InputLabel>Môn học</InputLabel>
                      <Select
                        label="Môn học"
                        name="subject"
                        value={values.subject}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.subject && !!errors.subject}
                      >
                        {subjects.map((subject) => (
                          <MenuItem key={subject._id} value={subject.name}>
                            {formatSubjectName(subject.name)}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.subject && errors.subject && (
                        <Typography color="error">{errors.subject}</Typography>
                      )}
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      LƯU
=======
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Tên tài khoản"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      name="username"
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                      <InputLabel>Vai trò</InputLabel>
                      <Select
                        label="Vai trò"
                        name="role"
                        value={values.role}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled
                      >
                        <MenuItem value="teacher">Giáo viên</MenuItem>
                      </Select>
                    </FormControl>
                    {values.role === "teacher" && (
                      <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                        <InputLabel>Môn học</InputLabel>
                        <Select
                          label="Môn học"
                          name="subject"
                          value={values.subject}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={!!touched.subject && !!errors.subject}
                        >
                          {subjects.map((subject) => (
                            <MenuItem key={subject._id} value={subject.name}>
                              {formatSubjectName(subject.name)}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.subject && errors.subject && (
                          <Typography color="error">{errors.subject}</Typography>
                        )}
                      </FormControl>
                    )}
                  </Box>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "LƯU"}
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditTeacher;
