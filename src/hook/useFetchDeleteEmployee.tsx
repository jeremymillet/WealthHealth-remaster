import { useState } from "react";
import useAuthContext from "../context/hook/useAuthContext";
import { fetchDeleteEmployees } from "../services";



function useFetchDeleteEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   
  const {token} = useAuthContext();
  


    const deleteEmployee = async (data:number) => {
      setIsLoading(true);
      setError(null);
        try {
          await fetchDeleteEmployees(data, token);
          console.log("Employé supprimé avec succès");

      } catch (err:unknown) {
        console.error("Erreur lors de la supression des données de l'utilisateur:", err);
         if (err instanceof Error) {
          setError(err); 
        } else {
          setError(new Error(String(err))); 
        }
      } finally {
        setIsLoading(false);
      }
    };
      
  return {deleteEmployee,isLoading, error};
}

export default useFetchDeleteEmployee;