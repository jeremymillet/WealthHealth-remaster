import {  useContext, useState } from "react";
import { fetchPostNewEmployees } from "../services";
import { EmployeeToDBConvert } from "../types";
import { TokenContext } from "../context/TokenContext";

function useFetchPostEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   
  const tokenContext = useContext(TokenContext);
  const { token } = tokenContext;


    const postEmployee = async (data:EmployeeToDBConvert) => {
      setIsLoading(true);
      setError(null);
        try {
          await fetchPostNewEmployees(data, token);
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