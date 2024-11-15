import React, { useState, useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { MdAddCircle, MdEdit, MdPrint } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

import AttestationFooter from '../Attestqtion/AttestatiionFooter';
import BackToTop from '../Interface/BackToTop';
import SidbarServer from './SidbarServer';
import ServerHeader from './ServerHeader';

function AttestationServerDemande() {
                          
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // For editing
  const [numInscriptionList, setNumInscriptionList] = useState([]); // For numInscription options
  const [numInscriptionInput, setNumInscriptionInput] = useState(''); // Input for numInscription
  const [numInscriptionError, setNumInscriptionError] = useState(''); // Error message for numInscription

  useEffect(() => {
    fetchData();
    fetchNumInscriptionList(); // Fetch the numInscription list
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/demandeAttestations');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchNumInscriptionList = async () => {
    try {
      const response = await axios.get('http://localhost:7000/attestationList');
      setNumInscriptionList(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des numInscriptions:', error.message);
    }
  };

  const handleNumInscriptionChange = (e) => {
    const input = e.target.value;
    setNumInscriptionInput(input);

    // Check if the input exists in the list
    const exists = numInscriptionList.some(item => item.numInscription === input);
    if (exists) {
      setNumInscriptionError('');
    } else {
      setNumInscriptionError('Le numéro d\'inscription saisi n\'existe pas. Veuillez vérifier.');
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    if (numInscriptionError) {
      return; // Prevent form submission if there's an error
    }

    const formData = new FormData(event.target);
    const data = {
      numInscription: formData.get('numInscription')?.trim() || '',
      status: formData.get('status')?.trim() || '',
      description: formData.get('description')?.trim() || '',
      adress: formData.get('adress')?.trim() || '',
      date_demande: formData.get('date_demande') || ''
    };

    try {
      await axios.post('http://localhost:7000/demandeAttestations', data);
      Swal.fire('Succès', 'Demande ajoutée avec succès', 'success');
      fetchData();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding data:', error);
      Swal.fire('Erreur', 'Impossible d\'ajouter la demande', 'error');
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      numInscription: formData.get('numInscription')?.trim(),
      status: formData.get('status')?.trim(),
      description: formData.get('description')?.trim(),
      adress: formData.get('adress')?.trim(),
      date_demande: formData.get('date_demande')
    };

    try {
      await axios.put(`http://localhost:7000/demandeAttestations/${selectedRow._id}`, data);
      Swal.fire('Succès', 'Demande mise à jour avec succès', 'success');
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire('Erreur', 'Impossible de mettre à jour la demande', 'error');
    }
  };

  const handlePrint = () => {
    Swal.fire({
      title: 'Voulez-vous imprimer maintenant?',
      text: "Assurez-vous que votre imprimante est prête.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, imprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        window.print();
      }
    });
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rows.map((row) => row._id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) => axios.delete(`http://localhost:7000/demandeAttestations/${id}`))
      );
      Swal.fire('Succès', 'Les demandes sélectionnées ont été supprimées.', 'success');
      setSelectedRows([]);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      Swal.fire('Erreur', 'Impossible de supprimer les demandes sélectionnées.', 'error');
    }
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ?? false
      )
    );
  }, [rows, searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Helper function to simulate auto-incrementing ID
  const getAutoIncrementId = (index) => index + 1;

  return (
    <div>
      <ServerHeader />
      <SidbarServer />
      <div className="container mt-3">
        <div className="d-flex justify-content-between mb-3" style={{marginTop: '-60%'}}>
          <h2>List des demandes</h2> 
          <TextField
            label="Recherche"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setShowAddModal(true)}>
            <MdAddCircle /> Ajouter
          </Button>
          <Button onClick={() => setShowPrintModal(true)}>
            <MdPrint /> Imprimer
          </Button>
          <Button onClick={handleDeleteSelected} disabled={selectedRows.length === 0} variant='danger'>
            <FaTrash /> Supprimer
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.length === rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Numéro</TableCell>
                <TableCell>Num Inscription</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Adressé à</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={row._id} selected={selectedRows.includes(row._id)}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                    />
                  </TableCell>
                  <TableCell>{getAutoIncrementId(page * rowsPerPage + index)}</TableCell>
                  <TableCell>{row.numInscription}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.adress}</TableCell>
                  <TableCell>{new Date(row.date_demande).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => { setSelectedRow(row); setShowEditModal(true); }}>
                      <MdEdit /> Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Modal pour ajouter */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Demande</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Num Inscription</Form.Label>
              <TextField
                type="text"
                name="numInscription"
                value={numInscriptionInput}
                onChange={handleNumInscriptionChange}
                fullWidth
                required
                label="Saisir le numéro d'inscription"
                error={!!numInscriptionError}
                helperText={numInscriptionError}
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status :</Form.Label>
              <Form.Control as="select" name="status" required>
                <option value="">Sélectionner...</option>
                <option value="Valider">Valider</option>
                <option value="En Attente">En Attente</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description :</Form.Label>
              <Form.Control type="text" name="description" />
            </Form.Group>
            <Form.Group controlId="formAdresseAttestation">
              <Form.Label>Adressé à :</Form.Label>
              <Form.Control type="text" name="adress" />
            </Form.Group>
            <Form.Group controlId="formFaitEn">
              <Form.Label>Date :</Form.Label>
              <Form.Control type="date" name="date_demande" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal pour imprimer */}
      <Modal show={showPrintModal} onHide={() => setShowPrintModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Impression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous imprimer maintenant?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrintModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handlePrint}>
            Imprimer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pour éditer */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Demande</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Num Inscription</Form.Label>
              <TextField
                type="text"
                name="numInscription"
                value={selectedRow?.numInscription || ''}
                fullWidth
                required
                label="Saisir le numéro d'inscription"
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" defaultValue={selectedRow?.status} required>
                <option value="">Sélectionner...</option>
                <option value="Valider">Valider</option>
                <option value="En Attente">En Attente</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" defaultValue={selectedRow?.description} />
            </Form.Group>
            <Form.Group controlId="formAdresseAttestation">
              <Form.Label>Adressé à :</Form.Label>
              <Form.Control type="text" name="adress" defaultValue={selectedRow?.adress} />
            </Form.Group>
            <Form.Group controlId="formFaitEn">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date_demande" defaultValue={selectedRow?.date_demande ? new Date(selectedRow.date_demande).toISOString().split('T')[0] : ''} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <BackToTop />
      <AttestationFooter />
    </div>
  );
}

export default AttestationServerDemande;

