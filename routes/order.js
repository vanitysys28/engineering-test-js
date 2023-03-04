const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const router = express.Router();

let orders = []
let preparationtime = 5

function checkQuantity(value) {
	let quantities = 0
	for (let i = 0; i < value.length ;i++) {
	quantities = quantities + value[i].quantity
	}
	return quantities
}

router.post(`/`, function (req, res) {
	let id = req.query.id;
	let drink = req.query.drink;
	let quantity = Number(req.query.quantity);	
	let drinks = orders.filter(drinks => drinks.drink === "DRINK")
	let beers = orders.filter(beers => beers.drink === "BEER")

	if (checkQuantity(beers) + quantity <= 2 & checkQuantity(drinks) <= 0) {
	orders.push({"id":id,"drink":drink,"quantity":quantity})
	res.status(200).json({msg: "Order accepted.", orders});
	} else if (checkQuantity(drinks) + quantity <= 1 & checkQuantity(beers) <= 0) {
	orders.push({"id":id,"drink":drink,"quantity":quantity})
	res.status(200).json({msg: "Order accepted.", orders});
	} else {
	res.status(429).json({msg: "Order can't be processed."});
	}
});

module.exports = router;
