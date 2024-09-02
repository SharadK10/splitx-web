export function SingleSimplifiedExpenseCard({ settlement }) {
  console.log("settlement",settlement);
  const nonEmpty = settlement.transactionAmount.length > 0

  return (
    <>
    <li>
      <div class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80 px-4 h-fit w-full py-3 rounded-lg border bg-card shadow-sm text-base">
        <div class="w-full flex flex-col gap-1">
          <div class="text-base flex flex-col gap-2 justify-between">
            <div className="flex flex-row justify-between items-center">
            <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {settlement.mainUser.name}
            </h2>
            {settlement.transactionAmount.length > 0 && 
            <button className="block text-black hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button">Settle Up</button>}
            </div>
            {settlement.transactionAmount.length === 0 &&
              <div className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">All setlled up here!</div>
            }
            <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {settlement.transactionAmount.map((data) => {
                const formattedAmount = new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(data.amount);
                  if(data.giveOrTake === "give") {
                    return <li className = "text-red-600 whitespace-normal">{settlement.mainUser.name} will give {formattedAmount} to {data.userObj.name}</li>
                  }
                  return  <li className = "text-green-500 whitespace-normal">{settlement.mainUser.name} will get {formattedAmount} from {data.userObj.name}</li>
                })}
              
            </ul>
          </div>
        </div>
      </div>
    </li>
    </>
  )
}
