import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useClassContext } from './useClassContext';

export const useSignupClass = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {user} = useAuthContext()

  const { dispatch } = useClassContext();

  const signup = async (name,gradeLevel) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:4000/api/class/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ name,gradeLevel })
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (response.ok) {
      setIsLoading(false);
      dispatch({type: 'CREATE_CLASS', payload: json});
    }
  };

  return { signup, error, isLoading };
};
