import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export function SettlementCard({expense}) {
    const [settlementAmount, setSettlementAmount] = useState(0);
    const [payer, setPayer] = useState(null)
    const [receiver, setReceiver] = useState(null)

    const user = useAuth().user;

    const formattedOwed = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(settlementAmount);

    useEffect(()=>{
        setSettlementAmount(expense.userTransactions[0].spent);
        setPayer(expense.userTransactions[0].user);
        setReceiver(expense.userTransactions[1].user);
    }, [])

  return (
    <>
    {user && payer && receiver &&
    <li>
      <div class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80 px-4 h-fit w-full py-3 rounded-lg border bg-card shadow-sm text-base bg-gray-200">
        <div class="w-full flex flex-col gap-1">
          <div class="text-base flex gap-2 justify-between">
            <button
              class="flex flex-1 overflow-hidden text-ellipsis"
            disabled>
              {expense.transactionDescription}
            </button>
            <div className="flex flex-col justify-center items-center text-green-500">
                <div>{user.userId === payer.userId ? "You" : payer.name.split(" ")[0]} paid {user.userId === receiver.userId ? "You" : receiver.name.split(" ")[0]} {formattedOwed}</div>
            </div>
            <span class="flex-shrink-0">
              <button
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 -my-3 -mr-3 -ml-1.5"
                type="button"
                id="radix-:r8r:"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
              >
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
                  class="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </span>
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
    </li>}
    </>
  );
}
