import { Box, Typography } from "@mui/material";
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

  useEffect(() => {
    const fetchData = async () => {
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
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchTermData = async (term) => {
      try {
        const response = await fetch(`http://localhost:4000/api/report/term/${term}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch term data");
        }

        return response.json();
      } catch (error) {
        console.error("Error fetching term data:", error);
        return { passRate: [], passingStudents: [] };
      }
    };

    const fetchAllTermData = async () => {
      if (user) {
        const [data1, data2] = await Promise.all([fetchTermData("I"), fetchTermData("II")]);

        console.log(data1)
        console.log(data2)
        const averagePassRate1 = data1.passRate?.reduce((a, b) => a + b, 0) / (data1.passRate?.length || 1);
        const averagePassRate2 = data2.passRate?.reduce((a, b) => a + b, 0) / (data2.passRate?.length || 1);

        const averagePassingStudents1 = data1.passingStudents?.reduce((a, b) => a + b, 0) / (data1.passingStudents?.length || 1);
        const averagePassingStudents2 = data2.passingStudents?.reduce((a, b) => a + b, 0) / (data2.passingStudents?.length || 1);
        
        console.log("pass av", averagePassingStudents1)
        setTermData1({
          passRate: averagePassRate1 / 10,
          passingStudents: averagePassingStudents1
        });
        setTermData2({
          passRate: averagePassRate2 / 10,
          passingStudents: averagePassingStudents2
        });
      }
    };

    fetchAllTermData();
  }, [user]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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
            <ProgressCircle size="125" progress={termData1.passRate || 1} increase="+14%"/>
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              sx={{ mt: "15px" }}
            >
              {termData1.passingStudents} Số lượng Đạt Học kỳ 1
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
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
            <ProgressCircle size="125" progress={termData2.passRate || 1} />
            <Typography
              variant="h5"
              color={colors.purpleAccent[500]}
              sx={{ mt: "15px" }}
            >
              {termData2.passingStudents} Số lượng Đạt Học kỳ 2
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
