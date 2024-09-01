import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroupTransactions, getGroupUsers } from "./Api";
import AddExpenseModal from "./AddExpenseModal";
import { SingleExpenseCard } from "./SingleExpenseCard";
import ReactCardFlip from 'react-card-flip';

import {
  prepareUIPerspectiveResponse,
  simplifyExpenseAlgo,
} from "../service/simplifyExpenseAlgo";
import SimplifiedExpenseComponent from "./SimplifiedExpenseComponent";
import ExpenseDetailsModal from "./ExpenseDetailsModal";

export default function GroupTransaction() {
  const location = useLocation();
  const groupCode = location.pathname.split("/")[2];
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [addExpenseModalState, setAddExpenseModalState] = useState(false);
  const [simplifiedExpenseState, setSimplifiedExpenseState] = useState(false);
  const [allSettlements, setAllSettlements] = useState([]);
  const [isFlipped,setIsFlipped] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState();
  const [expenseDetailsModalState, setExpenseDetailsModalState] = useState(false);

  const openModal = () => setAddExpenseModalState(true);
  const closeModal = () => setAddExpenseModalState(false);

  const toggleSimplifiedExpense = () => {
    setSimplifiedExpenseState(!simplifiedExpenseState);
    setIsFlipped(!isFlipped);
  }

  function toggleExpenseDetailsModal() {
      setExpenseDetailsModalState(!expenseDetailsModalState);
  } 

  const handleExpenseDetails = (details) => {
    console.log("details", details);
    setExpenseDetails(details);
    console.log("here",expenseDetails);
  }

  const fetchData = async () => {
    try {
      const response = await getGroupUsers(groupCode);
      setUsers(response.data);
      const user = response.data;      
      await getGroupTransactions(groupCode).then((response) => {
        setTransactions(response.data.transaction);
        const transaction = response.data.transaction;

        const repayments = transaction.map((data) => {
          return data.repayments;
        });


        const netPayments = {};

        const addPayments = (userId, userObj, amount) => {
          if (netPayments[userId]) {
            // If userId exists, just add the amount to the existing amount
            netPayments[userId].amount += amount;
          } else {
            // If userId doesn't exist, add userObj and the initial amount
            netPayments[userId] = { ...userObj, amount };
          }
        };
        // [ [], [] ] 2D array into 1D array
        var allRepayemnts = [];
        repayments.map((data) => {
          data.map((d) => {
            allRepayemnts.push(d);
          });
        });

        allRepayemnts.map((data) => {
          addPayments(data.from.userId, data.from, -1 * data.amount);
          addPayments(data.to.userId, data.to, data.amount);
        });
        
        const result = simplifyExpenseAlgo(netPayments);
        const result2 = prepareUIPerspectiveResponse(result, user);
        setAllSettlements(result2);
      });
      console.log(groupCode);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };

  useEffect(() => {
    fetchData();
  },[addExpenseModalState]);

  useEffect(() => {
    if(expenseDetails != null) {
      console.log("fsd",expenseDetails);
      toggleExpenseDetailsModal();
    }
  },[expenseDetails])

  console.log("allSettlements1", allSettlements);


  return (
  <>
      <div className="flex flex-row justify-end m-4 w-">
        <button
          onClick={openModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Add Expense
        </button>
        <button
          onClick={toggleSimplifiedExpense}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
            {simplifiedExpenseState ? ("Group Expense") : ("Simplified Settlemets")}
        </button>
        
      </div>
      {users.length !== 0 && (
        <AddExpenseModal
          isModalOpen={addExpenseModalState}
          closeModal={closeModal}
          users={users}
          groupCode={groupCode}
        />
      )}
      {expenseDetailsModalState && (
        <ExpenseDetailsModal
        closeModal={toggleExpenseDetailsModal}
        expenseDetails={expenseDetails} />
      )}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
          Group Expenses
        </h5>
       <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Recent transactions
      </p>
      <ul className="my-4 space-y-3 h-96 overflow-y-scroll">
        {transactions.map((transaction) => (
          <SingleExpenseCard key={transaction.id} expense={transaction} toggleExpenseDetailsModal={toggleExpenseDetailsModal} sendExpenseDetails={handleExpenseDetails} />
        ))}
      </ul>
      </div>

      <SimplifiedExpenseComponent
        allSettlements={allSettlements}
      />
    </ReactCardFlip>
    </>
  );
}