import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditHappening (props) {
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
    setHappening({
      date: happening.date,
    time: happening.time,
    streetaddress: happening.streetaddress,
    postcode: happening.postcode,
    city: happening.city,
    maxparticipants: happening.maxparticipants,
    price: happening.price
    });
    console.log(happening);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleInputChange = (event) => {
      setHappening({ ...happening, [event.target.name]: event.target.value });
    };
    const updateHappeningHandler = () => {
      props.saveHappening({
        ...happening,
        happeningid: props.happeningid,
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
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={updateHappeningHandler}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}