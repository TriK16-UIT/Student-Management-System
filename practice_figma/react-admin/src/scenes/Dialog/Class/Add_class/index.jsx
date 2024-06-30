import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useSignupClass } from "../../../../hooks/useSignupClass";

const DialogAddClass = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const { signup, error, isLoading } = useSignupClass();

  const handleFormSubmit = async (values) => {
    await signup(values.name, values.gradeLevel);
    console.log(values)
  };

  return (
    <Box m="20px" textAlign="center">
      <Header title="Thêm Lớp"/>
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
                label="Khối"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gradeLevel}
                name="gradeLevel"
                error={!!touched.gradeLevel && !!errors.gradeLevel}
                helperText={touched.gradeLevel && errors.gradeLevel}
                sx={{ gridColumn: "span 4" }}
              />
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
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={isLoading}>
                Thêm lớp
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
  name: yup.string().required("Vui lòng nhập"),
  gradeLevel: yup.string().required("Vui lòng nhập"),
});

const initialValues = {
  name: "",
  gradeLevel: "",
};

export default DialogAddClass;
