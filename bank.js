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