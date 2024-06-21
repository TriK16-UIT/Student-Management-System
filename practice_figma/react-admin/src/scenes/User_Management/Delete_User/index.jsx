import { Button, CircularProgress } from "@mui/material";
import { useAuthContext } from "../../../context/AuthContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";

const DeleteUser = ({ params }) => {
  const { user, dispatch } = useAuthContext();
  const { row } = params;
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = async () => {
    if (!user) {
      return; // If no user is logged in, do nothing
    }

    setLoading(true); // Set loading state when deletion starts

    try {
      const response = await fetch(`http://localhost:4000/api/user/${row._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const json = await response.json();

      // If deletion is successful, update state (optional based on your implementation)
      dispatch({ type: "DELETE_USER", payload: json });
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error gracefully (e.g., show an error message)
    } finally {
      setLoading(false); // Reset loading state after deletion attempt
    }
  };

  return (
    <Button
      type="button"
      color="primary"
      variant="contained"
      onClick={handleDeleteClick}
      endIcon={<DeleteOutlineIcon />}
      disabled={loading} // Disable button when deletion is in progress
      sx={{
        backgroundColor: "#f44336",
        "&:hover": {
          backgroundColor: "#d32f2f",
        },
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : "DELETE"}
    </Button>
  );
};

export default DeleteUser;
