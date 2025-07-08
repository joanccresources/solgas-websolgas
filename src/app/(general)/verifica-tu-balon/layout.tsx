import { metadata as baseMetadata } from "@/utils/metadata";

export const metadata = {
  ...baseMetadata(),
  title: "Verifica tu balón",
  description:
    "Consulta si tu balón de gas Solgas es original ingresando el código impreso en el precinto de seguridad.",
  keywords: [
    "verificar balón de gas",
    "balón original Solgas",
    "precinto Solgas",
    "consultar código balón",
    "gas seguro Perú",
  ],
  openGraph: {
    title: "Verifica tu balón | Solgas",
    description:
      "Asegúrate de que tu balón es original ingresando el código de verificación.",
    type: "website",
    url: "https://www.solgas.com.pe/verifica-tu-balon",
    images: [
      {
        url: "https://www.solgas.com.pe/verifica-tu-balon/opengraph.jpg",
      },
    ],
  },
};

export default function Layout({ main }: { main: React.ReactNode }) {
  return <>{main}</>;
}
