import { useEffect, useState } from "react";
import { fetchGetStates } from "../services";
import { State } from "../types";



function useFetchGetStates() {
  const [data, setData] = useState<State[]>([]);
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
          setError(err); // Définir l'erreur si elle est valide
        } else {
          setError(new Error(String(err))); // Créez une nouvelle erreur si ce n'est pas le cas
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