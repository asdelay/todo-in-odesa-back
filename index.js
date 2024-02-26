import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
const app = express();

//data to connect
const corsOption = {
  origin: 'https://todo-in-odesa-front.onrender.com',
  // origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
// creating mongoose Schema
const todoSchema = mongoose.Schema({
  title: String,
  content: String,
});
// creating mongoose Model
const todoModel = mongoose.model('todoModel', todoSchema);

app.use(express.json());

app.use(cors(corsOption));

app.get('/', async (req, res) => {
  const todos = await todoModel.find();
  res.send(JSON.stringify(todos));
});
app.post('/', async (req, res) => {
  const newTodo = new todoModel({ title: req.body.title, content: req.body.content });
  await newTodo.save();
  const updatedTodos = await todoModel.find();
  res.send(JSON.stringify(updatedTodos));
});
app.delete('/:id', async (req, res) => {
  await todoModel.findByIdAndDelete(req.params.id);
  res.send(200);
});

async function connect() {
  await mongoose.connect(process.env.URI);
  app.listen(process.env.PORT, () => {
    console.log(`server has started on port ${process.env.PORT}`);
  });
}
connect();
