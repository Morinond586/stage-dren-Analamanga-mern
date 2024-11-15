// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/DrenDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  image: String,
  date: Date,
  type: String,
  nombre: String,
  lieu: String,
  service: String,
  post: String,
});

const Item = mongoose.model('Activiter', itemSchema);


// configuration d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
})

// fin configuration d'images**************************


// Configuration de Multer pour le téléchargement de fichiers
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

const uploads = multer({ storage: storage });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Route to handle file uploads
app.post('/upload', uploads.single('file'), (req, res) => {
  res.send({ message: 'File uploaded successfully' });
});

// Route to get list of uploaded files
app.get('/files', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan files!');
    }
    res.send(files);
  });
});

// Route to delete a file
app.delete('/files/:fileName', (req, res) => {
  const { fileName } = req.params;
  fs.unlink(path.join('uploads', fileName), (err) => {
    if (err) {
      return res.status(500).send('Unable to delete file!');
    }
    res.send({ message: 'File deleted successfully' });
  });
});

// fin d'importation *********************************************

app.post('/items', upload.single('image'), async (req, res) => {
  const { nom, prenom, date, type, nombre, lieu, service, post } = req.body;
  const newItem = new Item({
    nom,
    prenom,
    type,
    nombre,
    lieu,
    service,
    post,
    image: req.file ? req.file.path : '',
    date: new Date(date),
  });
  await newItem.save();
  res.json(newItem);
});

app.put('/items/:id', upload.single('image'), async (req, res) => {
  const { nom, prenom, date, type, nombre, lieu, service, post, } = req.body;
  const updateData = { nom, prenom, date, type, nombre, lieu, service, post: new Date(date) };
  if (req.file) {
    updateData.image = req.file.path;
  }
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updatedItem);
});

app.delete('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item && item.image) {
    fs.unlinkSync(item.image);
  }
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
