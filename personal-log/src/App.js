import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Logs from './Components/Logs';
import NavBar from './Components/Navbar';

export default function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </>

  );
}


