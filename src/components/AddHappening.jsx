import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddHappening (props) {
    const [open, setOpen] = React.useState(false);
    const [happening, setHappening] = React.useState({
        date:'',
        time: '',
        streetaddress:'',
        postcode:'',
        city:'',
        maxparticipants:'',
        price:'',
        association: props.associationid || null,
    });
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleInputChange = (event) => {
        setHappening({...happening,[event.target.name]: event.target.value})
    }
    const addHappening = () => {
      props.saveHappening({ ...happening, associationid: props.associationId });
      handleClose();
    }; 
  
    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Lisää tapahtuma
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Tallenna</DialogTitle>
          <DialogContent>
          <TextField
            margin="dense"
            name= "date"
            value={happening.date}
            onChange={e => handleInputChange(e)}
            label="Päivämäärä"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name= "time"
            value={happening.time}
            onChange={e => handleInputChange(e)}
            label="Kellonaika"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name= "streetaddress"
            value={happening.streetaddress}
            onChange={e => handleInputChange(e)}
            label="Katuosoite"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name= "postcode"
            value={happening.postcode}
            onChange={e => handleInputChange(e)}
            label="Postinumero"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name= "city"
            value={happening.city}
            onChange={e => handleInputChange(e)}
            label="Kaupunki"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name= "maxparticipants"
            value={happening.maxparticipants}
            onChange={e => handleInputChange(e)}
            label="Maksimi osallistujamäärä"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name= "price"
            value={happening.price}
            onChange={e => handleInputChange(e)}
            label="Hinta"
            fullWidth
            variant="standard"
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addHappening}>Tallenna</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  
}