const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body")
const quantity = document.querySelector(".quantity");

openShopping.addEventListener('click', function () {
	body.classList.add("active")
})
closeShopping.addEventListener('click', () => {
	body.classList.remove("active")
})

let prodcuts = [
	{
		id: 1,
		name: "PRODUCT 1",
		images: "1.PNG",
		price: 2000
	},

	{
		id: 2,
		name: "PRODUCT 2",
		images: "2.PNG",
		price: 2200
	},

	{
		id: 3,
		name: "PRODUCT 3",
		images: "3.PNG",
		price: 2400
	},

	{
		id: 4,
		name: "PRODUCT 4",
		images: "4.PNG",
		price: 2600
	},

	{
		id: 5,
		name: "PRODUCT 5",
		images: "5.PNG",
		price: 1800
	},

	{
		id: 6,
		name: "PRODUCT 6",
		images: "6.PNG",
		price: 1600
	},
]

let listCards = [];

const initApp = () => {
	prodcuts.forEach((value, key) => {
		let newDiv = document.createElement("div");
		newDiv.classList.add("item");
		newDiv.innerHTML = `
		<img src = "img/${value.images}">
		<div class = "title">${value.name}</div>
		<div class = "price">${value.price.toLocaleString()}</div>
		<button onclick="addToCard(${key})">Add to Card</button>
		`
		list.appendChild(newDiv);


	})
};

initApp();

const addToCard = (key) => {
	if (listCards[key] == null) {
		listCards[key] = JSON.parse(JSON.stringify(prodcuts[key]));
		listCards[key].quantity = 1
	}
	reloadCard();
}
const reloadCard = () => {
	listCard.innerHTML = "";
	let count = 0;
	let totalPrice = 0;

	listCards.forEach((value, key) => {
		totalPrice = totalPrice + value.price;
		count = count + value.quantity;

		if (value != null) {
			let newDiv = document.createElement("li");
			newDiv.innerHTML = `
			<div>
			<img src="img/${value.images}">
			</div>
			<div class="cardTitle">${value.name}</div>
			<div class="cardPrice">${value.price.toLocaleString()}</div>

			<div>
			<button style="background-color: #560bad" class="cardButton" onclick = changeQuantity(${key}, ${value.quantity - 1})>-</button>

            <div class="count"> ${value.quantity}</div>
			
			<button style="background-color: #560bad" class="cardButton" onclick = changeQuantity(${key}, ${value.quantity + 1})>+</button>
			</div>

			`
			listCard.appendChild(newDiv);
		}
		total.innerText = totalPrice.toLocaleString();
		quantity.innerText = count;
	})
}


const changeQuantity = (key, quantity) => {
	if (quantity == 0) {
		delete listCards[key]
	}
	else {
		listCards[key].quantity = quantity;
		listCards[key].price = quantity * prodcuts[key].price
	}

	reloadCard()
}



