const baseUrl = import.meta.env.VITE_ENDPOINT_BACKEND;

export async function getDrivers(id){
    const response = await fetch(baseUrl + "/drivers/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        }
    });
}