import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroupTransactions, getGroupUsers } from "./Api";
import AddExpenseModal from "./AddExpenseModal";
export default function GroupTransaction() {
    const location = useLocation();
    const groupCode = location.pathname.split('/')[2];

    const [transactions, setTransactions] = useState([])

    const [users, setUsers] = useState([])

    const [addExpenseModalState, setAddExpenseModalState] = useState(false)

    const openModal = () => setAddExpenseModalState(true);

    const closeModal = () => setAddExpenseModalState(false);

    useEffect(()=>{
        getGroupUsers(groupCode).then((response) => {
          //console.log(response.data);
          setUsers(response.data)
    })
        getGroupTransactions(groupCode).then((response) => setTransactions(response.data.transaction));
        console.log(groupCode);

    }, [])

    return (
        <>
        {
          users.length !== 0 && 
          <AddExpenseModal
            isModalOpen={addExpenseModalState}
            closeModal={closeModal}
            users={users}
            groupCode= {groupCode}
          />
        }
        <div className="flex flex-row justify-end m-4">
        <button
            onClick={openModal}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Add Expense
          </button>
          </div>
        <div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Group Expenses
          </h5>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Recent transactions
          </p>
          <ul class="my-4 space-y-3 h-96 overflow-y-scroll">
          {transactions.map((transaction) => (
              <div>{transaction.transactionDescription}</div>
           
            ))}
            
          </ul>
        </div>
        </>
        )
}