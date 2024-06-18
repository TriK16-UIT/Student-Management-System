import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const  DialogAddStudent = ({ params }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const { row } = params;
  
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px" textAlign="center">
      <Header title="Hồ sơ sinh viên"/>
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
                label="Họ và tên"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  format="DD/MM/YYYY"
                  label="Ngày sinh"
                  value={values.ymd}
                  onChange={(newValue) => {
                    setFieldValue("ymd", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      onBlur={handleBlur}
                      error={!!touched.ymd && !!errors.ymd}
                      helperText={touched.ymd && errors.ymd}
                      
                    />
                  )}
                  sx={{ gridColumn: "span 2" }}
                />
              </LocalizationProvider>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Giới tính</InputLabel>
                <Select
                  label="Giới tính"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gender}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                >
                  <MenuItem value="Nam">Nam</MenuItem>
                  <MenuItem value="Nữ">Nữ</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
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
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {params==="add" && 
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm học sinh
              </Button>
            </Box>
            }
             {params==="edit" && 
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Hoàn tất
              </Button>
            </Box>
            }
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập"),
  ymd: yup.date().required("Vui lòng nhập"),
  gender: yup.string().required("Vui lòng nhập"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập"),
  address: yup.string().required("Vui lòng nhập"),
});

const initialValues = {
  name: "",
  ymd: null,
  gender: "",
  email: "",
  address: "",
};

export default DialogAddStudent;
