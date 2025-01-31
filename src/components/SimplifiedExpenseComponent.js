import { useState } from "react";
import { SingleSimplifiedExpenseCard } from "./SingleSimplifiedExpenseCard";
import SettleUpModal from "./SettleUpModal";

export default function SimplifiedExpenseComponent({ allSettlements, groupCode, isSettleAPICall ,setIsSettleAPICall}) {
  const [settleUpModalStatus, setSettleUpModalStatus] = useState(false);

  const members = allSettlements.map((settlement) => settlement.mainUser);

  function toggleSettleUpModal() {
    setSettleUpModalStatus(!settleUpModalStatus);
  }

  

  return (
    <>
    <SettleUpModal isModalOpen={settleUpModalStatus} closeModal={toggleSettleUpModal} members={members} groupCode={groupCode} isSettleAPICall={isSettleAPICall}  setIsSettleAPICall= {setIsSettleAPICall}/>
    <div className={`transition-all ${settleUpModalStatus ? 'blur-sm' : ''}`}>
      <div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row justify-between">
          <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Group Expenses
          </h5>
          <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={toggleSettleUpModal}>
            Settle Up
          </button>
        </div>
        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Simplified Settlemets
        </p>
        <ul class="my-4 space-y-3 h-96 overflow-y-scroll">
          {allSettlements.map((settlement) => (
            <SingleSimplifiedExpenseCard settlement={settlement} />
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}
