import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes,Link} from "react-router-dom";
import Navbar from "./components/Navbar"
import Choose from "./components/Choose";
function App() {
 
  return (
    <Router>
      
    
    <Routes>
    <Route
          index
          element={    
            <> 
            <Navbar/>   
             <Choose/>
             </>
          }
          />
     <Route exact path='/home' element={<Home/>}></Route>
   </Routes>
  </Router>
  );
}

export default App;
