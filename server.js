const fs = require('fs');
const path = require('path');
const express = require('express');
let notes  = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    
    res.json(notes);
  });

  app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
    notes.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
  });

  app.delete("/api/notes/:id", function(req, res) {
    console.log("req params", req.params.id)
    notes = notes.filter(({ id }) => id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
      });