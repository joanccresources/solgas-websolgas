import "./styles/main.scss";
import { getHeaders } from "./actions";
import "core-js/full/promise/with-resolvers";
import "react-photo-view/dist/react-photo-view.css";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await getHeaders();
  const logo_icon = header?.data?.general_information?.logo_icon_format;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={logo_icon} type="image/png" sizes="32x32" />
      </head>
      <body>{children}</body>
    </html>
  );
}
