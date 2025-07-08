export const pathsBgDark = [
  "/productos-y-servicios/hogar",
  "/productos-y-servicios/hogar/balon-de-10kg",
  "/productos-y-servicios/hogar/balon-de-45kg",
  "/productos-y-servicios/glp-vehicular",
  "/productos-y-servicios/pyme",
  "/productos-y-servicios/glp-vehicular/como-adquirir-glp-vehicular",
  "/noticias",
  "/sostenibilidad/aporte-pais",
  "/contacto",
  "/pdf",
];

export const topsCall = [
  {
    path: "/",
    top: 390,
  },
  {
    path: "/productos-y-servicios/hogar",
    top: 390,
  },
  {
    path: "/productos-y-servicios/hogar/balon-de-10kg",
    top: 890,
  },
  {
    path: "/productos-y-servicios/hogar/balon-de-45kg",
    top: 890,
  },
  {
    path: "/productos-y-servicios/negocio/balon-de-45kg",
    top: 890,
  },
  {
    path: "/productos-y-servicios/glp-vehicular",
    top: 680,
  },
  {
    path: "/productos-y-servicios/glp-vehicular/como-adquirir-glp-vehicular",
    top: 1080,
  },
];

export const isPDF = (pathname: string) => {
  const isPdf = pathname.substring(0, 4) == "/pdf";
  return isPdf;
};
