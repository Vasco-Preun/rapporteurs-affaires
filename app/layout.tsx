import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ContactFloating from "@/components/ContactFloating";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portail Partenaires Nexus Circle - Sites Web Premium pour Cabinets",
  description: "Espace dédié aux apporteurs d'affaires pour sites web premium : avocats, architectes, médical, instituts de formation. Décrochez des rendez-vous avec Nexus Circle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Chatbot />
            <ContactFloating />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

