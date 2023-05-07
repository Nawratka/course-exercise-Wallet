const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');
const addTransaction = document.querySelector('.add-transaction');
const deleteAll = document.querySelector('.delete-all');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
const name = document.querySelector('#name');
const amount = document.querySelector('#amount');
const category = document.querySelector('#category');
const save = document.querySelector('.save');
const cancel = document.querySelector('.cancel');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');
const transactionList = document.querySelector('.transaction-list');

let money = [0];
let ID = 0;
let root = document.documentElement;

const openPanel = () => {
	addTransactionPanel.style.display = 'flex';
};

const closePanel = () => {
	addTransactionPanel.style.display = 'none';
	clearInputs();
};

const clearInputs = () => {
	name.value = '';
	amount.value = '';
	category.value = 'none';
};

const checkInputs = () => {
	if (
		name.value === '' ||
		amount.value === '0' ||
		amount.value === '' ||
		category.selectedIndex === 0
	) {
		alert('Uzupełnij wszystkie pola');
	} else {
		createTransaction(name, amount, category);
		money.push(parseFloat(amount.value));
		moneyCount();
		closePanel();
	}
};

const selectCategory = () => {
	switch (category.value) {
		case 'income':
			return '<i class="fas fa-money-bill-wave"></i>';
			break;
		case 'shopping':
			return '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case 'food':
			return '<i class="fas fa-hamburger"></i>';
			break;
		case 'cinema':
			return '<i class="fas fa-film"></i>';
			break;
	}
};

const createTransaction = (name, amount, category) => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);
	newTransaction.innerHTML = `
	<p class="transaction-name">${selectCategory(category.value)}</i>${
		name.value
	}</p>
	<p class="transaction-amount">${
		amount.value
	}<button class="delete" onclick="deleteSingleTransFunction(${ID})"><i class="fas fa-times"></i></button></p>`;

	if (amount.value > 0) {
		incomeArea.append(newTransaction);
	} else {
		expensesArea.append(newTransaction);
	}
	ID++;
};

const deleteAllFunction = () => {
	incomeArea.innerHTML = '<h3>Przychód:</h3>';
	expensesArea.innerHTML = '<h3>Wydatki:</h3>';
	money = [0];
	availableMoney.textContent = '0 zł';
};

const deleteSingleTransFunction = (id) => {
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseInt(transactionToDelete.childNodes[3].textContent);
	let index = money.indexOf(transactionAmount);
	if(index > -1) {
		money.splice(index, 1);
	}
	transactionToDelete.remove();
	moneyCount();
};

const moneyCount = (accumulator, currentValue) => {
	availableMoney.textContent = `${money.reduce(
		(accumulator, currentValue) => accumulator + currentValue)} zł`;
};

const changeToLightColor = () => {
	root.style.setProperty('--first-color', '#f9f9f9')
	root.style.setProperty('--second-color', '#14161f')
}

const changeToDarkColor = () => {
	root.style.setProperty('--first-color', '#14161f')
	root.style.setProperty('--second-color', '#f9f9f9')
	root.style.setProperty('--border-color', '#f9f9f9')
}

addTransaction.addEventListener('click', openPanel);
cancel.addEventListener('click', closePanel);
save.addEventListener('click', checkInputs);
deleteAll.addEventListener('click', deleteAllFunction);
lightBtn.addEventListener('click', changeToLightColor);
darkBtn.addEventListener('click', changeToDarkColor);
