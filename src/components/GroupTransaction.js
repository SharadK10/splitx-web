import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroupTransactions, getGroupUsers, getGroupDetails } from "./Api";
import AddExpenseModal from "./AddExpenseModal";
import { SingleExpenseCard } from "./SingleExpenseCard";
import ReactCardFlip from "react-card-flip";
import { Dropdown, CopyClipboard } from "flowbite";

import {
  prepareUIPerspectiveResponse,
  simplifyExpenseAlgo,
} from "../service/simplifyExpenseAlgo";
import SimplifiedExpenseComponent from "./SimplifiedExpenseComponent";
import ExpenseDetailsModal from "./ExpenseDetailsModal";
import { SettlementCard } from "./SettlementCard";
import Footer from "./Footer";
import Loader from "./Loader";

export default function GroupTransaction() {
  const location = useLocation();
  const groupCode = location.pathname.split("/")[2];
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [addExpenseModalState, setAddExpenseModalState] = useState(false);
  const [simplifiedExpenseState, setSimplifiedExpenseState] = useState(false);
  const [allSettlements, setAllSettlements] = useState([]);

  const [isFlipped, setIsFlipped] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState();
  const [expenseDetailsModalState, setExpenseDetailsModalState] = useState(false);
  const [joinGroupURL, setJoinGroupURL] = useState("");

  const [isSettleAPICall, setIsSettleAPICalls] = useState(false);

  const [deleteExpenseApiCall, setDeleteExpenseApiCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setAddExpenseModalState(true);
  const closeModal = () => setAddExpenseModalState(false);

  const toggleSimplifiedExpense = () => {
    setSimplifiedExpenseState(!simplifiedExpenseState);
    setIsFlipped(!isFlipped);
  }

  function closeModalExpense() {
    setExpenseDetails(null);
    setExpenseDetailsModalState(false);
  }

  const handleExpenseDetails = (details) => {
    setExpenseDetails(details);
  }

  const fetchGroupDetails = async () => {
    try {
      const res = await getGroupDetails(groupCode);
      setGroup(res.data);
    } catch (e) {
      console.log("Error in fetching group details", e);
    }
  }


  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Fetch group users
      // const userDetail =
      const response = await getGroupUsers(groupCode);
      setUsers(response.data);
      const user = response.data;
      await getGroupTransactions(groupCode).then((response) => {
        const txnList = response.data;
        function sortByDate(txnList, getDate) {
          return txnList.sort((a, b) => {
            const date1 = getDate(a);
            const date2 = getDate(b);
            return date2 - date1;
          });
        }

        const sortedTxnList = sortByDate(txnList, (txn) => {
          return txn.updatedDate ? new Date(txn.updatedDate) : new Date(txn.createdDate);
        });
        setTransactions(sortedTxnList);
        const transaction = response.data;


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

      })
    }
    catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (expenseDetails != null) {
      setExpenseDetailsModalState(true);
    }
  }, [expenseDetails])

  useEffect(() => {
    fetchGroupDetails();
    fetchData();
  }, [addExpenseModalState, isSettleAPICall, deleteExpenseApiCall]);


  const setIsSettleAPICall = (res) => {
    setIsSettleAPICalls(res);
  };

  useEffect(() => {
    const buildJoinGroupURL = process.env.REACT_APP_CLIENT + "/join-group/" + groupCode;
    setJoinGroupURL(buildJoinGroupURL);
    // Set the dropdown menu element
    const $targetEl = document.getElementById("dropdownMenu");
    // Set the element that triggers the dropdown menu on click
    const $triggerEl = document.getElementById("dropdownButton");
    // Options with default values
    const options = {
      placement: "bottom",
      triggerType: "click",
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      ignoreClickOutsideClass: false,
      onHide: () => {

      },
      onShow: () => {

      },
      onToggle: () => {

      },
    };
    // Instance options object
    const instanceOptions = {
      id: "dropdownMenu",
      override: true,
    };
    // Create a new Dropdown object
    const dropdown = new Dropdown(
      $targetEl,
      $triggerEl,
      options,
      instanceOptions
    );

    // Optional: Add event listeners or call methods directly
    $triggerEl.addEventListener("click", () => {
      dropdown.isVisible() ? dropdown.show() : dropdown.hide();
    });

    // set the trigger element such as a button or text field
    const $triggerClipboardEl = document.getElementById(
      "copy-clipboard-button"
    );

    // set the trigger element such as an input field or code block
    const $targetClipboardEl = document.getElementById("copy-text");

    // optional options with default values and callback functions
    const optionsClipboard = {
      contentType: "input",
      htmlEntities: false, // infinite
      onCopy: () => {

        document.getElementById("default-message").classList.add("hidden");
        document.getElementById("success-message").classList.remove("hidden");
      },
    };

    const instanceOptionsClipboard = {
      id: "copy-clipboard-example",
      override: true,
    };

    const clipboard = new CopyClipboard(
      $triggerClipboardEl,
      $targetClipboardEl,
      optionsClipboard,
      instanceOptionsClipboard
    );

    $triggerClipboardEl.addEventListener("click", () => {
      clipboard.copy();
    });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between m-4">
        <button
          onClick={openModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Add Expense
        </button>
        <button
          onClick={toggleSimplifiedExpense}
          className="w-48 ml-4 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {simplifiedExpenseState ? "Group Expense" : "Simplified Settlemets"}
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
          closeModal={closeModalExpense}
          expenseDetails={expenseDetails}
          deleteExpenseApiCall={deleteExpenseApiCall}
          setDeleteExpenseApiCall={setDeleteExpenseApiCall} />
      )}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className={`transition-all ${(addExpenseModalState || expenseDetailsModalState) ? 'blur-sm' : ''}`}>
          <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-start w-full">
              {/* Group Name */}
              <h5 className="text-base font-semibold text-gray-900 md:text-xl dark:text-white break-words max-w-[70%] mb-3">
                {!group ? null : group.groupName}
              </h5>
              {/* --- Added stacked profile pictures --- */}
              <div className="flex -space-x-2">
                {group?.users?.slice(0, 3).map((member, index) => (
                  <img
                    key={index}
                    src={member.user.photo || '/default-avatar.png'}
                    alt={member.user.name || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700"
                  />
                ))}
                {group?.users?.length > 3 && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 
                        text-gray-800 text-xs font-semibold border-2 border-white dark:border-gray-700">
                    +{group.users.length - 3}
                  </div>
                )}
              </div>
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                class="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                  <path
                    d="M14 6.5L9 10"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14 17.5L9 14"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                  <path
                    d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <div
                id="dropdownMenu"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownButton"
                >
                  <li>
                    <div class="w-full max-w-[16rem]">
                      <div class="relative">
                        <label for="copy-text" class="sr-only">
                          Label
                        </label>
                        <input
                          id="copy-text"
                          type="text"
                          class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={joinGroupURL}
                          disabled
                          readonly
                        />
                        <button
                          id="copy-clipboard-button"
                          class="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                        >
                          <span
                            id="default-message"
                            class="inline-flex items-center"
                          >
                            <svg
                              class="w-3 h-3 me-1.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg>
                            <span class="text-xs font-semibold">Copy</span>
                          </span>
                          <span
                            id="success-message"
                            class="hidden inline-flex items-center"
                          >
                            <svg
                              class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 16 12"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5.917 5.724 10.5 15 1.5"
                              />
                            </svg>
                            <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">
                              Copied
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Recent transactions
            </p>
            {isLoading ? <Loader /> : (
              <ul className="my-4 space-y-3 h-96 overflow-y-scroll">
                {transactions.length > 0 ?
                  transactions.map((transaction) => (
                    (transaction.transactionType === "expense" || transaction.transactionType === null) ?
                      <SingleExpenseCard key={transaction.id} expense={transaction} sendExpenseDetails={handleExpenseDetails} setDeleteExpenseApiCall={setDeleteExpenseApiCall} deleteExpenseApiCall={deleteExpenseApiCall} />
                      :
                      <SettlementCard key={transaction.id} expense={transaction} sendExpenseDetails={handleExpenseDetails} setDeleteExpenseApiCall={setDeleteExpenseApiCall} deleteExpenseApiCall={deleteExpenseApiCall} />
                  )) :
                  <div className="flex flex-col justify-center items-center text-gray-500 dark:text-gray-400 font-medium">
                    <img src="../add-expense.svg" alt="Add expense img" className="h-24 w-24" />
                    <div>No expense in this group!</div>
                    <div>Add expense to split and settle.</div>
                  </div>}
              </ul>)}
          </div>
        </div>
        <div className={`transition-all ${(addExpenseModalState || expenseDetailsModalState) ? 'blur-sm' : ''}`}>
          <SimplifiedExpenseComponent allSettlements={allSettlements} groupCode={groupCode} isSettleAPICall={isSettleAPICall} setIsSettleAPICall={setIsSettleAPICall} group={group} />
        </div>
      </ReactCardFlip>
      <Footer />
    </>
  );
}
