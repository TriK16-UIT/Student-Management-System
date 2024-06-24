import { Button, CircularProgress } from "@mui/material";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useUserContext } from "../../../hooks/useUserContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";

const DeleteUser = ({ params }) => {
  const { user } = useAuthContext();
  const { dispatch } = useUserContext();
  const { row } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    setError(null);

    let endpoint = `http://localhost:4000/api/user/${row._id}`;
    if (row.role === "teacher") {
      endpoint = `http://localhost:4000/api/teacher/byUser/${row._id}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_USER", payload: json });
      } else {
        console.error("Failed to delete user", json);
      }
    } catch (error) {
      setError("An error occurred while deleting the user");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={handleDeleteClick}
        endIcon={<DeleteOutlineIcon />}
        disabled={loading}
        sx={{
          backgroundColor: "#f44336",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        }}
      >
        {loading ? <CircularProgress size={24} /> : "XOÁ"}
      </Button>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </>
  );
};

export default DeleteUser;
