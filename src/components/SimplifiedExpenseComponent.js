import { SingleSimplifiedExpenseCard } from "./SingleSimplifiedExpenseCard";

export default function SimplifiedExpenseComponent({allSettlements}) {
    return (
        <>
      <div class="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
          Group Expenses
        </h5>
        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Simplified Settlemets
        </p>
        {allSettlements.length > 1 ? (
        <ul class="my-4 space-y-3 h-96 overflow-y-scroll">
          {allSettlements.map((settlement) => (
            <SingleSimplifiedExpenseCard settlement={settlement} />
          ))}
        </ul>) : (
          <div>All Settled Up!</div>
        )}
        </div>
        </>
    )
}