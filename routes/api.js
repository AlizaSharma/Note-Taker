const router = require('express').Router();
const fs = require('fs'); 
const uuid = require('../helpers/uuid')

router.get('/notes', (req, res) => {
    let notes = [];
    fs.readFile('./db/db.json',  (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });       
    res.json(notes)
    
}); 

router.delete('/:api_id', (req, res) => {
  const apiId = req.params.api_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
    
      const result = json.filter((note) => note.api_id !== apiId);

      writeToFile('./db/db.json', result);

      res.json(`Item ${apiId} has been deleted 🗑️`);
    });
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;

if (req.body){
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