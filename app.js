const exp = require('constants');
const express = require('express');
const path = require('path');

const api = require('routes/index.js');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extend: true}));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
})

const app = express(PORT, () => {
	console.log(`App listening port: ${PORT}`);
});


