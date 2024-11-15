const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Import models
const { Attestation, ServerAttestation } = require('./Models.js'); // Assurez-vous que le chemin est correct

const app = express();
const port = 7000;

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/attestationDBN', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Multer setup for file upload
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Endpoint to import Excel file
app.post('/import', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(uploadsDir, req.file.filename);
  
  try {
    const workSheetsFromFile = xlsx.parse(filePath);
    const data = workSheetsFromFile[0].data;

    // Skip header row and insert data into MongoDB
    for (let i = 1; i < data.length; i++) {
      const [nom, prenom, numInscription, dateNaissance, lieuNaissance, centreCorrection, session] = data[i];
      await Attestation.create({ nom, prenom, numInscription, dateNaissance, lieuNaissance, centreCorrection, session });
    }

    // Remove file after processing
    fs.unlinkSync(filePath);
    
    res.status(200).send('File imported successfully');
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error importing file');
  }
});

// Endpoint to get all attestations from ServerAttestation
app.get('/serverAttestationList', async (req, res) => {
  try {
    const serverAttestations = await ServerAttestation.find();
    res.json(serverAttestations);
  } catch (error) {
    console.error('Error fetching server attestations:', error);
    res.status(500).send('Error fetching server attestations');
  }
});

// Endpoint to update an attestation by ID in Attestations
app.put('/attestations/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const attestation = await Attestation.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!attestation) {
      return res.status(404).send('Attestation not found');
    }
    res.json(attestation);
  } catch (error) {
    console.error('Error updating attestation:', error);
    res.status(500).send('Error updating attestation');
  }
});

// Endpoint to delete an attestation by ID in Attestations
app.delete('/attestations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const attestation = await Attestation.findByIdAndDelete(id);
    if (!attestation) {
      return res.status(404).send('Attestation not found');
    }
    res.status(200).send('Attestation deleted successfully');
  } catch (error) {
    console.error('Error deleting attestation:', error);
    res.status(500).send('Error deleting attestation');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
