import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Button, Form, Card, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { MdAddCircle, MdDelete, MdEdit, MdFileOpen, MdLocalPrintshop, MdImportExport, MdArchive, MdSend } from 'react-icons/md';
import ReactToPrint from 'react-to-print';
import * as XLSX from 'xlsx';
import Header from '../components/Header';
import ContenuSidebar from '../Contenu/ContenuSidebar'
import Swal from 'sweetalert2';
import SidbarActiviter from './SidbarActiviter';
import ServerHeader from '../serverApplications/ServerHeader';
import AttestationFooter from '../Attestqtion/AttestatiionFooter';
import BackToTop from '../Interface/BackToTop';

// PrintList Component for Print Preview
function PrintList({ items }) {
  return (
    <div>
      <h2 className='text-center'>List d'activiter de division</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Lieu</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.nom}</TableCell>
              <TableCell>{item.prenom}</TableCell>
              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.lieu}</TableCell>
              <TableCell>{item.service}</TableCell>
              <TableCell>
                {item.image && (
                  <Card.Img variant="top" src={`http://localhost:5000/${item.image}`} style={{ width: '40px' }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Upload Component
const Upload = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nom');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [nombre, setNombre] = useState('');
  const [lieu, setLieu] = useState('');
  const [service, setService] = useState('');
  const [post, setPost] = useState('');
  const [image, setImage] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const printRef = useRef();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm]);

  const fetchItems = async () => {
    const result = await axios('http://localhost:5000/items');
    setItems(result.data);
  };

  const filterItems = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = items.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(lowercasedSearchTerm)
      )
    );
    setFilteredItems(filtered);
  };

  const handleArchiveShow = () => {
    setShowArchiveModal(true);
  };

  const handleArchiveClose = () => {
    setShowArchiveModal(false);
  };

  const handleArchiveSelectedItems = () => {
    handleArchiveShow();
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredItems.map((item) => item._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleShow = (item = null) => {
    if (item) {
      setEditItem(item);
      setNom(item.nom);
      setPrenom(item.prenom);
      setDate(new Date(item.date).toISOString().substr(0, 10));
      setType(item.type);
      setNombre(item.nombre);
      setLieu(item.lieu);
      setService(item.service);
      setPost(item.post);
      setImage(null); // Keep the image as is null
    } else {
      setEditItem(null);
      setNom('');
      setPrenom('');
      setDate('');
      setType('');
      setNombre('');
      setLieu('');
      setService('');
      setPost('');
      setImage(null);
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: 'Confirmer',
      text: editItem ? 'Voulez-vous modifier cet élément?' : 'Voulez-vous ajouter cet élément?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, continuer!',
      cancelButtonText: 'Annuler'
    });
  
    if (result.isConfirmed) {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('date', date);
      formData.append('type', type);
      formData.append('nombre', nombre);
      formData.append('lieu', lieu);
      formData.append('service', service);
      formData.append('post', post);
      if (image) {
        formData.append('image', image);
      }
  
      try {
        if (editItem) {
          await axios.put(`http://localhost:5000/items/${editItem._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Modifié!', 'L\'élément a été modifié avec succès.', 'success');
        } else {
          await axios.post('http://localhost:5000/items', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          Swal.fire('Ajouté!', 'L\'élément a été ajouté avec succès.', 'success');
        }
        handleClose();
        fetchItems();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout ou de la modification.',
        });
      }
    }
  };

  const deleteItem = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    });
  
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:5000/items/${id}`);
      fetchItems();
    }
  };
  
  const handleDeleteSelected = async () => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    });
  
    if (result.isConfirmed) {
      try {
        await Promise.all(selected.map(id =>
          axios.delete(`http://localhost:5000/items/${id}`)
        ));
        Swal.fire('Supprimé!', 'Les éléments ont été supprimés.', 'success');
        setSelected([]);
        fetchItems();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression.',
        });
      }
    }
  };

  const handleExportToExcel = () => {
    const selectedRows = filteredItems.filter(item => selected.includes(item._id));
    const worksheet = XLSX.utils.json_to_sheet(selectedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'selected_rows.xlsx');
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredItems.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredItems, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredItems],
  );

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const handleClosePrintModal = () => {
    setShowPrintModal(false);
  };

  return (
    <div>
      <ServerHeader />
      <SidbarActiviter />
    <div className='container' style={{marginTop: '-45%'}}>
    <Container>
    <h2 className='text-center mt-5 no-print'>List d'activiter de division</h2>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editItem ? 'Modification Activiter' : 'Ajout Activiter'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Lieu</Form.Label>
              <Form.Control
                type="text"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Post</Form.Label>
              <Form.Control
                type="text"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editItem ? 'Modifier' : 'Ajouter'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Print Modal */}
      <Modal show={showPrintModal} onHide={handleClosePrintModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Imprimer la liste</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactToPrint
            trigger={() => <Button variant="primary">Imprimer</Button>}
            content={() => printRef.current}
          />
          <div ref={printRef}>
            <PrintList items={filteredItems.filter(item => selected.includes(item._id))} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePrintModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      <Box sx={{ width: '100%' }} className="mt-2 m-2">
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Button onClick={() => handleShow()} style={{backgroundColor: 'rgba(113, 99, 186, 255)'}} className="m-3">Ajouter <MdAddCircle /></Button>
          <Button onClick={handlePrint} style={{backgroundColor: 'rgba(113, 99, 186, 255)'}} className="m-3">Imprimer <MdLocalPrintshop /></Button>
          <Button onClick={handleExportToExcel} style={{backgroundColor: 'rgba(113, 99, 186, 255)'}} className="m-3">Exporter <MdFileOpen /></Button>

          <Button onClick={handleDeleteSelected} variant="danger" className="m-3" disabled={!selected.length}>
            <MdDelete /> Selected
          </Button>

          {/* Search Field */}
          <TextField
            className="m-3"
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2, width: '30%' }}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 850 }}
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < filteredItems.length}
                      checked={filteredItems.length > 0 && selected.length === filteredItems.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell align="center">Numéro</TableCell>
                  <TableCell sortDirection={orderBy === 'nom' ? order : false} align="center">
                    <TableSortLabel
                      active={orderBy === 'nom'}
                      direction={orderBy === 'nom' ? order : 'asc'}
                      onClick={() => handleRequestSort('nom')}
                    >
                      Nom
                      {orderBy === 'nom' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Prénom</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Lieu</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((item, index) => (
                  <TableRow
                    key={item._id}
                    hover
                    onClick={(event) => handleClick(event, item._id)}
                    role="checkbox"
                    aria-checked={isSelected(item._id)}
                    selected={isSelected(item._id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isSelected(item._id)}
                        inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${item._id}` }}
                      />
                    </TableCell>
                    <TableCell align="center">{(page * rowsPerPage) + index + 1}</TableCell>
                    <TableCell align="center">{item.nom}</TableCell>
                    <TableCell align="center">{item.prenom}</TableCell>
                    <TableCell align="center">{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{item.type}</TableCell>
                    <TableCell align="center">{item.nombre}</TableCell>
                    <TableCell align="center">{item.lieu}</TableCell>
                    <TableCell align="center">{item.service}</TableCell>
                    <TableCell align="center">
                      {item.image && (
                        <Card.Img variant="top" src={`http://localhost:5000/${item.image}`} style={{ width: '40px' }} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleShow(item)} style={{backgroundColor: 'rgba(113, 99, 186, 255)'}} className="m-2"><MdEdit /></Button>
                      <Button onClick={() => deleteItem(item._id)} variant="danger" className="m-2"><MdDelete /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={9} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      
      <Modal show={showArchiveModal} onHide={handleArchiveClose}>
        <Modal.Header closeButton>
          <Modal.Title>Archiver les éléments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir archiver les éléments sélectionnés?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleArchiveClose}>Annuler</Button>
          <Button variant="primary" onClick={handleArchiveSelectedItems}>Archiver</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
    <AttestationFooter />
    <BackToTop />
    </div>
  );
}



// Helper functions for sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

Upload.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Upload;
