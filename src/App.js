
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import  About from './Components/About';
import Notestate from './Context/notes/Notestate';
function App() {
  return (
<>
<Notestate>

<BrowserRouter>

<Navbar></Navbar>
<div className="container">
      <Routes>
    
        <Route exact path="/" element={<Home></Home>}/>
       
     
          <Route exact path="/about" element={<About></About>} />
        
      </Routes>
      </div>
    </BrowserRouter>





    </Notestate>
</>
    
    
    
    
    
    
    
    
    
    
    
    

  );
}

export default App;
