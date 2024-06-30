import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useSubjectContext } from "../../../hooks/useSubjectContext";
import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";

const DialogAddSubject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { dispatch } = useSubjectContext();

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/subject/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(values)
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      setError("Thêm môn học thành công");
      setIsLoading(false);
      dispatch({ type: 'CREATE_SUBJECT', payload: json });
    }
  };

  return (
    <Box m="20px" textAlign="center">
      <Header title="Thêm môn học" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
              <Button type="submit" color="secondary" variant="contained" disabled={isLoading}>
                Thêm môn học
              </Button>
            </Box>
            {error && <div>{error}</div>}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập môn học"),
});

const initialValues = {
  name: "",
};

export default DialogAddSubject;
