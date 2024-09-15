import axios from 'axios';
import { navigate } from 'react-router-dom';

export const apiClient = axios.create(
    {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420",
          },
          withCredentials : true
    },
    
);
// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    }, 
    async(error) => {
        // Check if the error response status is 401 or 403
        if (error.response && (error.message === "Request failed with status code 401")) {
            localStorage.removeItem('isAuthenticated', 'true');
            localStorage.removeItem('userDetails');
            window.location.href = 'http://localhost:3000/login?logout';
        } 
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(error);
            }, 400);
          });
    }
);


export function retriveAllGroupsApi() {
    return apiClient.get("/api/get-groups");
}

export function createGroupApi(groupName) {
    return apiClient.post("/api/create-group", {groupName:groupName})
}

export function joinGroupApi(groupCode) {
    return apiClient.post("/api/join-group", {groupCode:groupCode})
}

export function getGroupTransactions(groupCode) {
    return apiClient.get("/api/group/"+groupCode);
}

export function getGroupUsers(groupCode) {
    return apiClient.get("/api/group/"+groupCode+"/users");
}

export function addExpenseApi(requestBody) {
    return apiClient.post("/api/add-expense" ,requestBody   );
}

export function getUserDetailsApi() {
    return apiClient.get("/api/get-user-details");
}

export function authenticateUserApi() {
    return apiClient.get("/api/user/");
}

export function deleteExpense(id) {
    return apiClient.put("/api/delete-transaction/"+id);
}

export function logout() {
    return apiClient.post("/logout");
}

