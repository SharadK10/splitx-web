import axios from 'axios';


export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "69420",
          },
          withCredentials : true
    },
    
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

export function logout() {
    return apiClient.post("/logout");
}

