require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');


const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const dbconnect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/personal');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};
dbconnect();

// Employee Model
const Employee = mongoose.model('Employee', new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  skills: [String],
  image: String,
  bio: String,
  position: String,
}));

// Nodemailer
const nodemailer = require('nodemailer');

// Create reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Your email (set in .env)
    pass: process.env.EMAIL_PASSWORD  // Your password or app password
  }
});

//Sending
app.post('/api/message', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).send({ error: 'Email sending failed' });
  }
});



// Employee Routes
app.post('/api/employee', [
  body('name').notEmpty().withMessage('Name is required'),
  // body('email').isEmail().withMessage('Valid email is required'),
  // body('skills').isArray().withMessage('Skills must be an array'),
  // body('position').notEmpty().withMessage('Position is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, skills, image, bio, position, phone } = req.body;
  const person = new Employee({ name, email, skills, image, bio, position, phone });
  await person.save();
  res.status(200).send({ person });
});

// Employee CRUD operations with Role Auth
app.get('/api/employee',  async (req, res) => {
  const persons = await Employee.find();
  res.status(200).json(persons);
});

app.get('/api/employee/:id',  async (req, res) => {
  const person = await Employee.findById(req.params.id);
  if (!person) return res.status(404).send({ message: 'Person not found' });
  res.send(person);
});

app.put('/api/employee/:id',  async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).send({ message: 'Person not found' });
  res.send(updated);
});

app.delete('/api/employee/:id',  async (req, res) => {
  const deleted = await Employee.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send({ message: 'Person not found' });
  res.send({ message: 'Person deleted successfully' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
