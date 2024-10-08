import {  useState } from "react";
import { fetchPostNewEmployees } from "../services";
import { EmployeeToDB } from "../types";

function useFetchPostEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   
    const postEmployee = async (data:EmployeeToDB) => {
      setIsLoading(true);
      setError(null);
        try {
        
        const response = await fetchPostNewEmployees(data);
        console.log(response);
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