
import { useState, useEffect } from "react";
import Modal from "../pages/Modal";
import Flechas from "../pages/Flechas";
import WhatsAppFloat from "../pages/WhatsAppFloat";
const Home = ({ setShowLogin, productos }) => {
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8; // Ideal para grid 4x2
  const [orden, setOrden] = useState("default");
  const [mostrarOrden, setMostrarOrden] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // simulamos carga
  
    return () => clearTimeout(timer);
  }, []);
  
  const productosFiltrados = productos
  .filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (producto.descripcion || "").toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.precio.toString().includes(busqueda)
  )
  .sort((a, b) => {
    if (orden === "asc") {
      return a.precio - b.precio;
    }
    if (orden === "desc") {
      return b.precio - a.precio;
    }
    return 0;
  });

// PAGINACIÓN
const indiceFinal = paginaActual * productosPorPagina;
const indiceInicio = indiceFinal - productosPorPagina;

const productosPaginados = productosFiltrados.slice(
  indiceInicio,
  indiceFinal
);

const totalPaginas = Math.ceil(
  productosFiltrados.length / productosPorPagina
);

const SkeletonCard = () => (
  <div className="bg-white rounded shadow-md overflow-hidden animate-pulse">
    
    <div className="w-full h-52 bg-gray-200"></div>

    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 mt-4"></div>
    </div>

  </div>
);
  return (
    
    <div className="min-h-screen bg-gray-50 pb-10">

      {/* HEADER */}
      <div className="bg-white shadow-sm sticky top-0 z-10">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <h1 className="text-2xl font-bold text-gray-800">
            Catálogo
          </h1>

          <button
            onClick={() => {
              const adminGuardado = localStorage.getItem("admin");

              if (adminGuardado === "true") {
                window.location.reload();
              } else {
                setShowLogin(true);
              }
            }}
            className="
              bg-gray-800 text-white
              px-4 py-2
              rounded-lg
              hover:bg-gray-700
              transition
              cursor-pointer
              shadow-sm
            "
          >
            Admin
          </button>

        </div>

      </div>


      {/* TITULO */}
      <div className="text-center mt-10 mb-10">

     {/* CABECERA */}
     <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 px-4">
  <div className="flex items-center gap-3">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18l-2 10H5L3 7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a3 3 0 016 0v2" />
    </svg>

    <h1 className="text-3xl font-bold">
      Catálogo de Productos
    </h1>

  </div>


  {/* BUSCADOR */}
 {/* BUSCADOR + ORDENAR */}
 <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
{/* BUSCADOR */}
<div className="relative">

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="
      absolute left-4 top-1/2
      -translate-y-1/2
      w-5 h-5
      text-gray-400
      pointer-events-none
    "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.5" y2="16.5" />
  </svg>

  <input
    type="text"
    placeholder="Buscar productos..."
    value={busqueda}
    onChange={(e) => {
      setBusqueda(e.target.value);
      setPaginaActual(1);
    }}
    className="
      pl-11 pr-4 py-2.5
      w-full sm:w-64
      border border-gray-300
      rounded-xl
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-gray-300
      focus:border-gray-400
      transition
    "
  />

</div>


{/* ORDENAR */}
<div className="relative">

  <button
    onClick={() => setMostrarOrden(!mostrarOrden)}
    className="
    w-full sm:w-auto
    flex items-center justify-center gap-2
    px-4 py-2.5
    bg-white
    border border-gray-300
    rounded-xl
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
  "
  >
    Ordenar

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 transition-transform duration-300 ${
        mostrarOrden ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="6 9 12 15 18 9"/>
    </svg>

  </button>


{/* MENU */}
{mostrarOrden && (

<div
  className="
    absolute right-0 mt-2
    bg-white
    rounded-xl
    shadow-lg
    border
    w-56
    overflow-hidden
    animate-fade
    z-20
  "
>

  {/* Recomendados */}
  <button
    onClick={() => {
      setOrden("default");
      setMostrarOrden(false);
    }}
    className="
      w-full flex items-center gap-3
      px-4 py-3
      hover:bg-gray-100
      transition
      cursor-pointer
    "
  >

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 17l-5 3 1.5-5.5L4 10.5l5.7-.5L12 5l2.3 5 5.7.5-4.5 4 1.5 5.5z"/>
    </svg>

    Recomendados

  </button>
  <div className="border-t mx-2"></div>

  {/* Más económicos */}
  <button
    onClick={() => {
      setOrden("asc");
      setMostrarOrden(false);
    }}
    className="
      w-full flex items-center gap-3
      px-4 py-3
      hover:bg-gray-100
      transition
      cursor-pointer
    "
  >

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M8 17l4-4 4 4"/>
      <line x1="12" y1="13" x2="12" y2="3"/>
    </svg>

    Más económicos

  </button>
  <div className="border-t mx-2"></div>

  {/* Más caros */}
  <button
    onClick={() => {
      setOrden("desc");
      setMostrarOrden(false);
    }}
    className="
      w-full flex items-center gap-3
      px-4 py-3
      hover:bg-gray-100
      transition
      cursor-pointer
    "
  >

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M8 7l4 4 4-4"/>
      <line x1="12" y1="21" x2="12" y2="11"/>
    </svg>

    Más caros

  </button>

</div>

)}



</div>

</div>

</div>

<p className="text-gray-400 text-sm mt-2">
  Mostrando {productosFiltrados.length} productos
</p>
      </div>


{productosFiltrados.length === 0 && (
  <p className="text-center text-gray-500 mb-6">
    No se encontraron productos
  </p>
)}
      {/* PRODUCTOS */}
      <div
  key={paginaActual}
  className="
    animarProductos
    max-w-7xl
    mx-auto
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    px-4 sm:px-6
    gap-5 sm:gap-8
  "
>

{loading
  ? Array.from({ length: productosPorPagina }).map((_, i) => (
      <SkeletonCard key={i} />
    ))
  : productosPaginados.map((producto) => (
        <div
  key={producto.id}
  onClick={() => setProductoSeleccionado(producto)}
  className="
    bg-white
    rounded
    shadow-md
    cursor-pointer
    overflow-hidden
    hover:shadow-xl
    hover:-translate-y-1
    transition-all duration-300
  "
>

            {/* IMAGEN */}
            {producto.imagen && (
              <div className="overflow-hidden">

                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="
                    w-full
                    h-44 sm:h-52
                    object-cover
                    hover:scale-105
                    transition duration-300
                  "
                />

              </div>
            )}


            {/* INFO */}
            <div className="p-5">

              <h2 className="text-lg font-bold text-gray-800 mb-1">
                {producto.nombre}
              </h2>

              <p className="
                text-gray-500
                text-sm
                mb-3
                line-clamp-2
              ">
                {producto.descripcion}
              </p>


              {/* PRECIO */}
              <div className="flex justify-between items-center">

                <p className="
                  text-xl
                  font-bold
                  text-gray-900
                ">
                  ${producto.precio}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>
      <Modal
  producto={productoSeleccionado}
  onClose={() => setProductoSeleccionado(null)}
/>
<div className="mt-10">
  <Flechas
    paginaActual={paginaActual}
    totalPaginas={totalPaginas}
    setPaginaActual={setPaginaActual}
  />
</div>
<WhatsAppFloat />
    </div>
  );
};

export default Home;