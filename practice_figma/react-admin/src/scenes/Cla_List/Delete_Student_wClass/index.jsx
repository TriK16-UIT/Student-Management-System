import { Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useClassMemberContext } from "../../../context/ClassMemberContext";

const DeleteStudentID = ({ params }) => {
    const { dispatch } = useClassMemberContext();
    const { user } = useAuthContext();
    const { row } = params;

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/student/${row._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ "ClassID": "" }) // Sending body to update ClassID
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_CLASS_MEMBER', payload: json });
            } else {
                console.error("Failed to update student:", json.error);
            }
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={handleDeleteClick}
            endIcon={<DeleteOutlineIcon />}
            sx={{
                backgroundColor: '#f44336',
                '&:hover': {
                    backgroundColor: '#d32f2f',
                },
            }}
        >
            Xóa
        </Button>
    );
};

export default DeleteStudentID;
