/**
 * node this file
 */

const express = require('express');

const PORT = 1258;

let app = express();

app.post('/', (req, res) => {
	console.log(req.body);
});

app.listen(PORT,()=>{
	console.log(`repoPicker now listen at ${PORT}`)
});