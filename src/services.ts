
import { User, Employee, Department, States, EmployeeFormValues } from "./types";


export async function fetchGetDepartments(){
    try {
        const response = await fetch(`${import.meta.env.API_URL}/api/employees/departments`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.ok) {
            const data = await response.json() as Department[];
        return data;
        }
        else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}

export async function fetchGetStates(){
    try {
        const response = await fetch(`${import.meta.env.API_URL}/api/employees/states`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.ok) {
            const data = await response.json() as States[];
        return data;
        }
        else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}
export async function fetchGetEmployees() {
    try {
        const response = await fetch(`${import.meta.env.API_URL}/api/employees`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.ok) {
            const data = await response.json() as Employee[];
            return data;
        }
    }
     catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}
export async function fetchGetEmployee(id:number) {
    try {
        const response = await fetch(`import.meta.env.API_URL/api/employees/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.ok) {
            const data = await response.json() as Employee[];
            return data;
        }
    }
     catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}
export async function fetchPostLogin(payload: User) {
    try {
        const response = await fetch(`${import.meta.env.API_URL}/api/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        }
     catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}
export async function fetchPostRefreshAccessToken() {

    try {
        const response = await fetch(`${import.meta.env.API_URL}/api/users/token`, {
            method: 'POST',
            credentials: 'include',  // Inclus les cookies dans la requête
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);  // Met à jour l'access token
        } else {
            console.error('Failed to refresh token');
            fetchPostLogout(); // Si le refresh token n'est plus valide, déconnexion
        }
    } catch (error) {
        console.error('Error during token refresh:', error);
        fetchPostLogout();
    }
}
export async function fetchPostLogout() {

    try {
        const response = await fetch(`${import.meta.env.API_URL}/api/users/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            localStorage.removeItem('accessToken');
            console.log('Logout successful!');
        }
        } catch (error) {
            console.error('Error during logout:', error);
        }
}

export async function handleApiCallWithTokenRefresh<T>(
  apiCall: (token: string) => Promise<T>
): Promise<T> {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token available");
  }

  try {
    // Tente d'exécuter l'appel API avec le token actuel
    return await apiCall(token);
  } catch (error: any) {
      if (error.status === 401 || error.message === "access token expired") {
      console.warn("Access token expired. Attempting to refresh...");

      try {
        // Rafraîchit le token
        await fetchPostRefreshAccessToken();
        const newToken = localStorage.getItem("accessToken");
        if (!newToken) {
          throw new Error("Failed to retrieve refreshed token");
        }
        if (newToken !== token) {
            // Relance l'appel API avec le nouveau token
            return await apiCall(newToken);
        }
 
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        throw refreshError; // Relance l'erreur si la régénération échoue
      }
    }

    // Si l'erreur n'est pas liée au token, relance l'erreur
    throw error;
  }
}

export async function fetchPostNewEmployees(payload: EmployeeFormValues,token:string) {
    try {
        const response = await fetch(`${import.meta.env.API_URL}/api/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const data = await response.json();
        console.log("Response: ", data);
        }
     catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}

export async function fetchDeleteEmployees(payload:number,token:string) {
    try {
        const response = await fetch(`import.meta.env.API_URL/api/employees/${payload}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const data = await response.json();
        return data;
        }
     catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}

export async function fetchPutEmployees(payload:EmployeeFormValues,token:string,id:number) {
    try {
        console.log(payload)
        const response = await fetch(`import.meta.env.API_URL/api/employees/${id}`, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        const data = await response.json();
        return data;
        }
     catch (error) {
        console.error("Error fetching ", error);
        throw error;
    }
    
}