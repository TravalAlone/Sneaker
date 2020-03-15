const express = require("express")
const fs = require("fs")
const app = express()

app.get("/maplist", (req, res) => {
	fs.readFile("./data.json", (err, data) => {
		// console.log(data.toString())
		res.json(data.toString())
	})
})
app.listen("5523", () => {
	console.log("5523")
})
