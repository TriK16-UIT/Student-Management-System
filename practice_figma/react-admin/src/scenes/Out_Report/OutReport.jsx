import React from 'react';
import { Box, Paper, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';


const OutReport = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  
  const handleCardClick = (route) => {
    navigate(`/summary_report/${route}`);
  };

  return (
    <div>
      <Box m="20px">
        <Header title="Lập bảng báo cáo tổng kết"/>
      </Box>
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
  
        <Paper elevation={3} sx={{ padding: 4, width: '600px', textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card
                sx={{
                  maxWidth: 300,
                  backgroundColor: colors.purpleAccent[500],
                  cursor: 'pointer' 
                }}
                onClick={() => handleCardClick("semester")} // Handle click event
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="../../assets/Tổng kết học kỳ@2x.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Học kỳ
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  maxWidth: 300,
                  backgroundColor: colors.purpleAccent[500],
                  cursor: 'pointer'
                }}
                onClick={() => handleCardClick("subject")}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image="../../assets/Tổng kết môn học@2x.png"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Môn học
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default OutReport;
