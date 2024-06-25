<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
=======
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
<<<<<<< HEAD
  useMediaQuery,
  useTheme,
=======
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
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

const EditUser = ({ params }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const { dispatch } = useUserContext();
  const { row } = params;
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/${row._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInitialValues({
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Vui lòng nhập"),
    lastName: yup.string().required("Vui lòng nhập"),
=======
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
  });

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

<<<<<<< HEAD
  const handleSubmit = async (values, { setSubmitting }) => {
=======
  const handleSubmit = async (values) => {
    setLoading(true);
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
    try {
      const response = await fetch(`http://localhost:4000/api/user/${row._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
<<<<<<< HEAD
          Authorization: `Bearer ${user.token}`,
=======
          'Authorization': `Bearer ${user.token}`
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
        },
        body: JSON.stringify(values),
      });

<<<<<<< HEAD
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
      handleClose();
      console.log("Updated user:", updatedUser);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
=======
      if (response.ok) {
        const updatedUser = await response.json();
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
        handleClose();
        console.log("Updated user: ", updatedUser)
      } else {
        console.error("Không thể cập nhật thông tin người dùng");
      }
    } catch (error) {
      console.error("Error:", error);
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
<<<<<<< HEAD
            <Header title="Chỉnh sửa thông tin BQL" />
          </Box>
          <Stack spacing={2} margin={2}>
            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handleSubmit}
=======
            <Header title="Chỉnh sửa thông tin người dùng" />
          </Box>
          <Stack spacing={2} margin={2}>
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
            >
              {({
                values,
                errors,
                touched,
<<<<<<< HEAD
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
=======
                handleBlur,
                handleChange,
                handleSubmit,
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
<<<<<<< HEAD
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
=======
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Họ"
<<<<<<< HEAD
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={touched.firstName && !!errors.firstName}
=======
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Tên"
<<<<<<< HEAD
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt={2}>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang lưu..." : "LƯU"}
                    </Button>
                  </Box>
=======
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
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
                  </Box>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "LƯU"}
                    </Button>
                  </Box>
                  {error && <div>{error}</div>}
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
                </form>
              )}
            </Formik>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

<<<<<<< HEAD
export default EditUser;
=======
export default EditUser;
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
