require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

const authRouter = require('./routh/auth');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
// const dbconnect = async () => {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/personal', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1);
//   }
// };
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const dbconnect = async () => {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/personal');
    await mongoose.connect(process.env.URI, clientOptions);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};
dbconnect();

// Employee Model
const Employee = mongoose.model('Employee', new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: { type: String, required: true },
  skills: [String],
  image: String,
  bio: String,
  position: { type: String, required: true },
}));

const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

// S3 Client initialization (v3 style)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Multer-s3 configuration
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    // acl: "public-read",
    key: function (req, file, cb) {
      const filename = `employee-images/${Date.now()}_${file.originalname}`;
      cb(null, filename);
    }
  }),
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed!"), false);
    } else {
      cb(null, true);
    }
  }
});


// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send Email
app.post('/api/message', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).send({ error: 'Email sending failed' });
  }
});

// Create Employee
// app.post('/api/employee', [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Valid email is required'),
//   // body('skills').isArray().withMessage('Skills must be an array'),
//   body('position').notEmpty().withMessage('Position is required')
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { name, email, skills, image, bio, position, phone } = req.body;
//     const person = new Employee({ name, email, skills, image, bio, position, phone });
//     await person.save();
//     res.status(200).send({ person });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: 'Failed to create employee' });
//   }
// });

app.post('/api/employee', upload.single('image'), [
  body('name').notEmpty().withMessage('Name is required'),
  // body('email').isEmail().withMessage('Valid email is required'),
  // body('phone').notEmpty().withMessage('Phone is required'),
  // body('skills').optional().isArray().withMessage('Skills must be an array'),
  // body('position').notEmpty().withMessage('Position is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, skills, bio, position, phone } = req.body;
    const image = req.file ? req.file.location : ''; // S3 image URL

    const person = new Employee({
      name,
      email,
      skills: skills ? JSON.parse(skills) : [],
      image,
      bio,
      position,
      phone
    });

    await person.save();
    res.status(201).json({ message: 'Employee created successfully', person });
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ message: 'Server error while creating employee' });
  }
});

app.use('/uploads', express.static('uploads'));

// Get All Employees
app.get('/api/employee', async (req, res) => {
  try {
    const persons = await Employee.find();
    res.status(200).json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch employees' });
  }
});

// Get Single Employee
app.get('/api/employee/:id', async (req, res) => {
  try {
    const person = await Employee.findById(req.params.id);
    if (!person) return res.status(404).send({ message: 'Person not found' });
    res.send(person);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch employee' });
  }
});

// Update Employee
app.put('/api/employee/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send({ message: 'Person not found' });
    res.send(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to update employee' });
  }
});

// Delete Employee
app.delete('/api/employee/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ message: 'Person not found' });
    res.send({ message: 'Person deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to delete employee' });
  }
});

// Auth Routes
app.use('/api/auth', authRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong' });
});

// Start Server
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
