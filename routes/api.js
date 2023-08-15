const router = require('express').Router();
const fs = require('fs'); 
const uuid = require('../helpers/uuid')

router.get('api/notes', (req, res) => {
    let notes = [];
    fs.readFile('./db/db.json',  (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });       
    res.json(notes)
    
}) 

router.post('api/notes', (req, res) => {
    const { title, text } = req.body;

if (title && text){
    const newNote = {
        title, 
        text,
        api_id: uuid(),
    };

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
      err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
          }
        });
      };

readAndAppend(newNote, './db/db.json');

const response = {
    status: 'success', 
    body: newNote,
};
res.json(response);
} else {
    res.json('Error in posting note');
}
});

module.exports = router; 