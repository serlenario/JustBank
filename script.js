'use strict';

// Simply Bank App
const account1 = {
	userName: 'Cecil Ireland',
	transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
	interest: 1.5,
	pin: 1111,
	transactionsDates: [
		'2020-10-02T14:43:31.074Z',
		'2020-10-29T11:24:19.761Z',
		'2020-11-15T10:45:23.907Z',
		'2021-01-22T12:17:46.255Z',
		'2021-02-12T15:14:06.486Z',
		'2021-03-09T11:42:26.371Z',
		'2021-05-21T07:43:59.331Z',
		'2021-06-22T15:21:20.814Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const account2 = {
	userName: 'Amani Salt',
	transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
	interest: 1.3,
	pin: 2222,
	transactionsDates: [
		'2020-10-02T14:43:31.074Z',
		'2020-10-29T11:24:19.761Z',
		'2020-11-15T10:45:23.907Z',
		'2021-01-22T12:17:46.255Z',
		'2021-02-12T15:14:06.486Z',
		'2021-03-09T11:42:26.371Z',
		'2021-05-21T07:43:59.331Z',
		'2021-06-22T15:21:20.814Z',
	],
	currency: 'UAH',
	locale: 'uk-UA',
};

const account3 = {
	userName: 'Corey Martinez',
	transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
	interest: 0.8,
	pin: 3333,
	transactionsDates: [
		'2020-10-02T14:43:31.074Z',
		'2020-10-29T11:24:19.761Z',
		'2020-11-15T10:45:23.907Z',
		'2021-01-22T12:17:46.255Z',
		'2021-02-12T15:14:06.486Z',
		'2021-03-09T11:42:26.371Z',
		'2021-05-21T07:43:59.331Z',
		'2021-06-22T15:21:20.814Z',
	],
	currency: 'RUB',
	locale: 'ru-RU',
};

const account4 = {
	userName: 'Kamile Searle',
	transactions: [530, 1300, 500, 40, 190],
	interest: 1,
	pin: 4444,
	transactionsDates: [
		'2020-10-02T14:43:31.074Z',
		'2020-10-29T11:24:19.761Z',
		'2020-11-15T10:45:23.907Z',
		'2021-01-22T12:17:46.255Z',
		'2021-02-12T15:14:06.486Z',
	],
	currency: 'EUR',
	locale: 'fr-CA',
};

const account5 = {
	userName: 'Oliver Avila',
	transactions: [630, 800, 300, 50, 120],
	interest: 1.1,
	pin: 5555,
	transactionsDates: [
		'2020-10-02T14:43:31.074Z',
		'2020-10-29T11:24:19.761Z',
		'2020-11-15T10:45:23.907Z',
		'2021-01-22T12:17:46.255Z',
		'2021-02-12T15:14:06.486Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayTransactions = function (account, sort = false) {
	containerTransactions.innerHTML = '';

	const isSortedTrans = sort
		? account.transactions.slice().sort((x, y) => x - y)
		: account.transactions;

	isSortedTrans.forEach((transaction, index) => {
		const transactionType = transaction > 0 ? 'deposit' : 'withdrawal';

		const date = new Date(account.transactionsDates[index]);
		const day = `${date.getDate()}`.padStart(2, 0);
		const month = `${date.getMonth() + 1}`.padStart(2, 0);
		const year = date.getFullYear();
		const transactionDate = `${day}/${month}/${year}`;

		if (transaction > 0) {
			transaction = `+${transaction.toFixed(2)}`;
		} else {
			transaction = transaction.toFixed(2);
		}

		const transactionsRow = `
		<div class="transactions__row">
      <div class="transactions__type transactions__type--${transactionType}">
        ${index + 1} ${transactionType}
      </div>
			<div class="transactions__date">${transactionDate}</div>
      <div class="transactions__value">${transaction}$</div>
    </div>`;

		containerTransactions.insertAdjacentHTML('afterbegin', transactionsRow);
	});
};

const createNickname = function (accounts) {
	accounts.forEach(account => {
		account.nickName = account.userName
			.toLowerCase()
			.split(' ')
			.map(value => value[0])
			.join('');
	});
};

createNickname(accounts);

const displayBalance = account => {
	const balance = account.transactions.reduce((acc, transaction) => {
		return acc + transaction;
	}, 0);
	account.balance = balance;
	labelBalance.textContent = `${balance.toFixed(2)}$`;
};

const displayTotal = account => {
	const totalDeposit = account.transactions
		.filter(depostit => {
			return depostit > 0;
		})
		.reduce((acc, deposit) => {
			return acc + deposit;
		}, 0);
	labelSumIn.textContent = `+${totalDeposit.toFixed(2)}$`;

	const totalWithdrawal = account.transactions
		.filter(withdrawal => {
			return withdrawal < 0;
		})
		.reduce((acc, withdrawal) => {
			return acc + withdrawal;
		}, 0);
	labelSumOut.textContent = `${totalWithdrawal.toFixed(2)}$`;

	const totalInterest = account.transactions
		.filter(transaction => {
			return transaction > 0;
		})
		.map(transaction => {
			return (transaction * account.interest) / 100;
		})
		.reduce((acc, transaction) => {
			return acc + transaction;
		}, 0);
	labelSumInterest.textContent = `${totalInterest.toFixed(2)}$`;
};

const updateUI = account => {
	displayTotal(account);
	displayBalance(account);
	displayTransactions(account);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
	e.preventDefault();

	currentAccount = accounts.find(account => {
		return account.nickName === inputLoginUsername.value;
	});

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		containerApp.style.opacity = 100;

		labelWelcome.textContent = `Welcome, ${
			currentAccount.userName.split(' ')[0]
		}`;

		const nowTime = new Date();
		const day = `${nowTime.getDate()}`.padStart(2, 0);
		const month = `${nowTime.getMonth() + 1}`.padStart(2, 0);
		const year = nowTime.getFullYear();

		labelDate.textContent = `${day}/${month}/${year}`;
		// displayTotal(currentAccount);
		// displayBalance(currentAccount);
		// displayTransactions(currentAccount.transactions);
		updateUI(currentAccount);

		inputLoginUsername.value = '';
		inputLoginPin.value = '';
		inputLoginPin.blur();
	}
});

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();

	const transferAmount = Number(inputTransferAmount.value);
	const recipientNickname = inputTransferTo.value;
	const recipientAccont = accounts.find(account => {
		return account.nickName === recipientNickname;
	});

	inputTransferAmount.value = '';
	inputTransferTo.value = '';
	inputTransferAmount.blur();

	if (
		transferAmount > 0 &&
		transferAmount <= currentAccount.balance &&
		recipientAccont &&
		recipientNickname !== currentAccount.nickName
	) {
		currentAccount.transactions.push(-transferAmount);
		recipientAccont.transactions.push(transferAmount);

		currentAccount.transactionsDates.push(new Date().toISOString());
		recipientAccont.transactionsDates.push(new Date().toISOString());

		updateUI(currentAccount);
	}
});

