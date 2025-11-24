const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/'); // save uploaded files to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Test endpoint
app.get('/', (req, res) => res.send('Backend is working'));

// Upload CSV and process
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join('../uploads', req.file.originalname);

  // Call Python script
  const process = spawn('python3', ['../data_processing/eda.py', filePath]);

  let data = '';
  process.stdout.on('data', chunk => data += chunk);

  process.stdout.on('end', () => {
    res.json(JSON.parse(data));
  });

  process.stderr.on('data', chunk => {
    console.error(chunk.toString());
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
