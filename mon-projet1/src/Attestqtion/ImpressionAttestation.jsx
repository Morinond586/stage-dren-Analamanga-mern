import React, { useState } from 'react';
import './Attestyle.css';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { FaTrash } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdAdd, MdAddCircle, MdPrint } from 'react-icons/md';

function ImpressionAttestation() {

  return (
    <div className='container'>
      <div className="main--content">
        <div className="header--wrapper">
          <div className="header--title">
            <h2>Impression d'attestation</h2>
          </div>
          <div className="user--info">
            <Button variant="success"><MdPrint />Imprimer</Button>
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImpressionAttestation;
