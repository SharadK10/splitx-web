export function SingleSimplifiedExpenseCard({ settlement }) {

  return (
    <li>
      <div class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80 px-4 h-fit w-full py-3 rounded-lg border bg-card shadow-sm text-base">
        <div class="w-full flex flex-col gap-1">
          <div class="text-base flex flex-col gap-2 justify-between">
            <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {settlement.mainUser.name}
            </h2>
              
            <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {settlement.transactionAmount.map((data) => {
                  if(data.giveOrTake === "give") {
                    return <li className = "text-red-600 whitespace-normal">{settlement.mainUser.name} will give {data.amount} to {data.userObj.name}</li>
                  }
                  return  <li className = "text-green-500 whitespace-normal">{settlement.mainUser.name} will get {data.amount} from {data.userObj.name}</li>
                })}
              
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
