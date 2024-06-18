import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useSignup } from "../../../hooks/useSignupTeacher";

const TeacherSignUp = ({ params }) => {
  const { signup, error, isLoading } = useSignup(); // Adjust hook function based on your implementation
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    await signup(
      values.firstName,
      values.lastName,
      values.email,
      values.username,
      values.password,
      values.role, // Ensure role is passed here
      values.subjectName,
    );

    console.log(values);
  };

  return (
    <Box m="20px" textAlign="center">
      <Header title="Thêm giáo viên" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={teacherSchema}
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
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Mật khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Môn học</InputLabel>
                <Select
                  label="Môn học"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subjectName}
                  name="subjectName"
                  error={!!touched.subjectName && !!errors.subjectName}
                >
                  <MenuItem value="Math">Toán</MenuItem>
                  <MenuItem value="Physics">Vật lý</MenuItem>
                  <MenuItem value="History">Lịch sử</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="hidden"
                value="teacher"
                name="role"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ display: 'none' }} 
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isLoading}
              >
                Thêm giáo viên
              </Button>
            </Box>
            {error && <div>{error}</div>}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const teacherSchema = yup.object().shape({
  firstName: yup.string().required("Vui lòng nhập"),
  lastName: yup.string().required("Vui lòng nhập"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập"),
  username: yup.string().required("Vui lòng nhập"),
  password: yup.string().required("Vui lòng nhập"),
  subjectName: yup.string().required("Vui lòng nhập tên môn học"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  subjectName: "",
  role: "teacher",
};

export default TeacherSignUp;
