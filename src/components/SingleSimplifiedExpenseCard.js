export function SingleSimplifiedExpenseCard({
  settlement,
  setSettleUpPayer,
  setSettleUpReceiver,
  setSettleUpAmount,
  openSettleUpModal,
  closeSettleUpModal
}) {
  // Calculate net amount
  const netAmount = settlement.transactionAmount.reduce((acc, txn) => {
    return txn.giveOrTake === "give" ? acc - txn.amount : acc + txn.amount;
  }, 0);

  const formattedNet = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Math.abs(netAmount));

  const netColor =
    netAmount > 0
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : netAmount < 0
        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";

  return (
    <li>
      <div className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 shadow-sm text-base">
        {/* Header: Main User + Net Amount */}
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">
            {settlement.mainUser.name}
          </h4>
          <span
            className={`px-3 py-1 rounded-full font-bold text-sm ${netColor}`}
          >
            {netAmount > 0 ? `💰 +${formattedNet}` : netAmount < 0 ? `💸 -${formattedNet}` : "Settled"}
          </span>
        </div>

        {/* No Transactions */}
        {settlement.transactionAmount.length === 0 && (
          <div className="text-left text-gray-500 dark:text-gray-400 italic">
            All settled up 🎉
          </div>
        )}

        {/* Transactions */}
        <ul className="space-y-2">
          {settlement.transactionAmount.map((data, index) => {
            const formattedAmount = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(data.amount);

            const isGive = data.giveOrTake === "give";
            const otherName = data.userObj.name;

            return (
              <li
                onClick={() => {
                  const isGive = data.giveOrTake === "give";

                  setSettleUpPayer(isGive ? settlement.mainUser : data.userObj);
                  setSettleUpReceiver(isGive ? data.userObj : settlement.mainUser);
                  setSettleUpAmount(data.amount)
                  openSettleUpModal();
                }}
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg border font-medium cursor-pointer transition-colors duration-200 ${isGive
                  ? "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20"
                  : "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20"
                  }`}
              >
                <span className="text-sm flex items-center gap-2">
                  {isGive ? "💸" : "💰"} {otherName}
                </span>
                <span className="text-sm">{formattedAmount}</span>
              </li>

            );
          })}
        </ul>
      </div>
    </li>
  );
}
