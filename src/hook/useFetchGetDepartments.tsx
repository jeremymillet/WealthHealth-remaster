import { useEffect, useState } from "react";
import { fetchGetDepartments } from "../services";
import { Department } from "../types";


function useFetchGetDepartments() {
    const [data, setData] = useState<Department[]>([]);
    const [isloaging, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
  useEffect(() => {
      async function getDepartments() {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetchGetDepartments();
          setData(response);  
        } catch (err) {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", err);
         if (err instanceof Error) {
          setError(err); 
        } else {
          setError(new Error(String(err))); 
        }
        } finally {
          setIsLoading(false);
        }
      }

    getDepartments();
  }, []);
  return { data, isloaging, error};
}

export default useFetchGetDepartments;