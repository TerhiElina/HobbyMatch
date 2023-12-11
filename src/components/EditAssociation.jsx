import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditAssociation (props) {
    const [open, setOpen] = React.useState(false);
    const [association, setAssociation] = React.useState({
        name:'', description:''
    });

    const handleClickOpen = () => {
    setOpen(true);
    setAssociation({
      name: association.name,
      description: association.description,
    });
    console.log(association);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleInputChange = (event) => {
      setAssociation({ ...association, [event.target.name]: event.target.value });
    };
    const updateCustomerHandler = () => {
      props.saveAssociation({
        ...association,
        associationid: props.associationId,
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
            name= "name"
            value={association.name}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "description"
            value={association.description}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={updateCustomerHandler}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}