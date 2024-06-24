import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useUserContext } from "../../../../hooks/useUserContext";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

const EditUser = ({ params }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const { dispatch } = useUserContext();
  const { row } = params;
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
  });

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/user/${row._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });

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
            <Header title="Chỉnh sửa thông tin BQL" />
          </Box>
          <Stack spacing={2} margin={2}>
            <Formik
              initialValues={initialValues}
              validationSchema={checkoutSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Họ"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Tên"
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
                </form>
              )}
            </Formik>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUser;
