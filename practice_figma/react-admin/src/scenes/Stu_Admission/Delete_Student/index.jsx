import { Button } from "@mui/material";
import { useAuthContext } from "../../../hooks/useAuthContext"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useStudentInfsContext } from "../../../hooks/useStudentContext";

const DeleteStudent = ({ params }) => {
    const { dispatch } = useStudentInfsContext();
    const { user } = useAuthContext()
    
    const { row } = params;

    const handleDeleteClick = async () => {
        if(!user){
            return
        }

        const response = await fetch(`http://localhost:4000/api/student/${row._id}`, {
            method: 'DELETE',
            headers: {
            'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok){
            dispatch({type: 'DELETE_STUDENTINF', payload: json});
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
                XOÁ
            </Button>
            {/* <Link to ={`/dashboard/home/${row.id}`} >
            <Button
                type="button"
                color="primary"
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                    marginLeft: 1,
                }}
            >
                UPDATE
            </Button>
            </Link> */}
        </>
    );
};

export default DeleteStudent;
