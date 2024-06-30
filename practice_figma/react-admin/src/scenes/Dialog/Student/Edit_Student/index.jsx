import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useStudentInfsContext } from "../../../../hooks/useStudentContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const DialogUpdateStudent = ({ studentId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { dispatch } = useStudentInfsContext();
  const { user } = useAuthContext();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: 'START_EDITING', payload: studentId });
  
    const fetchStudentInf = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch student information");
        }
        const json = await response.json();
        console.log("Fetched student:", json);
        setStudentData(json);
        setLoading(false);
        dispatch({ type: "GET_STUDENTINF", payload: json });
      } catch (error) {
        console.error("Error fetching student information:", error);
        setLoading(false);
      }
    };

    fetchStudentInf();
  }, [studentId, user, dispatch]);

  const handleFormSubmit = async (values) => {
    if (!user) {
      console.log("You must be logged in");
      return;
    }
  
    console.log("Submitting values:", values);
  
    try {
      const response = await fetch(`http://localhost:4000/api/student/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const updatedStudentInf = await response.json();
        dispatch({ type: "UPDATE_STUDENTINF", payload: updatedStudentInf });
      } else {
        const errorData = await response.json();
        console.error("Failed to update student information", errorData);
      }
    } catch (error) {
      console.error("Error updating student information:", error);
    }
  };

  const initialValues = studentData
    ? {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        dateOfBirth: dayjs(studentData.dateOfBirth),
        gender: studentData.gender,
        email: studentData.email,
        address: studentData.address,
      }
    : {
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        gender: "",
        email: "",
        address: "",
      };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Vui lòng nhập"),
    lastName: yup.string().required("Vui lòng nhập"),
    dateOfBirth: yup.date().required("Vui lòng nhập").nullable(),
    gender: yup.string().required("Vui lòng nhập"),
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập"),
    address: yup.string().required("Vui lòng nhập"),
  });

  const handleEditChange = (e) => {
    dispatch({
      type: 'UPDATE_FORM',
      payload: { [e.target.name]: e.target.value }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box m="20px" textAlign="center">
      <Header title="Chỉnh sửa thông tin học sinh" />
      
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
          setFieldValue,
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
                onChange={(e) => {
                  handleChange(e);
                  handleEditChange(e);
                }}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleEditChange(e);
                }}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 4" }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày sinh"
                  name="dateOfBirth"
                  format="DD/MM/YYYY"
                  value={values.dateOfBirth}
                  onChange={(newValue) => {
                    setFieldValue("dateOfBirth", newValue);
                    handleEditChange({
                      target: {
                        name: "dateOfBirth",
                        value: newValue,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                      helperText={touched.dateOfBirth && errors.dateOfBirth}
                    />
                  )}
                  sx={{ gridColumn: "span 2" }}
                />
              </LocalizationProvider>

              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel>Giới tính</InputLabel>
                <Select
                  label="Giới tính"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    handleEditChange(e);
                  }}
                  value={values.gender}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleEditChange(e);
                }}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleEditChange(e);
                }}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Hoàn tất
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DialogUpdateStudent;