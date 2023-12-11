import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditUser (props) {
    const [open, setOpen] = React.useState(false);
    const [person, setPerson] = React.useState({
        firstname:'', lastname:'', email: ''
    });

    const handleClickOpen = () => {
    setOpen(true);
    setPerson({
      firstname: person.firstname,
      lastname: person.lastname,
      email: person.email
    });
    console.log(person);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleInputChange = (event) => {
      setPerson({ ...person, [event.target.name]: event.target.value });
    };
    const updateUserHandler = () => {
      props.saveUser({
        ...person,
        personid: props.personId,
      });
      handleClose();
    };

    return(
        <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        Muokkaa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Muokkaa tietoja</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name= "firstname"
            value={person.firstname}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "lastname"
            value={person.lastname}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "email"
            value={person.email}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={updateUserHandler}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}