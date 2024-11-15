const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const cors = require('cors');
const crypto = require('crypto');
const xlsx = require('node-xlsx').default;

// Initialize express app
const app = express();
const port = 7000;

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL de votre front-end
  credentials: true, // Autoriser les informations d'identification
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/attestationDBN', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schemas and models
const attestationSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  numInscription: String,
  dateNaissance: String,
  lieuNaissance: String,
  centreCorrection: String,
  session: String
});

const Attestation = mongoose.model('Attestation', attestationSchema);

const demandeAttestationSchema = new mongoose.Schema({
  status: String,
  description: String,
  date_demande: Date,
  numInscription: String,
  adress: String,
  attestation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attestation'
  }
});

// utilisateur de système
const DemandeAttestation = mongoose.model('DemandeAttestation', demandeAttestationSchema);

const userSchema = new mongoose.Schema({
  name: String,
  prenom: String,
  email: { type: String, unique: true },
  password: String,
  dateOfBirth: String,
  description: String,
  photo: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const User = mongoose.model('User', userSchema);

// Table Admin de système 
const adminSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
});

const Admin = mongoose.model('Admin', userSchema);


// Configure multer for file uploads
const uploadsDir = path.join(__dirname, './uploads/');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Import Excel file
app.post('/import', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(uploadsDir, req.file.filename);

  try {
    const workSheetsFromFile = xlsx.parse(filePath);
    const data = workSheetsFromFile[0].data;

    for (let i = 1; i < data.length; i++) {
      const [nom, prenom, numInscription, dateNaissance, lieuNaissance, centreCorrection, session] = data[i];
      await Attestation.create({ nom, prenom, numInscription, dateNaissance, lieuNaissance, centreCorrection, session });
    }

    fs.unlinkSync(filePath);

    res.status(200).send('File imported successfully');
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error importing file');
  }
});

// Attestations routes
app.get('/attestationList', async (req, res) => {
  try {
    const attestations = await Attestation.find();
    res.json(attestations);
  } catch (error) {
    console.error('Error fetching attestations:', error);
    res.status(500).send('Error fetching attestations');
  }
});

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

// Demande Attestations routes
app.post('/demandeAttestations', async (req, res) => {
  const { status, description, date_demande, numInscription, adress, attestation_id } = req.body;
  try {
    const demandeAttestation = new DemandeAttestation({
      status,
      description,
      date_demande,
      numInscription,
      adress,
      attestation_id
    });
    await demandeAttestation.save();
    res.status(201).json(demandeAttestation);
  } catch (error) {
    console.error('Error creating demande attestation:', error);
    res.status(500).send('Error creating demande attestation');
  }
});

app.get('/demandeAttestations', async (req, res) => {
  try {
    const demandeAttestations = await DemandeAttestation.find().populate('attestation_id');
    res.json(demandeAttestations);
  } catch (error) {
    console.error('Error fetching demande attestations:', error);
    res.status(500).send('Error fetching demande attestations');
  }
});

app.put('/demandeAttestations/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const demandeAttestation = await DemandeAttestation.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!demandeAttestation) {
      return res.status(404).send('Demande attestation not found');
    }
    res.json(demandeAttestation);
  } catch (error) {
    console.error('Error updating demande attestation:', error);
    res.status(500).send('Error updating demande attestation');
  }
});

app.delete('/demandeAttestations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const demandeAttestation = await DemandeAttestation.findByIdAndDelete(id);
    if (!demandeAttestation) {
      return res.status(404).send('Demande attestation not found');
    }
    res.status(200).send('Demande attestation deleted successfully');
  } catch (error) {
    console.error('Error deleting demande attestation:', error);
    res.status(500).send('Error deleting demande attestation');
  }
});

// Statistiques routes

// Count attestations by session
app.get('/attestations/count/:session', async (req, res) => {
  const { session } = req.params;

  try {
    const count = await Attestation.countDocuments({ session });
    res.json({ session, count });
  } catch (error) {
    console.error('Error counting attestations by session:', error);
    res.status(500).send('Error counting attestations');
  }
});


app.get('/statistiques/total/:year', async (req, res) => {
  const { year } = req.params;
  try {
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year}-12-31`);

    const total = await DemandeAttestation.countDocuments({
      date_demande: { $gte: startOfYear, $lte: endOfYear }
    });

    res.json({ total });
  } catch (error) {
    console.error('Error fetching total count:', error);
    res.status(500).send('Error fetching total count');
  }
});


// New route to count validated demandes for a given year
app.get('/demandeAttestations/validated/:year', async (req, res) => {
  const { year } = req.params;
  try {
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year}-12-31`);

    const validatedCount = await DemandeAttestation.countDocuments({
      status: 'Valider',
      date_demande: { $gte: startOfYear, $lte: endOfYear }
    });

    res.json({ validatedCount });
  } catch (error) {
    console.error('Error fetching validated count:', error);
    res.status(500).send('Error fetching validated count');
  }
});

