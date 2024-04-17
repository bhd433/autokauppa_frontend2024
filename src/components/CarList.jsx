import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import { SliderMarkLabel } from "@mui/material";

//addcar + editcar
import AddCar from './AddCar';
import EditCar from './EditCar';



export default function CarList() {


  //state
  const [cars, setCars] = useState([{ brand: '', model: '' }]);
  const [openSnackBar, setOpenSnackBar] = useState(false);



  const [colDefs, setColDefs] = useState([
    { field: 'brand' },
    { field: 'model' },
    { field: 'modelYear' },
    { field: 'price' },
    {
      headerName: 'Delete',
      cellRenderer: (params) => {
        return (
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => deleteCar(params)}
          >Delete
          </Button>
        )
      }
    },
    {
      headerName: 'Edit',
      cellRenderer: (params) => {
        return (
          //<Button
          //  size="small"
          //  color="info"
          //  variant="contained"
          //onClick={(row) => 
          <EditCar updateCar={updateCar} car={params.data} />
          //}
          //>Edit
          //</Button>
        )
      }
    }
  ])



  useEffect(() => getCars, [])  //fetch once after first render



  //functiot
  //getcars
  const getCars = () => {

    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", { method: 'GET' })
      .then(autot => {
        console.log(autot)
        return autot.json()
      })
      .then(autodata => {
        console.log(autodata._embedded.cars)
        setCars(autodata._embedded.cars)
      })
      .catch(error => console.error(error))
  }




  const deleteCar = (params) => {
    console.log(params.data._links.car.href);
    fetch(params.data._links.car.href, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setOpenSnackBar(true);
          window.location.reload()
        } else {
          window.alert("NO delete");
        }
      })
      .catch((error) => console.log(error));
  };


  const saveCar = (car) => {

    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
      .then(res => getCars())
      //.then(window.location.reload())
      .catch(err => console.error(err))
  }



  const updateCar = (car, link) => {

    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
    .then(res => getCars())
    .catch(err => console.error(err))
  }


  const handleCloseSnackBar = () => {
    setOpenSnackBar(false); // close Snackbar when user clicks away or timeout
  };




  return (
    <>
      <div className="ag-theme-material" style={{ width: '100%', maxWidth: '1200px', height: '750px', margin: '0 auto' }}>
        <AgGridReact
          rowData={cars}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message="Car deleted successfully"
      />

      <AddCar saveCar={saveCar} />
    </>
  )
}