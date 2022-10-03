import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import Navbar from "./Component/Navbar";
import View from "./Component/View";
import EditHandler from "./Component/EditHandler";
import Logout from "./Component/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/View" element={<View />} />
          <Route path="/Edit" element={<EditHandler />} />
          <Route path="/Logout" element={<Logout />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
