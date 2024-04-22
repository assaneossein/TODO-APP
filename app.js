
const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

let todos = [];

app.get('/', (req, res) => {
  res.send('Bienvenue a lisep de diamniadio')
})
app.post('/todos', (req, res) => {
  const { title, priority } = req.body;
  const newTodo = { id: todos.length + 1, title, priority };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;
  const todo = todos.find(todo => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  todo.title = title || todo.title;
  todo.priority = priority || todo.priority;
  res.json(todo);
});

app.get('/todos', (req, res) => {
  const { search } = req.query;
  let filteredTodos = todos;
  if (search) {
    filteredTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  res.json(filteredTodos);
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === parseInt(id));
  if (!todo) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  todos.splice(index, 1);
  res.sendStatus(204);
});

app.get('/todos/order', (req, res) => {
  const sortedTodos = [...todos].sort((a, b) =>
    a.priority.localeCompare(b.priority)
  );
  res.json(sortedTodos);
});

app.get('/todos/order', (req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
