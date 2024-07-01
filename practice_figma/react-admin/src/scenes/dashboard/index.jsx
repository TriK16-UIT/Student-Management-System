import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import { useAuthContext } from "../../context/AuthContext";
import { useStudentInfsContext } from "../../hooks/useStudentContext";
import { useState, useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import ClassIcon from '@mui/icons-material/Class';
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const { studentinfs } = useStudentInfsContext();
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [termData1, setTermData1] = useState({ passRate: 0, passingStudents: 0 });
  const [termData2, setTermData2] = useState({ passRate: 0, passingStudents: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (user && user.token) {
        try {
          const [userResponse, studentResponse, classResponse] = await Promise.all([
            fetch("http://localhost:4000/api/user/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }),
            fetch("http://localhost:4000/api/student/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }),
            fetch("http://localhost:4000/api/class/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }),
          ]);

          if (!userResponse.ok || !studentResponse.ok || !classResponse.ok) {
            throw new Error("Failed to fetch data");
          }

          const users = await userResponse.json();
          const classes = await classResponse.json();

          const teachers = users.filter((user) => user.role === "teacher");
          setTeacherCount(teachers.length);
          setClassCount(classes.length);
        } catch (error) {
          setError("Error fetching data: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchTermData = async (term) => {
        const response = await fetch(`http://localhost:4000/api/report/term/${term}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch term data");
        }
    
        const data = await response.json();
        return data;
    };

    const fetchAllTermData = async () => {
      if (user) {
        try {
          const [data1, data2] = await Promise.all([fetchTermData("I"), fetchTermData("II")]);

          const totalPassingStudents1 = data1.reduce((sum, obj) => sum + (obj.passingStudents || 0), 0);
          const totalPassRate1 = data1.reduce((sum, obj) => sum + (parseFloat(obj.passRate) || 0), 0);
          const averagePassRate1 = totalPassRate1 / data1.length;
          
          const totalPassingStudents2 = data2.reduce((sum, obj) => sum + (obj.passingStudents || 0), 0);
          const totalPassRate2 = data2.reduce((sum, obj) => sum + (parseFloat(obj.passRate) || 0), 0);
          const averagePassRate2 = totalPassRate2 / data2.length;

          setTermData1({
            passRate: averagePassRate1 / 100,
            passingStudents: totalPassingStudents1
          });
  
          setTermData2({
            passRate: averagePassRate2 / 100,
            passingStudents: totalPassingStudents2
          });
          } catch (error) {
            setError("Error fetching term data: " + error.message);
          }
      }
    };
  
    fetchAllTermData();
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const formatScore = (score) => {
    return score.toFixed(2);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Trang chủ" subtitle="Welcome to your dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={studentinfs.length} // count of students
            subtitle="Số lượng học sinh"
            icon={
              <PersonIcon
                sx={{ color: colors.purpleAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={teacherCount} // count of teachers
            subtitle="Số lượng giáo viên"
            icon={
              <BadgeIcon
                sx={{ color: colors.purpleAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={classCount} // count of classes
            subtitle="Số lượng lớp"
            icon={
              <ClassIcon
                sx={{ color: colors.purpleAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Học kỳ 1
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={formatScore(termData1.passRate)}  increase={`${formatScore(termData1.passRate)*100}%`}/>
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              sx={{ mt: "15px" }}
            >
              Số lượng học sinh đạt học kỳ I: {termData1.passingStudents}
            </Typography>
            <Typography>Trung bình số lượng học sinh đạt và tỷ lệ đạt của các lớp</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Học kỳ 2
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={formatScore(termData2.passRate)} increase={`${formatScore(termData2.passRate)*100}%`}/>
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              sx={{ mt: "15px" }}
            >
              Số lượng học sinh đạt học kỳ II: {termData2.passingStudents}
            </Typography>
            <Typography>Trung bình số lượng học sinh đạt và tỷ lệ đạt của các lớp</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
