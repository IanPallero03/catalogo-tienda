import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem("productos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin === "true") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  return (
    <>
      {isAdmin ? (
        <Admin
          setIsAdmin={setIsAdmin}
          productos={productos}
          setProductos={setProductos}
        />
      ) : showLogin ? (
        <Login setIsAdmin={setIsAdmin} setShowLogin={setShowLogin} />
      ) : (
        <Home setShowLogin={setShowLogin} productos={productos} />
      )}
    </>
  );
}

export default App;