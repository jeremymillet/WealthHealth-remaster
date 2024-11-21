import { useState } from "react";
import { fetchPostNewEmployees, handleApiCallWithTokenRefresh } from "../services";
import { EmployeeFormValues } from "../types";



function useFetchPostEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   
  
  


  const postEmployee = async (data:EmployeeFormValues) => {
    setIsLoading(true);
    setError(null);
      try {
        await handleApiCallWithTokenRefresh((token) =>
          fetchPostNewEmployees(data, token)
        )
        console.log("Nouvel employé créé avec succès");
    } catch (err:unknown) {
      console.error("Erreur lors de la récupération des données de l'utilisateur:", err);
        if (err instanceof Error) {
        setError(err); 
      } else {
        setError(new Error(String(err))); 
      }
    } finally {
      setIsLoading(false);
    }
  };
      
  return {postEmployee,isLoading, error};
}

export default useFetchPostEmployee;