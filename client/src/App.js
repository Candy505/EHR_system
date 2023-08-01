import { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes,Link} from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./components/auth/Login";
import Info from "./components/storage/Info";
import Signup from "./components/auth/Signup";
function App() {
 
  return (
    <Router>
      
    
    <Routes>
    <Route
          index
          element={    
            <> 
            <Navbar/>   
             <Login/>
             </>
          }
          />
     <Route exact path='/home' element={<Home/>}></Route>
     <Route path="/info" element={<Info />}/>
     <Route path="/signup" element={<Signup />}/>
     
   </Routes>
  </Router>
  );
}

export default App;
