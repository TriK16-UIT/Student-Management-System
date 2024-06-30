import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import DialogAddSubject from "./Add_Subject";
import DialogUpdateSubject from "./Edit_Subject"

import { useEffect, useState } from "react";

import { useAuthContext } from "../../context/AuthContext";
import { useSubjectContext } from "../../hooks/useSubjectContext";

const Subjects = () => {
  const { subjects, dispatch } = useSubjectContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuthContext();
  const [selectedSubjectId, setSelectedSubjectId] = useState(null); 
  const [dialogState, setDialogState] = useState(null);
  const [open, setOpen] = useState(false);
  
  const [boxHeight, setBoxHeight] = useState(400); 
  
  const handlePageSizeChange = (newPageSize) => {
    setBoxHeight(newPageSize * 52 + 110); 
  };

  const handleOpen = (state, id = null) => {
    setDialogState(state);
    setSelectedSubjectId(id); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubjectId(null); 
    setDialogState(null);
  };

  const formatSubjectName = (name) => {
    switch (name.toLowerCase()) {
      case "math":
        return "Toán";
      case "physics":
        return "Vật lý";
      case "chemistry":
        return "Hóa học";
      case "biology":
        return "Sinh học";
      case "history":
        return "Lịch sử";
      case "geography":
        return "Địa lý";
      case "literature":
        return "Ngữ văn";
      case "ethics":
        return "Giáo dục công dân";
      case "pe":
        return "Thể dục";
      default:
        return name;
    }
  };
  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/subject/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data = await response.json();
        dispatch({ type: 'SET_SUBJECTS', payload: data });
      } catch (error) {
        console.error("Error fetching subjects:", error);
      
      }
    };
    if (user) {
      fetchSubjects();
    }
  }, [dispatch, user]);

  const rows = subjects ? subjects.map((subject, index) => ({
    id: index + 1,
    _id: subject._id, 
    name: formatSubjectName(subject.name),
  })) : [];

  const handleDeleteClick = async (id) => {
    const response = await fetch(`http://localhost:4000/api/subject/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_SUBJECT', payload: json });
    }
  };

  const columns = [
    { field: "id", headerName: "STT", width: 90 },
    {
      field: "name",
      headerName: "Tên môn học",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => handleDeleteClick(params.row._id)}
              endIcon={<DeleteOutlineIcon />}
              sx={{
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              XOÁ
            </Button>
            <Button
              type="button"
              color="primary"
              variant="contained"
              endIcon={<EditIcon />}
              onClick={() => {
                handleOpen("editSubject", params.row._id)
              }}
              sx={{
                marginLeft: 1,
                backgroundColor: '#4CCEAC',
                '&:hover': {
                  backgroundColor: '#36917A',
                }
              }}
            >
              Chỉnh sửa
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px" mb="20px">
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            backgroundColor: colors.purpleAccent[500],
          }}
        >
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon style={{ color: colors.primary[500] }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.grey[700],
          }}
        >
          <Stack spacing={2} margin={2}>
            {dialogState === "editSubject" && selectedSubjectId ? (
              <DialogUpdateSubject subjectId={selectedSubjectId} />
            ) : (
              <DialogAddSubject />
            )}
          </Stack>
        </DialogContent>
      </Dialog>
      <Header title="Môn học" subtitle="Subjects" />

      <Box display="flex" justifyContent="space-between" mb="20px">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpen("addSubject")}
        >
          Thêm môn học
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height={boxHeight}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            // color: colors.redAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.purpleAccent[500],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.purpleAccent[500],
          },
        }}
      >
        <DataGrid 
          rows={rows} 
          columns={columns} 
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Box>
  );
};

export default Subjects;
