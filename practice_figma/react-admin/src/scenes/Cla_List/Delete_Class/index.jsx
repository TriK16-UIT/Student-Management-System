import { Button } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useClassContext } from "../../../hooks/useClassContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

const DeleteClass = ({ params }) => {
    const { dispatch } = useClassContext();
    const { user } = useAuthContext()
    const { row } = params;
    const handleDeleteClick = async () => {
        if(!user){
            return
        }

        const response = await fetch(`http://localhost:4000/api/class/${row._id}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok){
            dispatch({type: 'DELETE_CLASS', payload: json});
        }
    };
  

    return (  
        <> 
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
        </>
    );
};

export default DeleteClass;
