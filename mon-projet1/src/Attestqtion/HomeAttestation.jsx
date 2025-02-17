import React, { useState, useEffect, useMemo } from 'react';
import './Attestyle.css'; // Assurez-vous d'ajouter les styles d'impression dans ce fichier
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
import { FaFileExcel, FaTrash } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdAddCircle, MdEdit, MdPrint } from 'react-icons/md';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
// Assurez-vous d'avoir une image de logo dans le dossier public
import logoMadagascar from '../images/republique-madagascar.jpg';
import logodren from '../images/logoDREN8ANALAMANGA.jpg';


function HomeAttestation() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [rows, setRows] = useState([]);
  const [editData, setEditData] = useState({
    _id: '',
    nom: '',
    prenom: '',
    numInscription: '',
    dateNaissance: '',
    lieuNaissance: '',
    centreCorrection: '',
    session: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/attestationList');
        setRows(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error.message);
      }
    };
    fetchData();
  }, []);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleShowEditModal = (data) => {
    setEditData(data);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleClosePrintModal = () => setShowPrintModal(false);
  const handleShowPrintModal = () => {
    const selectedData = rows.filter(row => selectedRows.includes(row._id));
    setPrintData(selectedData);
    setShowPrintModal(true);
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
        const printContent = document.getElementById('print-content').innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = `${printContent}`;
        window.print();
        document.body.innerHTML = originalContent;
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedRows(rows.map((row) => row._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredRows = useMemo(() => {
    return rows.filter(row =>
      (row.nom ? row.nom.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (row.prenom ? row.prenom.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (row.numInscription ? row.numInscription.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (row.centreCorrection ? row.centreCorrection.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (row.session ? row.session.toLowerCase().includes(searchTerm.toLowerCase()) : false)
    );
  }, [searchTerm, rows]);

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// Fiare imorter de fichier excel 
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:7000/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const response = await axios.get('http://localhost:7000/attestationList');
      setRows(response.data);
      handleCloseAddModal();
      Swal.fire({
        title: 'Importation réussie!',
        text: 'Les données ont été importées avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Erreur lors de l\'importation des données:', error);
      Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur est survenue lors de l\'importation.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };


  // Export selected rows to Excel
  const handleExport = () => {
    const selectedData = rows.filter(row => selectedRows.includes(row._id));
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attestations');
    XLSX.writeFile(workbook, 'attestations.xlsx');
  };

  // suppression
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:7000/attestations/${id}`);
        setRows(rows.filter(row => row._id !== id));
        setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        Swal.fire(
          'Supprimé!',
          'L\'attestation a été supprimée.',
          'success'
        );
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'attestation:', error);
        Swal.fire(
          'Erreur!',
          'Une erreur est survenue lors de la suppression.',
          'error'
        );
      }
    }
  };

// Modification 
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:7000/attestations/${editData._id}`, editData);
      const updatedRows = rows.map(row => row._id === editData._id ? editData : row);
      setRows(updatedRows);
      handleCloseEditModal();
      Swal.fire({
        title: 'Modifié!',
        text: 'Les données ont été mises à jour avec succès.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'attestation:', error);
      Swal.fire({
        title: 'Erreur!',
        text: 'Une erreur est survenue lors de la mise à jour.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className='container'>
      <div className="main--content" style={{marginTop: '-400px'}}>
        <div className="header--wrapper">
          <div className="header--title">
            {/* <h2>Gestion d'attestation au sein de la DREN Anlamanga client</h2> */}
          </div>
          <div className="user--info">
            <Button  onClick={handleShowAddModal} style={{backgroundColor: 'rgba(113, 99, 186, 255)'}}><MdAddCircle /> Importer nouvelle liste</Button>
            <Button  onClick={handleShowPrintModal} style={{backgroundColor: 'rgba(113, 99, 186, 255)'}}><MdPrint /> Imprimer</Button>
            <Button  onClick={handleExport} style={{backgroundColor: 'rgba(113, 99, 186, 255)'}}><FaFileExcel /> Exporter</Button>
            <Link style={{backgroundColor: 'transparent', color: 'rgba(113, 99, 186, 255)'}} to={"/demandeAttestation"}>Demande Attestation</Link>
          </div>
        </div>

        <div className="tabular--wrapper">
          <div className="header--wrapper">
            <div className="header--title">
              <h3 className="main--title">Liste d'attestations</h3>
            </div>
            <div className="user--info">
              <TextField
                label="Rechercher"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div id="">
            <TableContainer component={Paper} >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                        checked={rows.length > 0 && selectedRows.length === rows.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {/* <TableCell>Numéro</TableCell> */}
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Num inscription</TableCell>
                    <TableCell>Date de naissance</TableCell>
                    <TableCell>Lieu de naissance</TableCell>
                    <TableCell>Centre correction</TableCell>
                    <TableCell>Session</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.map((row, index) => (
                    <TableRow key={row._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.includes(row._id)}
                          onChange={() => handleSelectRow(row._id)}
                        />
                      </TableCell>
                      {/* <TableCell>{row._id}</TableCell> */}
                      <TableCell>{row.nom}</TableCell>
                      <TableCell>{row.prenom}</TableCell>
                      <TableCell>{row.numInscription}</TableCell>
                      <TableCell>{row.dateNaissance}</TableCell>
                      <TableCell>{row.lieuNaissance}</TableCell>
                      <TableCell>{row.centreCorrection}</TableCell>
                      <TableCell>{row.session}</TableCell>
                      <TableCell align="center" className='d-flex'>
                        <Button variant="success" onClick={() => handleShowEditModal(row)} className='m-1'><MdEdit /></Button>
                        <Button variant="danger" onClick={() => handleDelete(row._id)} className='m-1'><FaTrash /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
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
      </div>

      {/* Modal for Add */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Importer une liste</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile">
            <Form.Label>Choisir un fichier Excel</Form.Label>
            <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Fermer</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Edit */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'attestation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={editData.nom}
                onChange={(e) => setEditData({ ...editData, nom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                value={editData.prenom}
                onChange={(e) => setEditData({ ...editData, prenom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formNumInscription">
              <Form.Label>Numéro d'inscription</Form.Label>
              <Form.Control
                type="text"
                value={editData.numInscription}
                onChange={(e) => setEditData({ ...editData, numInscription: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDateNaissance">
              <Form.Label>Date de naissance</Form.Label>
              <Form.Control
                type="date"
                value={editData.dateNaissance}
                onChange={(e) => setEditData({ ...editData, dateNaissance: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formLieuNaissance">
              <Form.Label>Lieu de naissance</Form.Label>
              <Form.Control
                type="text"
                value={editData.lieuNaissance}
                onChange={(e) => setEditData({ ...editData, lieuNaissance: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCentreCorrection">
              <Form.Label>Centre de correction</Form.Label>
              <Form.Control
                type="text"
                value={editData.centreCorrection}
                onChange={(e) => setEditData({ ...editData, centreCorrection: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formSession">
              <Form.Label>Session</Form.Label>
              <Form.Control
                type="text"
                value={editData.session}
                onChange={(e) => setEditData({ ...editData, session: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Annuler</Button>
          <Button variant="primary" onClick={handleUpdate}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
  {/* Modal d'impression */}
  <Modal show={showPrintModal} onHide={handleClosePrintModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Impression des attestations</Modal.Title>
  </Modal.Header>
  <Modal.Body id="print-content">
    <div style={{ border: '1px solid black', margin: '20px' }}>
      <div className="">
        <img src={logoMadagascar} alt="Logo de la République de Madagascar" style={{ width: '150px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        <div className="d-flex">
          <img src={logodren} alt="Logo de la DREN" style={{ width: '90px', marginBottom: '30px', display: 'block', marginRight: 'auto', marginLeft: 'auto' }} />
          <p style={{ marginRight: 'auto', fontSize: '15px' }}>Antananarivo,</p>
        </div>
        <div className='d-flex m-3'>
          <div className='left' style={{ marginLeft: '30px', marginTop: '-20px' }}>
            <p style={{ textTransform: 'uppercase', fontSize: '15px', textAlign: 'center', marginTop: '-20px' }}>Ministère de l'Éducation Nationale</p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px', textAlign: 'center', marginTop: '-20px' }}>**************</p>
            <p style={{ textTransform: 'uppercase', fontSize: '15px', textAlign: 'center', marginTop: '-20px' }}>Secretariat général</p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px', textAlign: 'center', marginTop: '-20px' }}>**************</p>
            <p style={{ textTransform: 'uppercase', fontSize: '15px', textAlign: 'center', marginTop: '-20px' }}>Direction régionale de l'éducation nationale Analamanga</p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px', textAlign: 'center', marginTop: '-20px' }}>**************</p>
            <p style={{ textTransform: 'uppercase', fontSize: '15px', textAlign: 'center', marginTop: '-20px' }}>Service de la gestion des établissements scolaires</p>
            <p style={{ textTransform: 'uppercase', fontSize: '12px', textAlign: 'center', marginTop: '-20px' }}>**************</p>
          </div>
          <div className='right' style={{ marginLeft: '45px' }}>
            <p style={{ fontSize: '14px', marginTop: '-60px' }}>Le Directeur régional de l'Éducation Nationale</p>
            <p style={{ fontSize: '14px', textAlign: 'center' }}>à</p>
            <p style={{ fontSize: '14px', textAlign: 'center' }}>Monsieur/Madame:..............</p>
            <p style={{ fontSize: '14px', }}>...............................</p>
            <p style={{ fontSize: '14px', }}>...............................</p>
          </div>
        </div>
        <p style={{fontSize: '14px', margin: '20px'}}> N° 24/ ... MEN/SG/DREN/SGES/Div.Exam/Attestation</p>
        <h1  style={{fontSize: '14px', textAlign: 'center'}}>ATTESTATION</h1>
        <h1  style={{fontSize: '14px', textAlign: 'center',}}>(Sous réserve de l'aprobation de Monsieur le Directeur des Examens et Certification)</h1>
        <p  style={{fontSize: '14px', textAlign: 'center',}}>je soussigné, <span  style={{fontSize: '14px', textTransform: 'uppercase'}}>directeur Regional de l'Education National</span> atteste que : </p>
         
        {printData.length > 0 ? printData.map((data, index) => (
              <div key={index}>
                <h1 style={{ fontSize: '14px', margin: '20px'}}>{data.nom} {data.prenom}.</h1>
                <h1 style={{ fontSize: '14px', margin: '20px'}}>Né(e) le : {data.dateNaissance} à {data.lieuNaissance}</h1>
                <p style={{ fontSize: '14px', margin: '20px'}}>à subi avec succès les epreuvre des examen du :</p>
                <h1 style={{ fontSize: '15px', marginTop: '-2px', textAlign: 'center'}}>Brevet d'Etudes du Premier cycle de <br />
                  l'enseignemant sécondaire <br />(BEPC)</h1>
                  <h1 style={{ fontSize: '14px', margin: '20px'}}> <span>Session de :</span> {data.session} Centre de correction : {data.centreCorrection}</h1>
                <h1 style={{ fontSize: '14px', margin: '20px'}}>Numéro d'inscription : {data.numInscription}</h1>         
              </div>
            )) : <p style={{ textAlign: 'center', color: 'red' }}>Aucune donnée disponible pour l'impression</p>}
      
      </div>
   
      <div className="" style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '15px', margin: '20px'}}>La présente attestation vous est adressée sur la demande de l'intéressé(e) pour compléter son dossier.....................................</p>
        <p style={{ fontSize: '15px', textAlign: 'center', float: 'right', marginRight: '20px' }}>Po: Le Chef du Service de la Gestion des <br /> Établissements Scolaires.</p>
        <p style={{ fontSize: '14px', marginTop: '90px', marginLeft: '20px' }}>N.B: Toute reproduction est interdite</p>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClosePrintModal}>
      Fermer
    </Button>
    <Button variant="primary" onClick={handlePrint}>
      Imprimer
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
}

export default HomeAttestation;
