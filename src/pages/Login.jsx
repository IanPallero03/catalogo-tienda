import { useState } from "react";

const Login = ({ setIsAdmin, setShowLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (password === "1234") {
      localStorage.setItem("admin", "true"); // 🔥 Guardar sesión
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      setError("Contraseña incorrecta");
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Iniciar Sesión
        </h2>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="w-full mt-2 text-sm text-gray-500"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default Login;