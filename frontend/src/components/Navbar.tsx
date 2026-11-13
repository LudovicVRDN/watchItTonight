import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logoDarkWatchItTonight.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const navLinks = [
    { to: '/login', label: 'Se connecter' },
    { to: '/register', label: "S'inscrire" },
    { to: '/about', label: 'A propos' },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="absolute top-0 left-0 z-50 w-full bg-transparent px-6 py-4 lg:px-12">
            <div className="flex items-center justify-between">
                {/* 1. Le Logo */}
                <Link to="/" onClick={() => setIsOpen(false)} className="relative z-50">
                    <img src={logo} alt="Logo WatchItTonight" className="h-auto w-24 lg:w-40" />
                </Link>

                {/* 2. Bouton menu burger pour mobile avec rotation fluide */}
                <button
                    type="button"
                    aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="relative z-50 flex h-10 w-10 items-center justify-center text-[#EBB019] lg:hidden"
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className={`absolute text-3xl transition-all duration-300 ease-out ${
                            isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                        }`}
                    />
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={`absolute text-3xl transition-all duration-300 ease-out ${
                            isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                        }`}
                    />
                </button>

                {/* 3. Les liens pour grand écran */}
                <ul className="hidden gap-6 text-xl text-[#EBB019] lg:flex">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className="transition-colors duration-200 hover:text-[#D49E1A]"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 4. Menu déroulant mobile animé */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
                    isOpen
                        ? 'mt-3 max-h-64 translate-y-0 opacity-100'
                        : 'pointer-events-none mt-0 max-h-0 -translate-y-2 opacity-0'
                }`}
            >
                <ul className="flex flex-col items-center gap-4 rounded-xl border border-[#EBB019]/40 bg-[#090C2C]/90 py-5 text-lg text-[#EBB019] shadow-xl backdrop-blur-md">
                    {navLinks.map((link) => (
                        <li key={link.to} className="w-full text-center">
                            <Link
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className="block py-1 transition-transform duration-200 hover:scale-105 hover:text-[#D49E1A]"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar