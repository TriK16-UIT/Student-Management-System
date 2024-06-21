import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useAuthContext } from "../../../context/AuthContext";
import { useGradesContext } from "../../../hooks/useGradeContext";

const PatchGrade = ({ studentId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { user } = useAuthContext();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useGradesContext();

  useEffect(() => {
    if(studentId === null ) return
    dispatch({ type: 'START_EDITING', payload: studentId });

    const fetchGrade = async () => {
        const response = await fetch(`http://localhost:4000/api/grade/${studentId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch grade information");
        }
        const json = await response.json();
        console.log("Fetched grade:", json);
        setStudentData(json);
        setLoading(false);
        dispatch({ type: "GET_GRADE", payload: json });
    };

    fetchGrade();
  }, [studentId, user]);

  const handleFormSubmit = async (values) => {
    if (!user) {
      console.log("You must be logged in");
      return;
    }

    console.log("Submitting values:", values);
      const response = await fetch(`http://localhost:4000/api/grade/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const updatedGrade = await response.json();
        dispatch({ type: "UPDATE_GRADE", payload: updatedGrade });
      } else {
        const errorData = await response.json();
        console.error("Failed to update grade information", errorData);
      }
   
  };

  const initialValues = studentData
    ? {
        score15Min: studentData.score15Min,
        score45Min: studentData.score45Min,
      }
    : {
        score15Min: "",
        score45Min: "",
      };

  const validationSchema = yup.object().shape({
    score15Min: yup.number().required("Vui lòng nhập điểm 15 phút"),
    score45Min: yup.number().required("Vui lòng nhập điểm 45 phút"),
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
      <Header title="Chỉnh sửa Điểm số" />

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
                label="Điểm 15 phút"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleEditChange(e);
                }}
                value={values.score15Min}
                name="score15Min"
                error={!!touched.score15Min && !!errors.score15Min}
                helperText={touched.score15Min && errors.score15Min}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Điểm 45 phút"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  handleEditChange(e);
                }}
                value={values.score45Min}
                name="score45Min"
                error={!!touched.score45Min && !!errors.score45Min}
                helperText={touched.score45Min && errors.score45Min}
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

export default PatchGrade;
