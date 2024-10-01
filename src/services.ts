export async function fetchGetDepartments(){
    try {
        const response = await fetch('http://localhost:3001/departments')
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.ok) {
            const data = await response.json();
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
        const response = await fetch('http://localhost:3001/states')
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.ok) {
            const data = await response.json();
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