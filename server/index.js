const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////

// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Controllers
////////////////////////
const listTodos = (req, res) => {
  res.status(200).send(todos);
};

const findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) return res.status(404).send({ message: `No todo with the id ${id}` });
  res.status(200).send(todo);
};

const createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).send({ message: `Invalid task` });
  const newTodo = { id: getId(), task: task, isDone: false };
  todos.push(newTodo);
  res.status(201).send(newTodo);
};

const updateTodo = (req, res) => {
  const { isDone } = req.body;
  if (isDone === null) return res.status(400).send({ message: `No todo with the id ${id}` });
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === Number(id));
  if (!todo) return res.status(404).send({ message: `No todo with the id ${id}` });
  todo.isDone = Boolean(isDone);
  res.status(200).send(todo);
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === Number(id));
  if (index < 0) return res.status(404).send({ message: `No todo with the id ${id}` });
  todos.splice(index, 1);
  res.sendStatus(204);
};

////////////////////////
// Endpoints
////////////////////////

app.get('/api/todos', listTodos);
app.get('/api/todos/:id', findTodo);
app.post('/api/todos', createTodo);
app.patch('/api/todos/:id', updateTodo);
app.delete('/api/todos/:id', deleteTodo);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontend + '/index.html');
});

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
