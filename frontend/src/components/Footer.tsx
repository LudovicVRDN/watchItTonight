const Footer = () => {
  return (
    <footer
      role="contentinfo"
      aria-label="Pied de page"
      className="relative z-10 mt-auto bg-[#090C2C] px-6 py-4 text-slate-300 lg:px-12"
    >
      <p className="text-center text-xs text-slate-300 md:text-lg">
        Watch It Tonight &copy; {new Date().getFullYear()} - Tous droits réservés - VOURDON Ludovic
      </p>
    </footer>
  )
}

export default Footer
