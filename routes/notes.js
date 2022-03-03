const router = require('express').Router();
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
	const json = fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
		if (err) {
			console.error(err);
		} else {
			res.json(JSON.parse(data));
		}
	});
});

router.post('/', (req, res) => {
	const json = fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
		if (err) {
			console.error(err);
		} else {
			let notesArr = JSON.parse(data);
			let newNote = {
				id: randomUUID(),
				title: req.body.title,
				text: req.body.text
			};
			notesArr.push(newNote);
			fs.writeFile(
				path.join(__dirname, '../db/db.json'),
				JSON.stringify(notesArr, null, 4),
				(writeErr) =>
					writeErr
						? console.error(writeErr)
						: console.info('Successfully updated notes!')
			);
			const response = {
				"status": "success",
				"body": newNote,
			}
			res.status(201).json(response);
		}
	});
});

router.delete('/:id', (req, res) => {
	let id = req.params.id.toLowerCase();
	const json = fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
		if (err) {
			console.error(err);
		} else {
			let notesArr = JSON.parse(data);
			for (let i = 0; i<notesArr.length; i++) {
				if ( notesArr[i].id === id ) {
					notesArr.splice(i, 1);
				}
			}
			fs.writeFile(
				path.join(__dirname, '../db/db.json'),
				JSON.stringify(notesArr, null, 4),
				(writeErr) =>
					writeErr
						? console.error(writeErr)
						: console.info('Successfully updated notes!')
			);
			const response = {
				"status": "success",
				"body": `Deleted note with id: ${id}`,
			}
			res.status(201).json(response);
		}
	});
});

module.exports = router;