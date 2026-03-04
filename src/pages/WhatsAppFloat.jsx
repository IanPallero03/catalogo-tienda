const WhatsAppFloat = () => {
  const numero = "3425376255";
  const mensaje = "Hola! Quiero consultar sobre sus productos";
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        fixed bottom-4 right-4 sm:bottom-6 sm:right-6
        w-16 h-16 sm:w-14 sm:h-14
        bg-green-500
        rounded-full
        shadow-xl
        flex items-center justify-center
        hover:scale-110
        active:scale-95
        transition-all duration-300
        z-50
      "
    >
      {/* Glow efecto */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>

      {/* Ícono */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-7 h-7 sm:w-6 sm:h-6 text-white relative"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.2-1.2l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1112 20zm4.3-6.3c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.8-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.3-.4c.1-.1.1-.2.2-.3.1-.2 0-.3 0-.5 0-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 2 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.2-.5 1.3-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.4-.3z"/>
      </svg>

      {/* Tooltip desktop */}
      <span className="
        hidden sm:block
        absolute right-20
        bg-black text-white text-sm
        px-3 py-1 rounded-lg
        opacity-0 group-hover:opacity-100
        transition
        whitespace-nowrap
      ">
        Consultar por WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppFloat;