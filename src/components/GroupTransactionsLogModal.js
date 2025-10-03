import { useEffect, useState } from "react";
import { getGroupTransactionsLogsApi } from "./Api";
import Loader from "./Loader";

export default function GroupTransactionsLogModal({ isModalOpen, group, closeModal }) {
  const [currentGroup, setCurrentGroup] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setCurrentGroup(group);
    getGroupTransactionsLogs(group)
    //console.log(groupLogs);
  }, [group]); // runs whenever modal opens or group changes

  function getGroupTransactionsLogs(group) {
    if (group != null) {
      setIsLoading(true);
      getGroupTransactionsLogsApi(group.groupCode).then((res) => {
        setLogs(res.data);
        console.log(res);
      })
        .catch((e) => console.log("Error in fetching group logs"))
        .finally(setIsLoading(false))
    }
  }

  return (
    <>
      {isModalOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full h-[calc(100%-1rem)]"
        >
          <div className="max-w-lg relative p-4 w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <div>
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
                    {currentGroup?.groupCode || ""}
                  </dt>
                  <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
                    {currentGroup?.groupName || ""}
                  </dd>
                </div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                {isLoading ? <Loader /> : (
                  <ul className="max-w-md divide-y text-gray-600 dark:text-gray-600 
                 max-h-40 overflow-y-auto pr-2">
                    {logs.length == 0 &&
                      <li className="py-2">No expense logs available for this group</li>}
                    {logs.map((log, idx) => (
                      <li key={idx} className="py-2">
                        [
                        {new Date(log.createdAt).toLocaleString()}
                        ]{" "}
                        {log.operation === "add" && log.transaction.transactionType === "expense" && (
                          <>
                            <strong>{log.createdBy?.name || "Unknown"}</strong> added an expense{" "}
                            <em>{log.transaction.transactionDescription}{" "}</em>
                            {log.amount != null && (<>of{" "}
                              <strong>₹{log.amount}</strong></>)}
                          </>
                        )}
                        {log.operation === "delete" && log.transaction.transactionType === "expense" && (
                          <>
                            <strong>{log.createdBy?.name || "Unknown"}</strong> deleted an expense{" "}
                            <em>{log.transaction.transactionDescription}</em>
                            {log.amount != null && (<>of{" "}
                              <strong>₹{log.amount}</strong></>)}
                          </>
                        )}
                        {log.operation === "delete" && log.transaction.transactionType === "settlement" && (
                          <>
                            <strong>{log.createdBy?.name || "Unknown"}</strong> deleted a settement{" "}
                            {log.amount != null && (<>{" "}of{" "}
                              <strong>₹{log.amount}</strong></>)}
                          </>
                        )}
                      </li>
                    ))}

                  </ul>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
