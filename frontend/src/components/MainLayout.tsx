import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import fondEtoiles from '../assets/heroWatchItTonight.jpg';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#090C2C] text-white">
      {/* Lien d'évitement pour l'accessibilité clavier et lecteur d'écran */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-[#EBB019] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#090C2C] focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      {/* Fond étoilé purement décoratif : ignoré par les lecteurs d'écran */}
      <div
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute left-0 top-0 h-[55vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondEtoiles})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#090C2C]/65 via-[#090C2C]/50 to-[#090C2C]" />
      </div>

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        aria-label="Contenu principal"
        className="relative z-10 flex w-full flex-1 flex-col items-center px-4 pb-4 pt-24 focus:outline-none"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
