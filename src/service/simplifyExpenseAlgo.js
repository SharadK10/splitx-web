class Repayments {
    constructor(fromUser, toUser, amount) {
        this.fromUser = fromUser; // Object representing the user who owes money
        this.toUser = toUser;     // Object representing the user who is owed money
        this.amount = amount;     // The amount being repaid in this transaction
    }
}

function simplifyExpenseAlgo(balanceMap) {
    let debtor = [];
    let creditor = [];

    // Separate creditors and debtors
    for (let key in balanceMap) {
        let user = balanceMap[key];
        if (user.amount < 0) {
            creditor.push(user);
        } else if (user.amount > 0) {
            debtor.push(user);
        }
    }

    // Sort creditors in descending order of debt and debtors in ascending order of credit
    creditor.sort((a, b) => b.amount - a.amount);
    debtor.sort((a, b) => a.amount - b.amount);

    let result = [];
    let i = 0, j = 0;

    while (i < creditor.length && j < debtor.length) {
        let cr = creditor[i];
        let db = debtor[j];

        let transactionAmount = Math.min(-cr.amount, db.amount);

        // Assuming txn is an object and Repayments is a constructor function or class
        result.push(new Repayments(cr, db, transactionAmount));

        cr.amount += transactionAmount;
        db.amount -= transactionAmount;

        if (cr.amount === 0) i++;
        if (db.amount === 0) j++;
    }

    return result;
}

function prepareUIPerspectiveResponse(simplifiedRepayemts,usersArray) {
    let userMap = [];
    usersArray.map((user) => {
        userMap.push({
            mainUser : user.user,
            transactionAmount : [] 
        });
    });
    // 
    simplifiedRepayemts.map((data) => {
        userMap.map((user) => {
            if(user.mainUser.userId === data.fromUser.userId) {
                user.transactionAmount.push(
                        {
                            userObj : data.toUser,
                            amount : data.amount,
                            giveOrTake : "give"
                        });
            }
            if(user.mainUser.userId === data.toUser.userId) {
                user.transactionAmount.push(
                        {
                            userObj : data.fromUser,
                            amount : data.amount,
                            giveOrTake : "take"
                        });
            }
        })
        

    })
    // 
    return userMap;

} 
export  { prepareUIPerspectiveResponse, simplifyExpenseAlgo};
