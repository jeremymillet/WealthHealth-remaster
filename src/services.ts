import { User, CreateEmployeeRequest, Employee, Department, States, EmployeeFormValues } from "./types";

export async function fetchGetDepartments(){
    try {
        const response = await fetch('http://localhost:3001/api/employees/departments')
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
        const response = await fetch('http://localhost:3001/api/employees/states')
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
        const response = await fetch('http://localhost:3001/api/employees')
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
        const response = await fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
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
export async function fetchPostNewEmployees(payload: EmployeeFormValues,token) {
    console.log(JSON.stringify(payload));
    try {
        const response = await fetch('http://localhost:3001/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
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
        const response = await fetch(`http://localhost:3001/employees/${payload}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token,
            },
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