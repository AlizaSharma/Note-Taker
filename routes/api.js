const router = require('express').Router();
const fs = require('fs'); 

router.get('/notes', (req, res) => {
    let notes = [];
    fs.readFile('./db/db.json',  (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
    });       
    res.json(notes)
    
}) 

module.exports = router; 