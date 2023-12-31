import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
// Routers
import Routers from "../routers.js";
import "../assets/layout.css";
export default function Layouts() {
  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <Header />
        <Routers />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
