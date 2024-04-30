import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./Screems/Home";
import Investors from "./Screems/Investors";
import Driver from "./Screems/Driver";
import MetaMask from "./Metamask";
import MetaMask1 from "./Metamask1";
export function App (){
    return(
        <div>
            
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/investors" element={<Investors/>}/>
                    <Route path="/driver" element={<Driver/>}/>
                </Routes>
            </Router>
            <MetaMask1 />
        </div>
    )
}