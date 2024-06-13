class BankAccount {
    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
        this.transactionHistory = [];
    }

    deposit(amount) {
        if (amount <= 0) {
            alert('Deposit amount must be positive.');
            return;
        }
        this.balance += amount;
        this.transactionHistory.push({ type: 'Deposit', amount, date: new Date() });
        this.updateAccountDetails();
    }

    withdraw(amount) {
        if (amount <= 0) {
            alert('Withdrawal amount must be positive.');
            return;
        }
        if (amount > this.balance) {
            alert('Insufficient funds.');
            return;
        }
        this.balance -= amount;
        this.transactionHistory.push({ type: 'Withdraw', amount, date: new Date() });
        this.updateAccountDetails();
    }

    transfer(amount, targetAccount) {
        if (!(targetAccount instanceof BankAccount)) {
            alert('Target account must be a valid BankAccount.');
            return;
        }
        if (amount <= 0) {
            alert('Transfer amount must be positive.');
            return;
        }
        if (amount > this.balance) {
            alert('Insufficient funds.');
            return;
        }
        this.withdraw(amount);
        targetAccount.deposit(amount);
        this.transactionHistory.push({ type: 'Transfer Out', amount, to: targetAccount.accountNumber, date: new Date() });
        targetAccount.transactionHistory.push({ type: 'Transfer In', amount, from: this.accountNumber, date: new Date() });
        this.updateAccountDetails();
        targetAccount.updateAccountDetails();
    }

    addInterest(rate) {
        if (rate <= 0) {
            alert('Interest rate must be positive.');
            return;
        }
        const interest = this.balance * (rate / 100);
        this.balance += interest;
        this.transactionHistory.push({ type: 'Interest', amount: interest, date: new Date() });
        this.updateAccountDetails();
    }
    getAccountDetails() {
        return {
            accountNumber: this.accountNumber,
            accountHolder: this.accountHolder,
            balance: this.balance,
            transactionHistory: this.transactionHistory
        };
    }

    updateAccountDetails() {
        document.getElementById('accountDetails').textContent = JSON.stringify(this.getAccountDetails(), null, 2);
    }
}

const accounts = {
    '12345': new BankAccount('12345', 'Ayush', 1000),
    '67890': new BankAccount('67890', 'Nayak', 500)
};

let currentAccount = accounts['12345'];
currentAccount.updateAccountDetails();

function deposit() {
    if (!currentAccount) {
        alert('No account selected.');
        return;
    }
    const amount = parseFloat(document.getElementById('depositAmount').value);
    currentAccount.deposit(amount);
}

function withdraw() {
    if (!currentAccount) {
        alert('No account selected.');
        return;
    }
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    currentAccount.withdraw(amount);
}
