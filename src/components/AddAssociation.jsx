import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddAssociation(props) {
    const [open, setOpen] = React.useState(false);
    const [association, setAssociation] = React.useState({
        name:'', description:''
    });

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleInputChange = (event) => {
        setAssociation({...association,[event.target.name]: event.target.value})
    }
    const addAssociation = () => {
        console.log('Adding association:', association);

        if (association.name.trim() === '' || association.description.trim() === '') {
          console.error('Name and description are required.');
          return;
        }
    
        props.saveAssociation(association);
        handleClose();
      };
    return(
        <React.Fragment>
      <Button style={{margin:20}} variant="outlined" onClick={handleClickOpen}>
        Lisää ryhmä
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi ryhmä</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name= "name"
            value={association.name}
            onChange={e => handleInputChange(e)}
            label="Ryhmän nimi"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "description"
            value={association.description}
            onChange={e=> handleInputChange(e)}
            label="Ryhmän kuvaus"
            fullWidth
            variant="standard"
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={addAssociation}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}