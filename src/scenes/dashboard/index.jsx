import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Emailed";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Button 
        sx = {{ 
          backgroundColor: color.BlueAccent[700], 
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
      }}
      >
        <DownloadOutlinedIcon sx = {{ mr: "10px"}} />
        Tải báo cáo
      </Button>
    </Box>

    {/* GRID SYSTEM */}
    <Box
      display = "grid"
      gridTemplateColumns = "repeat(12, 1fr)"
      gap = "20px"
      gridAutoRows = "140px"
    > 
      {/* ROW 1 */}
      <Box 
        gridColumn = "span 3" 
        backgroundColor = {color.primary[400]}
        display = "flex" 
        alignItems= "center" 
        justifyContent = "center"
      >

      </Box>
    </Box>
    );
}
export default Dashboard;