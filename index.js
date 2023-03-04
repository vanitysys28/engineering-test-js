const express = require('express');
const app = express();
app.use(express.json());

let history = [] 
let orders = []
let delay = 5000

function checkQuantity(value) {
	let quantities = 0
	for (let i = 0; i < value.length ;i++) {
	quantities = quantities + value[i].quantity
	}
	return quantities
}

app.post('/order', function (req, res) {
	let id = req.query.id;
	let drink = req.query.drink;
	let quantity = Number(req.query.quantity);	
	let drinks = orders.filter(drinks => drinks.drink === "DRINK")
	let beers = orders.filter(beers => beers.drink === "BEER")
	
	async function prepareDrink(id) {
	await setTimeout(function(){orders = orders.filter(drinks => drinks.id != id)}, delay);
	}

	if (drink === "BEER" & checkQuantity(beers) + quantity <= 2 & checkQuantity(drinks) <= 0) {
	orders.push({"id":id,"drink":drink,"quantity":quantity})
	history.push({"id":id,"drink":drink,"quantity":quantity})
	prepareDrink(id)
	res.status(200).json({msg: "Order accepted", orders});
	} else if (drink === "DRINK" & checkQuantity(drinks) + quantity <= 1 & checkQuantity(beers) <= 0) {
	orders.push({"id":id,"drink":drink,"quantity":quantity})
	history.push({"id":id,"drink":drink,"quantity":quantity})
	prepareDrink(id)
	res.status(200).json({msg: "Order accepted", orders});
	} else {
	res.status(429).json({msg: "Order can't be processed."});
	}
});

app.get('/history', function(req,res) {	
	res.status(200).json({msg: "Order history", history});
});

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
