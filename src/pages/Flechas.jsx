const Flechas = ({ paginaActual, totalPaginas, setPaginaActual }) => {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 px-4">
        {/* BOTON ANTERIOR */}
        <button
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="
            flex items-center gap-2
            bg-gray-800 text-white
            px-4 sm:px-5 py-2 rounded-lg
            shadow-md
            hover:bg-gray-700
            hover:scale-105
            active:scale-95
            transition-all duration-200
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:shadow-none
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
  
          {/* Flecha SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
  
          <span className="hidden sm:inline">Anterior</span>
  
        </button>
  
  
        {/* PAGINA */}
        <p className="text-gray-700 font-medium text-sm sm:text-base bg-gray-100 px-4 py-1.5 rounded-full">
          Página {paginaActual} de {totalPaginas || 1}
        </p>
  
  
        {/* BOTON SIGUIENTE */}
        <button
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual === totalPaginas || totalPaginas === 0}
          className="
            flex items-center gap-2
            bg-gray-800 text-white
            px-4 sm:px-5 py-2 rounded-lg
            shadow-md
            hover:bg-gray-700
            hover:scale-105
            active:scale-95
            transition-all duration-200
            disabled:bg-gray-300
            disabled:text-gray-500
            disabled:shadow-none
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
  
  <span className="hidden sm:inline">Siguiente</span>
  
          {/* Flecha SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
  
        </button>
  
      </div>
    );
  };
  
  export default Flechas;