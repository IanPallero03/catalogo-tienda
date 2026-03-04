import { useState } from "react";
import Flechas from "../pages/Flechas";
const Admin = ({ setIsAdmin, productos, setProductos }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [nombreImagen, setNombreImagen] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [mostrarOrden, setMostrarOrden] = useState(false);
  const [orden, setOrden] = useState("default");
  
  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    eliminarProducto(productToDelete);
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
  
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
const indiceFinal = paginaActual * productosPorPagina;
const indiceInicio = indiceFinal - productosPorPagina;

const productosPaginados = productosFiltrados.slice(
  indiceInicio,
  indiceFinal
);

const totalPaginas = Math.ceil(
  productosFiltrados.length / productosPorPagina
);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
  };

  const agregarProducto = (e) => {
    e.preventDefault();
  
    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio,
      descripcion,
      imagen,
    };
  
    setProductos([...productos, nuevoProducto]);
  
    setNombre("");
    setPrecio("");
    setDescripcion("");
    setImagen("");
  
    setMensaje("Producto agregado ✅");
  
    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  const eliminarProducto = (id) => {
    const productosActualizados = productos.filter(
      (producto) => producto.id !== id
    );

    setProductos(productosActualizados);
  };

  // ⭐ FUNCION EDITAR
  const editarProducto = (id, campo, valor) => {
    const productosActualizados = productos.map((producto) =>
      producto.id === id
        ? { ...producto, [campo]: valor }
        : producto
    );

    setProductos(productosActualizados);
  };

  return (
<div className="min-h-screen bg-gray-100 p-5">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
  {/* IZQUIERDA */}
  <div className="flex gap-2">
    
    <button
      onClick={() => setIsAdmin(false)}
      className="bg-gray-700 cursor-pointer text-white px-4 py-1 rounded hover:bg-gray-900 transition"
    >
      Ver catálogo
    </button>

    <button
      onClick={handleLogout}
      className="bg-gray-700 cursor-pointer text-white px-3 py-1 rounded hover:bg-gray-900 transition"
    >
      Cerrar sesión
    </button>

  </div>


  {/* CENTRO */}
  <h1 className="text-2xl md:text-3xl font-bold text-center">
    Panel Administrador
  </h1>


  {/* DERECHA */}
 {/* BUSCADOR + ORDENAR */}
 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
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



      {/* FORMULARIO */}
      <form
  onSubmit={agregarProducto}
  className="w-full max-w-lg mx-auto bg-white p-4 sm:p-6 rounded-xl shadow mb-8"
>

  <input
    type="text"
    placeholder="Nombre del producto"
    value={nombre}
    onChange={(e) => setNombre(e.target.value)}
    className="w-full border p-3 rounded-lg mb-4 text-base"
    required
  />

  <input
    type="number"
    placeholder="Precio"
    value={precio}
    onChange={(e) => setPrecio(e.target.value)}
    className="w-full border p-3 rounded-lg mb-4 text-base"
    required
  />

  <textarea
    placeholder="Descripción del producto"
    value={descripcion}
    onChange={(e) => setDescripcion(e.target.value)}
    className="w-full border p-3 rounded-lg mb-4 text-base"
    rows="3"
    required
  />

  {/* FOTO */}
  <label>
  <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      setNombreImagen(file.name); // guardar nombre

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagen(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }}
  className="hidden"
  id="fileUpload"
/>

<label
  htmlFor="fileUpload"
  className="block cursor-pointer bg-gray-700 text-white text-center py-2 rounded hover:bg-gray-500 transition mb-2"
>
  Subir imagen
</label>

{nombreImagen && (
  <p className="text-sm text-gray-600 text-center mb-4">
    📷 {nombreImagen}
  </p>
)}
</label>

<button
  type="submit"
  className="w-full cursor-pointer bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
>
  Agregar Producto
</button>

{mensaje && (
  <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce z-50">
    {mensaje}
  </div>
)}

</form>

{productosFiltrados.length === 0 && (
  <p className="text-center text-gray-500 mb-4">
    No se encontraron productos
  </p>
)}


      {/* LISTA DE PRODUCTOS */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {productosPaginados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition"
          >


{producto.imagen && (
  <img
    src={producto.imagen}
    className="w-full h-40 object-cover rounded mb-2"
  />
)}
            <input
              value={producto.nombre}
              onChange={(e) =>
                editarProducto(producto.id, "nombre", e.target.value)
              }
              className="w-full border p-2 rounded mb-2 font-bold"
            />

            <input
              type="number"
              value={producto.precio}
              onChange={(e) =>
                editarProducto(producto.id, "precio", e.target.value)
              }
              className="w-full border p-2 rounded mb-2"
            />

            <textarea
              value={producto.descripcion}
              onChange={(e) =>
                editarProducto(producto.id, "descripcion", e.target.value)
              }
              className="w-full border p-2 rounded mb-3"
              rows="2"
            />      
            
            <label className="block w-full">

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        editarProducto(
          producto.id,
          "imagen",
          reader.result
        );
      };

      reader.readAsDataURL(file);
    }
  }}
  className="hidden"
  id={`fileUpload-${producto.id}`}
/>

<label
  htmlFor={`fileUpload-${producto.id}`}
  className="block cursor-pointer bg-gray-700 text-white text-center py-2 rounded hover:bg-gray-500 transition mb-4"
>
  Cambiar imagen
</label>

</label>
            

<button
  onClick={() => handleDeleteClick(producto.id)}
  className="
  text-black-400
  text-sm
  px-3 py-1
  rounded
  hover:bg-gray-500
  hover:text-white
  transition-all duration-200
  cursor-pointer
  bg-gray-300
"
>
  Eliminar
</button>

          </div>
        
        ))}

      

</div>
<Flechas
  paginaActual={paginaActual}
  totalPaginas={totalPaginas}
  setPaginaActual={setPaginaActual}
/>
{showDeleteModal && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">

    <div className="
      bg-black
      text-white
      shadow-2xl
      rounded-xl
      px-5 py-3
      flex items-center gap-6
      animate-fadeIn
      border border-gray-700
    ">

<span className="text-sm font-medium tracking-wide">
  ¿Eliminar "{productos.find(p => p.id === productToDelete)?.nombre}"?
</span>

      <div className="flex gap-3">

        <button
          onClick={() => setShowDeleteModal(false)}
          className="
            text-gray-300
            text-sm
            px-4 py-2
            rounded-md
            hover:bg-gray-800
            hover:text-white
            transition-all duration-200
            cursor-pointer
          "
        >
          Cancelar
        </button>

        <button
          onClick={confirmDelete}
          className="
            text-red-400
            text-sm
            px-3 py-1
            rounded-md
            hover:bg-red-500
            hover:text-white
            transition-all duration-200
            cursor-pointer
          "
        >
          Eliminar
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default Admin;