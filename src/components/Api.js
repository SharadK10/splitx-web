import axios from 'axios';


const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers: {
            'Content-Type': 'application/json',
          },
        
    },
    
);

export function retriveAllGroupsApi() {
    return apiClient.get("/home/1");
}

export function createGroupApi(groupName) {
    return apiClient.post("/home/1/create-group", {groupName:groupName})
}

export function joinGroupApi(groupCode) {
    return apiClient.post("/home/1/join-group", {groupCode:groupCode})
}

export function getGroupTransactions(groupCode) {
    return apiClient.get("/api/group/"+groupCode);
}