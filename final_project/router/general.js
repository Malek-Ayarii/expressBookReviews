const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();


// ================== Task 6 ==================
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});


// ================== Task 1 ==================
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});


// ================== Task 2 ==================
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});


// ================== Task 3 ==================
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author;

  const filtered = Object.values(books).filter(
    book => book.author.toLowerCase() === author.toLowerCase()
  );

  return res.status(200).json(filtered);
});


// ================== Task 4 ==================
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title;

  const filtered = Object.values(books).filter(
    book => book.title.toLowerCase() === title.toLowerCase()
  );

  return res.status(200).json(filtered);
});


// ================== Task 5 ==================
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});


// =====================================================
// 🚀 Tasks 10–13 (ASYNC / PROMISES WITH AXIOS)
// =====================================================


// ================== Task 10 ==================
// Get all books using async/await + Axios
public_users.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


// ================== Task 11 ==================
// Get book by ISBN using Promises
public_users.get('/async/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
      return res.status(200).json(response.data);
    })
    .catch(error => {
      return res.status(500).json({ message: error.message });
    });
});


// ================== Task 12 ==================
// Get books by Author using async/await
public_users.get('/async/author/:author', async (req, res) => {
  const author = req.params.author;

  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


// ================== Task 13 ==================
// Get books by Title using async/await
public_users.get('/async/title/:title', async (req, res) => {
  const title = req.params.title;

  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


module.exports.general = public_users;