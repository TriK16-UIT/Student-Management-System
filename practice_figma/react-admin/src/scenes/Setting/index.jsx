import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useAuthContext } from "../../context/AuthContext";
import { useConfigContext } from "../../hooks/useConfigContext";

const SettingPage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useAuthContext();
  const { config, dispatch } = useConfigContext();
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/config/', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch configuration");
        }
        const json = await response.json();
        dispatch({ type: "SET_CONFIG", payload: json });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching configuration:", error);
        setLoading(false);
      }
    };

    fetchConfig();
  }, [user, dispatch]);

  const handleFormSubmit = async (values) => {
    if (!user) {
      console.log("You must be logged in");
      return;
    }

    console.log("Submitting values:", values);
    const response = await fetch('http://localhost:4000/api/config/', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const updatedConfig = await response.json();
      dispatch({ type: "UPDATE_CONFIG", payload: updatedConfig });
    } else {
      const errorData = await response.json();
      console.error("Failed to update configuration", errorData);
    }
  };

  const initialValues = config
    ? {
        minAge: config.minAge,
        maxAge: config.maxAge,
        maxClassSize: config.maxClassSize,
        passingGrade: config.passingGrade,
      }
    : {
        minAge: "",
        maxAge: "",
        maxClassSize: "",
        passingGrade: "",
      };

  const validationSchema = yup.object().shape({
    minAge: yup.number().required("Vui lòng nhập tuổi tối thiểu"),
    maxAge: yup.number().required("Vui lòng nhập tuổi tối đa"),
    maxClassSize: yup.number().required("Vui lòng nhập sĩ số lớp tối đa"),
    passingGrade: yup.number().required("Vui lòng nhập điểm đạt"),
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box m="20px" mb="20px">
      <Header title="Thay đổi qui định" subtitle="Changing Rules" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
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
                type="number"
                label="Tuổi tối thiểu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.minAge}
                name="minAge"
                error={!!touched.minAge && !!errors.minAge}
                helperText={touched.minAge && errors.minAge}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Tuổi tối đa"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maxAge}
                name="maxAge"
                error={!!touched.maxAge && !!errors.maxAge}
                helperText={touched.maxAge && errors.maxAge}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Sĩ số lớp tối đa"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maxClassSize}
                name="maxClassSize"
                error={!!touched.maxClassSize && !!errors.maxClassSize}
                helperText={touched.maxClassSize && errors.maxClassSize}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Điểm đạt"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.passingGrade}
                name="passingGrade"
                error={!!touched.passingGrade && !!errors.passingGrade}
                helperText={touched.passingGrade && errors.passingGrade}
                sx={{ gridColumn: "span 2" }}
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

export default SettingPage;
