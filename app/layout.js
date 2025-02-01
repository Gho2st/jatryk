import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const font = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Jatryk – Profesjonalny Grafik | Patryk Jędrzejek",
  description:
    "Jatryk – kreatywny grafik specjalizujący się w projektowaniu logo, identyfikacji wizualnej i brandingiem. Pomagam markom wyróżnić się na rynku poprzez unikalne i estetyczne projekty graficzne.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={font.className}>{children}</body>
    </html>
  );
}
