//import { useState } from 'react'
//import './App.css'

import { AppBar, Toolbar, Typography } from "@mui/material"
import CarList from "./components/CarList"
import { useEffect, useState } from "react"



function App() {  


  //return
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car App</Typography>
        </Toolbar>
      </AppBar>

      <CarList />
    </>
  )
}


export default App
