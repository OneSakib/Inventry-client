import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import GenerateQrCode from "./pages/GenerateQrCode.jsx";
import ScanQrCode from "./pages/ScanQrCode.jsx";
import Home from "./pages/Home.jsx";
import EditQrCode from "./pages/EditQrCode.jsx";
export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/generateqrcode" element={<GenerateQrCode />} />
      <Route exact path="/editqrcode/:customerId" element={<EditQrCode />} />
      <Route exact path="/scanqrcode" element={<ScanQrCode />} />
    </Routes>
  );
}
