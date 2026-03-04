import { useEffect } from "react";

const Modal = ({ producto, onClose }) => {
 
  // Cerrar con ESC
  useEffect(() => {
    if (!producto) return;
  
    const cerrarEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
  
    window.addEventListener("keydown", cerrarEsc);
    document.body.style.overflow = "hidden";
  
    return () => {
      window.removeEventListener("keydown", cerrarEsc);
      document.body.style.overflow = "";
    };
  }, [producto, onClose]);
  
  if (!producto) return null; // 👈 ESTA LINEA FALTABA
  
  
  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0
        bg-black/50
        backdrop-blur-sm
        flex items-center justify-center
        z-50
        p-4
      "
    >

      {/* CONTENEDOR */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
        bg-white
        rounded-xl md:rounded
        shadow-2xl
        max-w-4xl
        w-full
        max-h-[90vh]
        overflow-y-auto
        relative
        animate-scaleIn
      "
      >

        {/* BOTON CERRAR */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            p-2
            rounded
            hover:bg-gray-100
            transition
            cursor-pointer
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>


        {/* CONTENIDO */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* IMAGEN */}
          <div className="bg-gray-100 flex items-center justify-center p-6">

            {producto.imagen && (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="
                w-full
                max-h-[250px]
                sm:max-h-[350px]
                md:max-h-[400px]
                object-contain
                hover:scale-105
                transition
                duration-300
              "
              />
            )}

          </div>


          {/* INFO */}
          <div className="p-5 sm:p-8 flex flex-col justify-between">
            <div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {producto.nombre}
              </h2>

              <p className="text-gray-600 mb-6">
                {producto.descripcion}
              </p>

            </div>


            <div>

              <p className="
                text-3xl sm:text-4xl
                font-bold
                text-gray-900
                mb-6
              ">
                ${producto.precio}
              </p>

              <a
  href={`https://wa.me/3425376255?text=Hola,%20quiero%20consultar%20stock%20de:%20${producto.nombre}`}
  target="_blank"
  rel="noopener noreferrer"
  className="
  w-full
  flex items-center justify-center sm:justify-start gap-4
  bg-green-500
  hover:bg-green-600
  text-white
  rounded-xl
  p-4
  transition-all duration-300
  shadow-md
  hover:shadow-lg
  hover:-translate-y-0.5
  cursor-pointer
"
>

  {/* LOGO WHATSAPP */}
  <div className="bg-white/20 rounded-full p-2">

  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  className="w-6 h-6 text-white"
  fill="currentColor"
>
  <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.2-1.2l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1112 20zm4.3-6.3c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.3-.4c.1-.1.1-.2.2-.3.1-.2 0-.3 0-.5 0-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.2-.5 1.3-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z"/>
</svg>

  </div>

  <div>

    <p className="font-semibold text-lg">
      Consultar por WhatsApp
    </p>

    <div className="flex items-center gap-2 text-sm text-green-100">

<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-4 h-4"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1-3.5A7.6 7.6 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  />
</svg>

<span>Respuesta rápida</span>

</div>

  </div>

</a>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Modal;