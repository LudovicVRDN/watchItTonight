import React from 'react'
import logo from '../assets/logoDarkWatchItTonight.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        // Le conteneur principal devient la balise <nav> absolue
        <nav className="absolute top-0 left-0 w-full z-50 bg-transparent flex justify-between items-center px-6 lg:px-12 py-4">
            
            {/* 1. Le Logo est maintenant bien dans la nav */}
            <img src={logo} alt="Logo" className="lg:w-40 w-24 h-auto" />

            {/* 2. Le menu burger pour mobile (j'ai corrigé "lg: hidden" en "lg:hidden") */}
            <div className="lg:hidden">
                <FontAwesomeIcon icon={faBars} className="text-[#EBB019] text-3xl cursor-pointer" />
            </div>

            {/* 3. Les liens pour grand écran */}
            <ul className="hidden lg:flex gap-4 text-[#EBB019] text-xl">
                <li>
                    <a href="/login">Se connecter</a>
                </li>
                <li>
                    <a href="/register">S'inscrire</a>
                </li>
                <li>
                    <a href="/about">A propos</a>
                </li>
            </ul>
            
        </nav>
    )
}

export default Navbar