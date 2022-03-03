const nt = require('express').Router();

nt.get('/', (req,res) => {
	res.write('Test');
})

module.exports = nt;