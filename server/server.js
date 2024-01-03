const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://admin:123zxc34@cluster0.hoxv5bc.mongodb.net/eDnipro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Слушатель события ошибки подключения
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  deadlines: String,
  imageUrl: String,
});

const Project = mongoose.model('Project', projectSchema, 'projects');

module.exports = Project;

app.use(cors());
app.use(express.json());

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    console.log('Found projects:', projects);
    console.log('Number of projects:', projects.length);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});