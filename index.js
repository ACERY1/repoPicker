/**
 * node this file
 */

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 1258;
let app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
	console.log(req.body);
	res.end();
});

app.listen(PORT,()=>{
	console.log(`repoPicker now listen at ${PORT}`)
});