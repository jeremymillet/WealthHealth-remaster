import {  useState } from "react";
import { User } from "../types";
import { fetchPostLogin } from "../services";

function useFetchPostLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   
    const postLogin = async (data:User) => {
      setIsLoading(true);
      setError(null);
        try {
        
        const response = await fetchPostLogin(data);
        console.log(response);
      } catch (err:unknown) {
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
      
  return {postLogin,isLoading, error};
}

export default useFetchPostLogin;