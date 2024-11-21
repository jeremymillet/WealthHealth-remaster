import { useState } from "react";
import useAuthContext from "../context/hook/useAuthContext";
import { fetchPostLogout } from "../services";

function useFetchPostLogout() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const {logOut} = useAuthContext();
  
 
   
    const postLogout = async () => {
      setIsLoading(true);
      setError(null);
        try {
            await fetchPostLogout();
            logOut()
        }
        catch (err: unknown) {
        console.error("Erreur lors de la l'envoi", err);
         if (err instanceof Error) {
          setError(err); 
        } else {
          setError(new Error(String(err))); 
        }
      } finally {
        setIsLoading(false);
      }
    };
      
  return {postLogout,isLoading, error};
}

export default useFetchPostLogout;