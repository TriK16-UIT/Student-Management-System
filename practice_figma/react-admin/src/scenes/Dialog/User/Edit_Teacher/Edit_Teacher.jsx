import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

const formatSubjectName = (name) => {
  switch (name.toLowerCase()) {
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
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
      } else {
        console.error("Không thể cập nhật thông tin người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
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
        CHỈNH SỬA
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
              enableReinitialize
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
