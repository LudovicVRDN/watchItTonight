import type { ReactNode } from 'react';
import Navbar from './Navbar';
import fondEtoiles from '../assets/heroWatchItTonight.jpg';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#090C2C] text-white">
      {/* Fond étoilé : limité à 55vh, coupé par overflow-hidden du parent */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[55vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondEtoiles})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#090C2C]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex w-full flex-col items-center px-4 pb-4 pt-24">
        {children}
      </main>
    </div>
  );
}
