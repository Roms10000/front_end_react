import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Modal from "./components/Modal";
import Modal1 from "./components/Modal1";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import RequestQuote from "./components/RequestQuote";
import { Route,Routes } from "react-router"
import './App.css'


export default function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/modal1" element={<Modal1 />} />
        <Route path="/requestQuote" element={<RequestQuote/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>     
    </>
  )
}
