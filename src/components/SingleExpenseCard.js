import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { deleteExpense } from "./Api";

export function SingleExpenseCard({ expense, group, sendExpenseDetails, setDeleteExpenseApiCall, deleteExpenseApiCall }) {
  const [owed, setOwed] = useState(0);
  const [involved, setInvolved] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const btnId = `dropdownButton-${expense.id}`;
  const menuId = `dropdownMenu-${expense.id}`;

  const toggleDropdown = () => setIsActive(!isActive);

  const formattedOwed = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(owed);

  const user = useAuth().user;

  useEffect(() => {
    expense.userTransactions.map((txn) => {
      if (txn.user.userId === user.userId) {
        setOwed(parseInt(txn.spent) - parseInt(txn.myShare));
        if (owed === 0 && parseInt(txn.spent) === 0 && parseInt(txn.myShare) === 0) {
          setInvolved(false);
        }
      }
    })
  }, [])

  function handleExpenseDetailsToggle() {

    sendExpenseDetails(expense, group);
  }

  function handleDeleteExpense() {
    const txnId = expense.id;
    const groupCode = group.groupCode;
    deleteExpense(groupCode, txnId).then((res) => {
      console.log("Successfully deleted expense");
      setDeleteExpenseApiCall(!deleteExpenseApiCall);
    }).catch(console.error());
  }

  return (
    <>
      <li>
        <div class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80 px-4 h-fit w-full py-3 rounded-lg border bg-card shadow-sm text-base">
          <div class="w-full flex flex-col gap-1">
            <div class="text-base flex gap-2 justify-between">
              <button
                class="flex flex-1 break-words text-left whitespace-normal"
                onClick={handleExpenseDetailsToggle}
              >
                {expense.transactionDescription}
              </button>
              {owed > 0 && (
                <button
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-xs hover:bg-green-200 dark:bg-green-700 dark:text-white dark:hover:bg-green-600 transition"
                  onClick={handleExpenseDetailsToggle}
                >
                  +<span className="font-bold">{formattedOwed}</span>
                </button>
              )}

              {owed < 0 && (
                <button
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium text-xs hover:bg-red-200 dark:bg-red-700 dark:text-white dark:hover:bg-red-600 transition"
                  onClick={handleExpenseDetailsToggle}
                >
                  <span className="font-bold">{formattedOwed}</span>
                </button>
              )}

              {owed === 0 && (
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium text-xs dark:bg-gray-700 dark:text-gray-300"
                  onClick={handleExpenseDetailsToggle}>
                  {involved ? "Settled Up" : "Not Involved"}
                </button>
              )}
              <div className="relative">
                <button
                  id={btnId}
                  className={`flex items-center justify-center rounded-md text-sm font-medium 
                          h-8 w-8 ${isActive ? 'border border-gray-200' : ''} 
                          hover:bg-accent hover:text-accent-foreground`}
                  type="button"
                  onClick={toggleDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 4 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <circle cx="2" cy="2" r="2"></circle>
                    <circle cx="2" cy="8" r="2"></circle>
                    <circle cx="2" cy="14" r="2"></circle>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isActive && (
                  <div
                    id={menuId}
                    className="absolute right-0 mt-2 z-20 w-44 bg-white dark:bg-gray-700 
                           rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg"
                  >
                    <ul className="py-2 text-sm divide-y divide-gray-100 dark:divide-gray-600">
                      <li>
                        <button
                          onClick={() => { toggleDropdown(); handleDeleteExpense(); }}
                          className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div class="text-muted-foreground font-normal text-xs">
              <div class="w-full flex items-center justify-between">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-3 h-3 inline mx-1"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <span>{new Date(expense.createdDate).toLocaleDateString().split(', ')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
