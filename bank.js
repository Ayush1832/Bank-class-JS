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
