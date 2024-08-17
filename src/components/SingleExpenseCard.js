import { useEffect, useState } from "react";

export function SingleExpenseCard({expense}) {
    const [owed, setOwed] = useState(0);
    const groupUrl = "#"
    useEffect(()=>{
        expense.userTransactions.map((txn) => {
            if(txn.user.userId === 1) {
                setOwed(parseInt(txn.spent) - parseInt(txn.myShare));
            }
        })
    }, [])
    console.log("owed: " +owed);
  return (
    <li>
      <div class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground hover:bg-secondary/80 px-4 h-fit w-full py-3 rounded-lg border bg-card shadow-sm text-base">
        <div class="w-full flex flex-col gap-1">
          <div class="text-base flex gap-2 justify-between">
            <a
              class="flex-1 overflow-hidden text-ellipsis"
              href={groupUrl}
            >
              {expense.transactionDescription}
            </a>
            {owed > 0 &&
            <div className="flex flex-col justify-center items-center text-green-500">
                <div>You Lent</div>
                <div>{owed}</div>
            </div>
            }
            {owed < 0 &&
            <div className="flex flex-col justify-center items-center text-red-600">
                <div>You Borrowed</div>
                <div>{owed}</div>
            </div>
            }
            {owed === 0 &&
            <div className="flex flex-col justify-center items-center text-gray-600">
                <div>Not Involved</div>
            </div>
            }
            <span class="flex-shrink-0">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 -my-3 -ml-3 -mr-1.5">
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
                  class="w-4 h-4 text-muted-foreground"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
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
              {/* <div class="flex items-center">
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
                  class="w-3 h-3 inline mr-1"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>3</span>
              </div> */}
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
  );
}
