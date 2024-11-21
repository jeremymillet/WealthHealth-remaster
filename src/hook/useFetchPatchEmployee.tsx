import { useState } from "react";
import {fetchPutEmployees, handleApiCallWithTokenRefresh } from "../services";
import { EmployeeFormValues } from "../types";


function useFetchPutEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   
  const PutEmployee = async (id:number,data:EmployeeFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
        await handleApiCallWithTokenRefresh((token) =>
          fetchPutEmployees(data, token,id)
        )
        console.log("Employé update avec succès");

    } catch (err:unknown) {
      console.error("Erreur lors de l'update des données de l'utilisateur:", err);
        if (err instanceof Error) {
        setError(err); 
      } else {
        setError(new Error(String(err))); 
      }
    } finally {
      setIsLoading(false);
    }
  };
      
  return {PutEmployee,isLoading, error};
}

export default useFetchPutEmployee;