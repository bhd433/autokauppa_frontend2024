import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';




export default function EditCar(props) {


    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', modelYear: '', price: ''
    });



    const handleClickOpen = () => {
        //console.log(props.car);
        setCar({brand: props.car.brand, model: props.car.model, color: props.car.color, fuel: props.car.fuel, modelYear: props.car.modelYear, price: props.car.price});
        setOpen(true);
    };

    
    const handleClose = () => {
        setOpen(false);
    };



    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }


    const carUpdate = () => {
        props.updateCar(car, props.car._links.car.href);
        handleClose();
    }



    return (
    <>
      <Button onClick={handleClickOpen}>
        Edit car
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            required
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={e => handleInputChange(e)}
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="model"
            value={car.model}
            onChange={e => handleInputChange(e)}
            label="Model"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="color"
            value={car.color}
            onChange={e => handleInputChange(e)}
            label="Color"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="modelYear"
            value={car.modelYear}
            onChange={e => handleInputChange(e)}
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="price"
            value={car.price}
            onChange={e => handleInputChange(e)}
            label="Price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={carUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
    );
}