// New route to count "En Attente" demandes for a given year
app.get('/demandeAttestations/enAttente/:year', async (req, res) => {
  const { year } = req.params;
  try {
    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(`${year}-12-31`);

    const enAttenteCount = await DemandeAttestation.countDocuments({
      status: 'En Attente',
      date_demande: { $gte: startOfYear, $lte: endOfYear }
    });

    res.json({ enAttenteCount });
  } catch (error) {
    console.error('Error fetching en attente count:', error);
    res.status(500).send('Error fetching en attente count');
  }
});

// Statistiques des demandes d'attestation
app.get('/demandeAttestations/validated/month/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  try {
    const startOfMonth = new Date(`${year}-${month}-01`);
    const endOfMonth = new Date(`${year}-${month}-31`);

    const validatedCount = await DemandeAttestation.countDocuments({
      status: 'Valider',
      date_demande: { $gte: startOfMonth, $lte: endOfMonth }
    });

    res.json({ validatedCount });
  } catch (error) {
    console.error('Error fetching validated count:', error);
    res.status(500).send('Error fetching validated count');
  }
});

// Statistiques des demandes d'attestation en Attente
app.get('/demandeAttestations/enAttente/month/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  try {
    const startOfMonth = new Date(`${year}-${month}-01`);
    const endOfMonth = new Date(`${year}-${month}-31`);

    const enAttenteCount = await DemandeAttestation.countDocuments({
      status: 'En Attente',
      date_demande: { $gte: startOfMonth, $lte: endOfMonth }
    });

    res.json({ enAttenteCount });
  } catch (error) {
    console.error('Error fetching attente count:', error);
    res.status(500).send('Error fetching attente count');
  }
});

// nombre des utilisateur 
// Route pour compter le nombre total d'utilisateurs
app.get('/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).send('Error counting users');
  }
});



// User routes
app.post('/register', upload.single('photo'), async (req, res) => {
  const { name, prenom, email, password, dateOfBirth, description } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      prenom,
      email,
      password: hashedPassword,
      dateOfBirth,
      description,
      photo
    });

    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

app.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Server error');
  }
});

// list utilisateur
app.get("/users",async(req,res)=>{
  const data = await User.find({})
  res.json({success : true , data : data})
})

app.put('/user', upload.single('photo'), async (req, res) => {
  const { name, prenom, email, dateOfBirth, description, password } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');

    const decoded = jwt.verify(token, 'your_jwt_secret');
    const userId = decoded.id;

    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      prenom,
      email,
      dateOfBirth,
      description,
      photo,
      password
    }, { new: true, runValidators: true });

    if (!updatedUser) return res.status(404).send('User not found');

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
});

// Change Password route
app.post('/change-password', async (req, res) => {
  const { newPassword } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.status(200).send('Password updated successfully.');
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).send('Server error');
  }
});

// Admin authentication routes
app.post('/admin/register', async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, lastname, email, password: hashedPassword });
    await admin.save();
    res.status(201).send('Admin registered successfully');
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).send('Error registering admin');
  }
});

// Admin login route
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).send('Error logging in admin');
  }
});



// //Password reset routes
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).send('Aucun utilisateur trouvé avec cet email.');
//     }

//     const token = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 heure

//     await user.save();

//     // Configure Nodemailer
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // ou un autre service d'email
//       auth: {
//         user: process.env.EMAIL_USER, // Adresse email d'envoi
//         pass: process.env.EMAIL_PASS // Mot de passe ou application password
//       }
//     });

//     // Envoi de l'email de réinitialisation
//     const mailOptions = {
//       to: email,
//       subject: 'Réinitialisation de votre mot de passe',
//       text: `Vous avez demandé la réinitialisation de votre mot de passe. 
//       Cliquez sur ce lien pour le réinitialiser : 
//       http://localhost:3000/reset-password/${token}`
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).send('Un lien de réinitialisation a été envoyé à votre adresse email.');
//   } catch (error) {
//     console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
//     res.status(500).send('Erreur lors de la demande de réinitialisation du mot de passe.');
//   }
// });

// app.post('/reset-password', async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() }
//     });
//     if (!user) {
//       return res.status(400).send('Le jeton de réinitialisation du mot de passe est invalide ou a expiré.');
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).send('Votre mot de passe a été réinitialisé avec succès.');
//   } catch (error) {
//     console.error('Erreur lors de la réinitialisation du mot de passe:', error);
//     res.status(500).send('Erreur lors de la réinitialisation du mot de passe.');
//   }
// });


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
