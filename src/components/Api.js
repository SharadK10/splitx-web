import axios from 'axios';


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
        // Return the response directly if it's successful
        return response;
    },
    (error) => {
        // Check if the error response status is 401 or 403
        // localStorage.removeItem('isAuthenticated', 'true');
        // localStorage.removeItem('userDetails');
        //  window.location('/login?logout');
        // if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // }
        // Return the error to the next catch block
        return Promise.reject(error);
    }
);


export function retriveAllGroupsApi() {
    return apiClient.get("/api/get-groups");
}

export function createGroupApi(groupName) {
    return apiClient.post("/api/create-group", {groupName:groupName})
}

export function joinGroupApi(groupCode) {
    console.log(groupCode);
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

