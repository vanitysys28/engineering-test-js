const express = require('express');
const app = express();

let history = [] 
let orders = []
let delay = 5000

function checkCurrentOrdersQuantity(value) {
	let quantities = 0
	for (let i = 0; i < value.length ;i++) {
	quantities = quantities + value[i].quantity
	}
	return quantities
}

app.post('/order', function (req, res) {
	let id = req.query.id;
	let time = new Date();
	let drink = req.query.drink;
	let quantity = Number(req.query.quantity);	
	let drinks = orders.filter(drinks => drinks.drink === "DRINK")
	let beers = orders.filter(beers => beers.drink === "BEER")

	if (req.query.delay != null) {
	modifiedDelay = req.query.delay
	} else {
	modifiedDelay = delay }

	async function prepareDrink(x) {
	await setTimeout(function(){orders = orders.filter(order => order.time != x)}, modifiedDelay);
	}

	if (drink === "BEER" & checkCurrentOrdersQuantity(beers) + quantity <= 2 & checkCurrentOrdersQuantity(drinks) <= 0) {
	orders.push({"time":time,"id":id,"drink":drink,"quantity":quantity})
	history.push({"time":time,"id":id,"drink":drink,"quantity":quantity})
	prepareDrink(time)
	res.status(200).json({msg: "Order accepted", orders});
	} else if (drink === "DRINK" & checkCurrentOrdersQuantity(drinks) + quantity <= 1 & checkCurrentOrdersQuantity(beers) <= 0) {
	orders.push({"time":time,"id":id,"drink":drink,"quantity":quantity})
	history.push({"time":time,"id":id,"drink":drink,"quantity":quantity})
	prepareDrink(time)
	res.status(200).json({msg: "Order accepted", orders});
	} else {
	res.status(429).json({msg: "Order can't be processed"});
	}
});

app.get('/history', function(req,res) {	
	res.status(200).json({msg: "Order history", history});
});

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
