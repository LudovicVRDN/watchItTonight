import { useState } from 'react'
import type { link } from '../types/links'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logoDarkWatchItTonight.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'

// Liens pour un visiteur non connecté
const guestLinks: link[] = [
    { to: '/login', label: 'Se connecter' },
    { to: '/register', label: "S'inscrire" },
    { to: '/about', label: 'A propos' },
]

// Liens pour un utilisateur connecté
const userLinks: link[] = [
    { to: '/movies', label: 'Films' },
    { to: '/watchlist', label: 'Ma liste' },
    { to: '/profile', label: 'Mon profil' },
    { to: '/about', label: 'A propos' },
]

interface NavbarProps {
    isAuthenticated?: boolean
    onLogout?: () => void
}

const Navbar = ({ isAuthenticated = false, onLogout }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const activeLinks = isAuthenticated ? userLinks : guestLinks

    const handleLogout = (): void => {
        setIsOpen(false)
        onLogout?.()
    }

    return (
        <header role="banner" className="absolute top-0 left-0 z-50 w-full bg-transparent px-6 py-4 lg:px-12">
            <nav aria-label="Navigation principale">
                <div className="flex items-center justify-between">
                    {/* 1. Le Logo */}
                    <Link
                        to="/"
                        aria-label="WatchItTonight - Retour à l'accueil"
                        aria-current={location.pathname === '/' ? 'page' : undefined}
                        onClick={() => setIsOpen(false)}
                        className="relative z-50 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
                    >
                        <img src={logo} alt="Logo WatchItTonight" className="h-auto w-24 lg:w-40" />
                    </Link>

                    {/* 2. Bouton menu burger pour mobile avec rotation fluide */}
                    <button
                        type="button"
                        aria-label={isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation-menu"
                        aria-haspopup="true"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-md text-[#EBB019] drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019] lg:hidden"
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            aria-hidden="true"
                            className={`absolute text-3xl transition-all duration-300 ease-out ${
                                isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                            }`}
                        />
                        <FontAwesomeIcon
                            icon={faXmark}
                            aria-hidden="true"
                            className={`absolute text-3xl transition-all duration-300 ease-out ${
                                isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                            }`}
                        />
                    </button>

                    {/* 3. Les liens pour grand écran */}
                    <ul
                        role="list"
                        aria-label="Menu principal"
                        className="hidden items-center gap-6 text-xl font-medium text-[#EBB019] drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)] lg:flex"
                    >
                        {activeLinks.map((link) => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    aria-current={location.pathname === link.to ? 'page' : undefined}
                                    className=" inline-flex items-center gap-2 rounded-sm px-1 transition-colors duration-200 hover:text-[#D49E1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
                                >
                                    {link.to === '/profile' && (
                                        <FontAwesomeIcon icon={faUser} aria-hidden="true" className="text-base" />
                                    )}
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        {isAuthenticated && (
                            <li>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    aria-label="Se déconnecter de votre compte"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#EBB019] bg-[#090C2C]/80 px-3 py-1 text-base font-medium text-[#EBB019] transition-colors duration-200 hover:bg-[#EBB019] hover:text-[#090C2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
                                    <span>Déconnexion</span>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                {/* 4. Menu déroulant mobile animé */}
                <div
                    id="mobile-navigation-menu"
                    aria-hidden={!isOpen}
                    className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
                        isOpen
                            ? 'mt-3 max-h-80 translate-y-0 opacity-100'
                            : 'pointer-events-none mt-0 max-h-0 -translate-y-2 opacity-0'
                    }`}
                >
                    <ul
                        role="list"
                        aria-label="Menu mobile"
                        className="flex flex-col items-center gap-4 rounded-xl border border-[#EBB019]/40 bg-[#090C2C]/90 py-5 text-lg text-[#EBB019] shadow-xl backdrop-blur-md"
                    >
                        {activeLinks.map((link) => (
                            <li key={link.to} className="w-full text-center">
                                <Link
                                    to={link.to}
                                    tabIndex={isOpen ? 0 : -1}
                                    aria-current={location.pathname === link.to ? 'page' : undefined}
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 py-1 transition-transform duration-200 hover:scale-105 hover:text-[#D49E1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
                                >
                                    {link.to === '/profile' && (
                                        <FontAwesomeIcon icon={faUser} aria-hidden="true" className="text-base" />
                                    )}
                                    {link.label}
                                </Link>
                            </li>
                        ))}

                        {isAuthenticated && (
                            <li className="w-full pt-1 text-center">
                                <button
                                    type="button"
                                    tabIndex={isOpen ? 0 : -1}
                                    onClick={handleLogout}
                                    aria-label="Se déconnecter de votre compte"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#EBB019] bg-[#EBB019] px-4 py-1.5 font-medium text-[#090C2C] transition-colors duration-200 hover:bg-[#D49E1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
                                    <span>Déconnexion</span>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar