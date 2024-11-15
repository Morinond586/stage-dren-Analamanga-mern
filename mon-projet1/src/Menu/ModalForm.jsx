import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { MdClose, MdEdit, MdInsertChart, MdUpdate } from 'react-icons/md';
import { FaUpload } from 'react-icons/fa';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <MdEdit /> Modifier
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Modification Activiter"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input4"
                    placeholder="Nom"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="inputPassword4">Type</label>
                  <input
                    type="Text"
                    class="form-control"
                    id="input"
                    placeholder="Type activité"
                  />
                </div>
              </div>
              <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Nombre</label>
                  <input
                    type="number"
                    class="form-control"
                    id="input9"
                    placeholder="Nombre activité"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="inputPassword4">Lieu</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input4"
                    placeholder="Lieu"
                  />
                </div>
              </div>

              <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input9"
                    placeholder="Description"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="input">Service</label>
                  <input
                    type="text"
                    class="form-control"
                    id="input4"
                    placeholder="Service"
                  />
                </div>
              </div>
              
              <div class="form-row d-flex">
                <div class="form-group col-md-6 m-2">
                  <label for="inputEmail4">Date</label>
                  <input
                    type="Date"
                    class="form-control"
                    id="input9"
                    placeholder="Date"
                  />
                </div>
                <div class="form-group col-md-6 m-2">
                  <label for="input">Image</label>
                  <input
                    type="file"
                    class="form-control"
                    id="input4"
                    placeholder="Image"
                  />
                </div>
              </div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Fermer
          </Button>
          <Button onClick={handleClose} autoFocus>
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
