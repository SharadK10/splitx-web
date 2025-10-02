import { deleteExpense } from "./Api";

export default function ExpenseDetailsModal({ closeModal, expenseDetails, deleteExpenseApiCall, setDeleteExpenseApiCall }) {
    const details = expenseDetails.userTransactions;
    let totalExpense = 0;
    details.forEach(txn => totalExpense += txn.spent);

    const formattedExpense = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(totalExpense);

    function handleDeleteExpense() {
        const txnId = expenseDetails.id;
        deleteExpense(txnId)
            .then(() => {
                setDeleteExpenseApiCall(prev => !prev);
            })
            .catch(console.error);
        closeModal();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] overflow-y-auto overflow-x-hidden">
            <div className="max-w-lg relative p-4 w-full max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <div>
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">{expenseDetails.transactionDescription}</dt>
                            <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">{formattedExpense}</dd>
                        </div>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModal}
                        >
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 md:p-5 space-y-4">
                        <ul className="space-y-6">
                            {details.map((txn, index) => {
                                const spent = txn.spent;
                                const share = txn.myShare;
                                //const maxAmount = Math.max(spent, share);
                                const leftGrey = totalExpense - share;
                                const rightGrey = totalExpense - spent;
                                const nameWidthPercent = 30;
                                const remainingPercent = (100 - nameWidthPercent) / 2;

                                const redWidthPercent = (share / totalExpense) * remainingPercent;
                                const greenWidthPercent = (spent / totalExpense) * remainingPercent;
                                const leftGreyWidthPercent = (leftGrey / totalExpense) * remainingPercent;
                                const rightGreyWidthPercent = (rightGrey / totalExpense) * remainingPercent;

                                return (
                                    <li key={index} className="relative w-full flex items-center h-10">
                                        {/* Red line - left */}
                                        <div
                                            className="absolute h-1 bg-gray-200 dark:bg-gray-400 top-1/2 transform -translate-y-1/2 transition-all duration-700 rounded-r-full"
                                            style={{
                                                width: `${leftGreyWidthPercent}%`,
                                                left: `${0}%`
                                            }}
                                        ></div>
                                        <div
                                            className="absolute h-1 bg-red-600 dark:bg-red-600 top-1/2 transform -translate-y-1/2 transition-all duration-700 rounded-r-full"
                                            style={{
                                                width: `${redWidthPercent}%`,
                                                left: `${remainingPercent - redWidthPercent}%`
                                            }}
                                        ></div>

                                        {/* Green line - right */}
                                        <div
                                            className="absolute h-1 bg-green-600 dark:bg-green-700 top-1/2 transform -translate-y-1/2 transition-all duration-700 rounded-l-full"
                                            style={{
                                                width: `${greenWidthPercent}%`,
                                                left: `${remainingPercent + nameWidthPercent}%`
                                            }}
                                        ></div>
                                        <div
                                            className="absolute h-1 bg-gray-200 dark:bg-gray-400 top-1/2 transform -translate-y-1/2 transition-all duration-700 rounded-r-full"
                                            style={{
                                                width: `${rightGreyWidthPercent}%`,
                                                left: `${remainingPercent + nameWidthPercent}%`
                                            }}
                                        ></div>

                                        {/* Name button */}
                                        <div
                                            className="relative w-[30%] mx-auto px-2 text-center bg-gray-200 dark:bg-gray-400 rounded-full z-10 cursor-pointer select-none"
                                            style={{ wordBreak: "break-word" }}
                                        >
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {txn.user.name}
                                            </p>
                                        </div>

                                        {/* Amounts */}
                                        <div className="absolute left-2 top-0 text-red-800 dark:text-red-800 text-sm font-semibold z-20">
                                            -{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(share)}
                                        </div>
                                        <div className="absolute right-2 top-0 text-green-800 dark:text-green-400 text-sm font-semibold z-20">
                                            +{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(spent)}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleDeleteExpense}
                        >
                            Delete Expense
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
