import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useStudentInfsContext } from './useStudentContext';

export const useSignupStudent = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useStudentInfsContext();
  const {user} = useAuthContext()

  const signup = async (firstName, lastName, dateOfBirth, address, email, gender) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ firstName, lastName, dateOfBirth, address, email, gender })
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      setIsLoading(false);
      dispatch({type: 'CREATE_STUDENTINF', payload: json});
    }
  };

  return { signup, error, isLoading };
};
