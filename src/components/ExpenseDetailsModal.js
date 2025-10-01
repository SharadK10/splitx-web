import { deleteExpense } from "./Api";

export default function ExpenseDetailsModal({ closeModal, expenseDetails, deleteExpenseApiCall, setDeleteExpenseApiCall }) {
    const details = expenseDetails.userTransactions;
    var totalExpense = 0;
    details.map((txn) => {
        return totalExpense += txn.spent;
    })
    const formattedExpense = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(totalExpense);

    function handleDeleteExpense() {
        const txnId = expenseDetails.id;
        deleteExpense(txnId).then((res) => {
            console.log("Successfully deleted expense");
            setDeleteExpenseApiCall((deleteExpenseApiCall) => !deleteExpenseApiCall);
        }).catch(console.error());
        closeModal();
    }

    return (
        <>
            <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full h-[calc(100%-1rem)]">
                <div class="max-w-lg relative p-4 w-full max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <div>
                                <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">{expenseDetails.transactionDescription}</dt>
                                <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">{formattedExpense}</dd>
                            </div>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal" onClick={closeModal}>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">

                            <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                {details.map((txn) => {
                                    const formattedSpent = new Intl.NumberFormat('en-IN', {
                                        style: 'currency',
                                        currency: 'INR',
                                    }).format(txn.spent);
                                    const formattedShare = new Intl.NumberFormat('en-IN', {
                                        style: 'currency',
                                        currency: 'INR',
                                    }).format(txn.myShare);
                                    return (
                                        <li class="pb-3 sm:pb-4">
                                            <div class="flex items-center space-x-4 rtl:space-x-reverse">
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {txn.user.name}
                                                    </p>
                                                </div>
                                                <div class="w-auto m-2 flex flex-row items-center justify-between text-base font-semibold text-gray-900 dark:text-white">
                                                    <div className="text-green-600 mr-6">+{formattedSpent}</div>
                                                    <div className="text-red-600 ml-6">-{formattedShare}</div>
                                                </div>
                                            </div>
                                        </li>)
                                })}

                            </ul>

                        </div>
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="static-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleDeleteExpense}>Delete Expense</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}