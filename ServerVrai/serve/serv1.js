const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Configuration de Multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/filedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String
});

const File = mongoose.model('File', fileSchema);

// Route pour le téléchargement de fichiers
app.post('/upload', upload.single('file'), async (req, res) => {
  const { filename, path, mimetype } = req.file;

  try {
    const newFile = new File({
      filename,
      path,
      mimetype
    });

    await newFile.save();
    res.status(200).json({ message: 'File uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Route pour servir les fichiers téléchargés
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
