import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        if (onClick) {
          onClick();
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    console.log("logout");
    logout();
  };

  const isTeacher = user && user.role === 'teacher';

  const formatRole = (name) => {
    switch (name) {
      case 'teacher':
        return 'Giáo viên';
      case 'admin':
      return 'Ban quản lý';
      default:
        return name;
    }
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ChevronRightIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  QUẢN LÝ HỌC SINH
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
              <Box mb="25px">
                <Box textAlign="center">
                  {user && (
                    <>
                      <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "10px 0 0 0" }}
                      >
                        {user.username}
                      </Typography>
                      <Typography variant="h5" color={colors.purpleAccent[500]}>
                        {formatRole(user.role)}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Trang chủ"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isTeacher && (
            <Item
              title="Người dùng"
              to="/users_management"
              icon={<PeopleOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            )}
            {!isTeacher && (
            <Item
              title="Tiếp nhận học sinh"
              to="/student_admission"
              icon={<Inventory2Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            )}
            {!isTeacher && (
            <Item
              title="Lập danh sách lớp"
              to="/class_list"
              icon={<FolderIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            )}
            {!isTeacher && (
            <Item
              title="Môn học"
              to="/subjects"
              icon={<DocumentScannerIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            )}
            <Item
              title="Tra cứu học sinh"
              to="/student_look_up"
              icon={<SearchIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Nhập bảng điểm môn"
              to="/enter_subject_scores"
              icon={<TextSnippetIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            />
            <Item
              title="Lập bảng tổng kết"
              to="/summary_report"
              icon={<ContentPasteIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isTeacher && (
            <Item
              title="Cài đặt"
              to="/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            )}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            />  
            <Item
              title="Đăng xuất"
              to="/login"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={handleClick}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
