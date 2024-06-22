import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography, Paper, Switch } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-checked': {
      color: theme.palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    border: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiSwitch-track': {
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isToggled, setIsToggled] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setIsToggled(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSuccess = await login(username, password);
    if (isSuccess) {
      navigate(`/`)
    }
  };

  return (
    <Paper elevation={0} sx={{ backgroundColor: colors.blueAccent[400], height: '100vh' }}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Paper elevation={3} sx={{ padding: 4, width: '600px', textAlign: 'center' }}>
          <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8, mx: 4 }}>
              <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={isToggled ? `../../assets/Screenshot 2024-06-19 232207.png` : `../../assets/608-6081199_teacher-registration-anastasia-beverly-hills-logo-vector-hd.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Typography component="p" variant="subtitle1" color={colors.grey[500]}>
                Xin vui lòng nhập thông tin bên dưới
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  margin="normal"
                  required
                  id="username"
                  label="Tên đăng nhập"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <Grid container>
                  <Grid item xs>
                    <FormControlLabel
                      control={<Checkbox value="remember" sx={{ color: colors.purpleAccent[500] }} />}
                      label="Remember me"
                    />
                  </Grid>
                  <Grid item xs>
                    <Button href="#" variant="body2">
                      Forgotten Password
                    </Button>
                  </Grid>
                </Grid> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: colors.purpleAccent[500] }}
                  disabled={isLoading}
                >
                  Login
                </Button>
              </Box>
            </Box>
            {error && <div>{error}</div>}
          </Grid>
        </Paper>
      </Box>
    </Paper>
  );
};

export default LoginPage;
