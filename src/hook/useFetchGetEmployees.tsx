import { useEffect, useState } from "react";
import { fetchGetEmployees } from "../services";
import { Employee} from "../types";
import dayjs from "dayjs";


function useFetchGetEmployees() {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
   useEffect(() => {
    const States = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchGetEmployees();
        if (!response) {
          throw new Error("Aucune donnée disponible");
        }
        const formattedResponse = response.map((employee: Employee) => ({
          ...employee,
          startDate: dayjs(employee.startDate),
          dateOfBirth: dayjs(employee.dateOfBirth), 
        }));
        setData(formattedResponse);
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

export default useFetchGetEmployees;