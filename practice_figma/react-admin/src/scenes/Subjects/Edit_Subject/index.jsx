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

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useSubjectContext } from "../../../hooks/useSubjectContext";

const DialogUpdateSubject = ({ subjectId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { dispatch } = useSubjectContext();
  const { user } = useAuthContext();
  const [subjectData, setsubjectData] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
  
  useEffect(() => {
    const fetchSubjectInf = async () => {
        const response = await fetch(`http://localhost:4000/api/subject/${subjectId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch subject information");
        }
        const json = await response.json();
        setsubjectData(json);
    };

    fetchSubjectInf();
  }, [subjectId, user, dispatch]);

  const handleFormSubmit = async (values) => {
      const response = await fetch(`http://localhost:4000/api/subject/${subjectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      if (response.ok) {
        setIsLoading(false);
        setError("Chỉnh sửa thành công");
        dispatch({ type: "UPDATE_SUBJECT", payload: json });
      } else {
        setIsLoading(false);
        setError(json.error);
      }
  };

  
  const initialValues = subjectData
    ? {
        name: formatSubjectName (subjectData.name),
      }
    : {
        name: "",
      };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập"),
  });

  return (
    <Box m="20px" textAlign="center">
      <Header title="Chỉnh sửa môn học" />
      
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
          handleSubmit,
          handleChange
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
                label="Tên môn học"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disable={isLoading}>
                Hoàn tất
              </Button>
            </Box>
            {error && <div>{error}</div>}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DialogUpdateSubject;