btnClose.addEventListener('click', function (e) {
	e.preventDefault();

	if (
		inputCloseNickname.value === currentAccount.nickName &&
		Number(inputClosePin.value) === currentAccount.pin
	) {
		const currentAccountIndex = accounts.findIndex(account => {
			return account.nickName === currentAccount.nickName;
		});
		accounts.splice(currentAccountIndex, 1);

		containerApp.style.opacity = 0;
		labelWelcome.textContent = 'Login to your account';

		inputCloseNickname.value = '';
		inputClosePin.value = '';
		inputClosePin.blur();
	}
});

btnLoan.addEventListener('click', function (e) {
	e.preventDefault();

	const loanAmount = Math.floor(inputLoanAmount.value);

	if (
		loanAmount > 0 &&
		currentAccount.transactions.some(
			transaction => transaction >= loanAmount * 0.1
		)
	) {
		currentAccount.transactions.push(loanAmount);
		currentAccount.transactionsDates.push(new Date().toISOString());
		updateUI(currentAccount);

		inputLoanAmount.value = '';
		inputLoanAmount.blur();
	}
});

let isSortedTransactions = false;

btnSort.addEventListener('click', function (e) {
	e.preventDefault();

	displayTransactions(currentAccount, !isSortedTransactions);
	isSortedTransactions = !isSortedTransactions;
});
