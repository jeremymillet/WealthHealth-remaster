import { useEffect, useState } from "react";
import { fetchGetStates } from "../services";
import { States } from "../types";




function useFetchGetStates() {
  const [data, setData] = useState<States[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   useEffect(() => {
    const States = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchGetStates();
        setData(response);
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
    States()    
  }, []); 
  return { data, isLoading, error};
}

export default useFetchGetStates;