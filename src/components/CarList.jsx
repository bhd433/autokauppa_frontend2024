import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/base";
import { SliderMarkLabel } from "@mui/material";



export default function CarList() {

    

  //state
  const [cars, setCars] = useState([{brand: '', model: ''}]);
    //const [openSnackBar, ]

  const [colDefs, setColDefs] = useState([
    {field: 'brand'},
    {field: 'model'},
    {cellRenderer: (params) => {
        <Button
        size="small"
        color="error"
        onClick={() => deleteCar(params)}
        >Delete
        </Button>
    }
}])



  useEffect(() => getCars, [])  //fetch once after first render


  //functiot
  //getcars
  const getCars = () => {

    fetch("https://carrestservice-carshop.rahtiapp.fi/cars", {method: 'GET'})
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
    console.log(params.data._links._car.href)

    fetch(params.data._links._car.href, {method: 'DELETE'})
    .then(window.alert())
    .catch(error => console.error(error))
  }


    return (
        <>
            <div className="ag-theme-material" style={{width: 700, height: 500}}>
            <AgGridReact
            rowData={cars}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={10}
            ></AgGridReact>

            </div>
        </>
    )
}