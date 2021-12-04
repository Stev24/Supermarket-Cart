const products = [
	{
		id: 1,
		name: "Carrot",
		description:
			"https://befreshcorp.net/wp-content/uploads/2017/06/product-packshot-Carrot-558x600.jpg",
		quantity: "3",
		price: 2.99,
	},
	{
		id: 2,
		name: "Tomato",
		description:
			"https://www.vegetamo.it/wp-content/uploads/2018/04/pomodori.jpg",
		quantity: "7",
		price: 1.99,
	},
	{
		id: 3,
		name: "Paprika",
		description:
			"https://www.iva.de/sites/default/files/styles/gallery_popup/public/benutzer/%25uid/magazinbilder/bunte_paprika_157568993m_istock.jpg?itok=skUAqzdu ",
		quantity: "1",
		price: 1.55,
	},
	{
		id: 4,
		name: "Patato",
		description:
			"https://5.imimg.com/data5/ANDROID/Default/2021/2/LG/YK/MD/45117192/potatoes-2-jpg-500x500.jpg",
		quantity: "15",
		price: 0.55,
	},
	{
		id: 5,
		name: "Aubergine",
		description:
			"https://i.kym-cdn.com/photos/images/original/000/838/193/38a.jpg",
		quantity: "5",
		price: 4.55,
	},
	{
		id: 6,
		name: "Corn",
		description: "https://www.georgeperry.co.uk/images/P/sweetcorn.jpg",
		quantity: "9",
		price: 2.39,
	},
];

// description changed to image

const postProduct = function (product) {
	// info : price N quantity
	const priceParagraph = document.createElement("p");
	priceParagraph.innerText = product.price + " €";

	const quantityParagraph = document.createElement("p");
	quantityParagraph.innerText = `Available: ${product.quantity}`;
	quantityParagraph.className = `quantity-item-${product.id}`;

	const info = document.createElement("div");
	info.appendChild(priceParagraph);
	info.appendChild(quantityParagraph);

	// item
	const item = document.createElement("div");
	item.className = "item";

	const title = document.createElement("h2");
	title.innerText = product.name;

	const description = document.createElement("img");
	description.className = "description";
	description.src = product.description;

	const buyBtn = document.createElement("button");
	buyBtn.className = "buyBtn";
	buyBtn.innerText = "Buy";
	buyBtn.addEventListener("click", () => {
		addProductToCart(product);
		totalAmount();
	});

	item.appendChild(title);
	item.appendChild(description);
	item.appendChild(info);
	item.appendChild(buyBtn);

	const listItems = document.getElementsByClassName("listItems");
	listItems[0].appendChild(item);
};

const showAllProducts = function () {
	products.forEach((product) => {
		postProduct(product);
	});
};

showAllProducts();

const cartItems = [];

const addProductToCart = function (product) {
	if (product.quantity > 0) {
		// delete item from products list
		product.quantity -= 1;
		document.querySelector(
			`.quantity-item-${product.id}`
		).innerText = `Available: ${product.quantity}`;

		let foundItem = false;
		foundItem = cartItems.find((item) => item.id == product.id);
		if (foundItem) {
			foundItem.cartQuantity += 1;
			// increase # of item in the cart
			const prodQty = document.querySelector(
				`.cartList .item-${product.id} p.quantity`
			);
			prodQty.innerText = "Quantity: " + product.cartQuantity;
		} else if (!foundItem) {
			product.cartQuantity = 0;
			product.cartQuantity += 1;
			cartItems.push(product);

			console.log(products);
			console.log(cartItems);

			// item
			const item = document.createElement("div");
			item.className = `item item-${product.id}`;

			const title = document.createElement("h2");
			title.innerText = product.name;

			const description = document.createElement("img");
			description.className = "description";
			description.src = product.description;

			const quantity = document.createElement("p");
			quantity.className = "quantity";
			quantity.innerText = "Quantity: " + product.cartQuantity;

			const deleteBtn = document.createElement("button");
			deleteBtn.className = "deleteBtn item-" + product.id;
			deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>"
			deleteBtn.addEventListener("click", () => {
				deleteProductFromCart(product);
				totalAmount();
			});

			item.appendChild(title);
			item.appendChild(description);
			item.appendChild(quantity);
			item.appendChild(deleteBtn);

			const cartList = document.getElementsByClassName("cartList");
			cartList[0].appendChild(item);
		}
	}
};

const deleteProductFromCart = function (product) {
	// add item to products list
	product.quantity += 1;
	document.querySelector(
		`.quantity-item-${product.id}`
	).innerText = `Available: ${product.quantity}`;

	let foundItem = false;
	foundItem = cartItems.find((item) => item.id == product.id);
	if (foundItem && foundItem.cartQuantity > 1) {
		foundItem.cartQuantity -= 1;
		// increase # of item in the cart
		const prodQty = document.querySelector(
			`.cartList .item-${product.id} p.quantity`
		);
		prodQty.innerText = "Quantity: " + product.cartQuantity;
	} else if (foundItem.cartQuantity == 1) {
		// decrease # of item in the cart
		foundItem.cartQuantity -= 1;
		// delete from cart list
		const item = document.querySelector(`.item-${foundItem.id}`);
		item.outerHTML = "";
		//delete itel from cart ARRAY
		cartItems.splice(cartItems.indexOf(foundItem), 1);
	}
};

const totalAmount = function () {
	let total = 0;
	cartItems.forEach((item) => {
		total += (item.price * item.cartQuantity);
	});
	document.querySelector(
		".totalAmount > p"
	).innerText = `Total Amount: ${total.toFixed(2)} €`;
};
