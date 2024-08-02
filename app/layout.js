import "./globals.css";

export const metadata = {
  title: "EduQR Scanner",
  description: "Simple QR Code Scanner Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
  