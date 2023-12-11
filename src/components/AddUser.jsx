import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddUser(props) {
    const [open, setOpen] = React.useState(false);
    const [person, setPerson] = React.useState({
        firstname:'', lastname:'', email:''
    });

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleInputChange = (event) => {
        setPerson({...person,[event.target.name]: event.target.value})
    }
    const addUser = () => {
        console.log('Adding user:', person);
    
        props.saveUser(person);
        handleClose();
      };
    return(
        <React.Fragment>
      <Button style={{margin:20}} variant="outlined" onClick={handleClickOpen}>
        Lisää käyttäjä
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi käyttäjä</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name= "firstname"
            value={person.firstname}
            onChange={e => handleInputChange(e)}
            label="Etunimi"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "lastname"
            value={person.lastname}
            onChange={e=> handleInputChange(e)}
            label="Sukunimi"
            fullWidth
            variant="standard"
          />
             <TextField
            margin="dense"
            name= "email"
            value={person.email}
            onChange={e=> handleInputChange(e)}
            label="Sähköposti"
            fullWidth
            variant="standard"
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={addUser}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}