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

// set up middleware to instruct the server to make static files available
app.use(express.static('public'));

// set route to server root and respond with the file I want the server to read
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  // set route to transfer data to notes endpoint
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  // set up server to send json
  app.get('/api/notes', (req, res) => { 
    res.json(notes);
  });
  // request to post note and set id based on what the next index of the the array will be
  app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    notes.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
  });

  // (Bonus) request to delete by id and rewrite array
  app.delete("/api/notes/:id", function(req, res) {
    console.log("req params", req.params.id)
    notes = notes.filter(({ id }) => id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
  });

// set up server to "listen" for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
      });