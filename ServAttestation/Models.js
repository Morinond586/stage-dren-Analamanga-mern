const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Attestations
const attestationSchema = new Schema({
  nom: String,
  prenom: String,
  numInscription: String,
  dateNaissance: String,
  lieuNaissance: String,
  centreCorrection: String,
  session: String
});

// Model for Attestations
const Attestation = mongoose.model('Attestations', attestationSchema);

// Schema for ServerAttestation
const serverAttestationSchema = new Schema({
  nom: String,
  prenom: String,
  numInscription: String,
  dateNaissance: String,
  lieuNaissance: String,
  centreCorrection: String,
  session: String
});

// Model for ServerAttestation
const ServerAttestation = mongoose.model('ServerAttestation', serverAttestationSchema);

// Post-save hook to create or update ServerAttestation
attestationSchema.post('save', async function(doc) {
  try {
    await ServerAttestation.findByIdAndUpdate(doc._id, doc, { upsert: true, new: true });
  } catch (error) {
    console.error('Error updating ServerAttestation on save:', error);
  }
});

module.exports = { Attestation, ServerAttestation };
