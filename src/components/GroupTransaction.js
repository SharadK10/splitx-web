import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGroupTransactions } from "./Api";
export default function GroupTransaction() {
    const location = useLocation();
    const groupCode = location.pathname.split('/')[2];


    useEffect(()=>{
        getGroupTransactions(groupCode).then((response) => console.log(response)).catch((err)=>console.error(err));
        console.log(groupCode);

    })
    return (
        <div>
        </div>
        )
}