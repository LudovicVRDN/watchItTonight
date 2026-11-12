import { useRef, useEffect } from 'react'
import affiche1 from '../assets/affiche1.jpg'
import affiche2 from '../assets/affiche2.jpg'
import affiche3 from '../assets/affiche3.jpg'
import affiche4 from '../assets/affiche4.jpg'
import affiche5 from '../assets/affiche5.jpg'
import affiche6 from '../assets/affiche6.jpg'
import affiche7 from '../assets/affiche7.jpg'
import affiche8 from '../assets/affiche8.jpg'
import affiche9 from '../assets/affiche9.jpg'
import affiche10 from '../assets/affiche10.jpg'

interface Movie {
    id: number
    title: string
    img: string
}

const movies: Movie[] = [
    { id: 1, title: "The Last Frontier", img: affiche1 },
    { id: 2, title: "City of Hearts", img: affiche2 },
    { id: 3, title: "The Shadows Within", img: affiche3 },
    { id: 4, title: "Good Boy Summer", img: affiche4 },
    { id: 5, title: "Code Red", img: affiche5 },
    { id: 6, title: "Dragon's Legacy", img: affiche6 },
    { id: 7, title: "Midnight Chase", img: affiche7 },
    { id: 8, title: "Scrap's Garden", img: affiche8 },
    { id: 9, title: "Silent Echoes", img: affiche9 },
    { id: 10, title: "The Lost City", img: affiche10 },
]

const Carrousel = () => {
    const trackRef = useRef<HTMLDivElement>(null)

    // Calcule scale / opacité de chaque affiche selon sa distance au centre
    const update = (): void => {
        const track = trackRef.current
        if (!track) return
        const center = track.scrollLeft + track.clientWidth / 2

        track.querySelectorAll<HTMLElement>('[data-slide]').forEach((el) => {
            const elCenter = el.offsetLeft + el.offsetWidth / 2
            const dist = Math.min(Math.abs(center - elCenter) / el.offsetWidth, 1)

            el.style.transform = `scale(${1 - dist * 0.25})`
            el.style.opacity = `${1 - dist * 0.55}`
            el.style.zIndex = `${Math.round((1 - dist) * 10)}`
        })
    }

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        let raf: number | null = null
        const onScroll = (): void => {
            if (raf !== null) return
            raf = requestAnimationFrame(() => {
                update()
                raf = null
            })
        }

        update()
        track.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', update)

        return () => {
            track.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', update)
            if (raf !== null) cancelAnimationFrame(raf)
        }
    }, [])

    return (
        // Pas de padding vertical : aucune hauteur "morte" sous les affiches
        <section className="w-full">
            <div
                ref={trackRef}
                className="relative flex w-full snap-x snap-mandatory items-center overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {/* Espaceur gauche : permet de centrer la 1ère affiche */}
                <div className="w-[calc(50%-min(26vw,110px))] shrink-0" aria-hidden="true" />

                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        data-slide
                        className="w-[52vw] max-w-[220px] shrink-0 snap-center px-2 will-change-transform md:max-w-60"
                    >
                        <img
                            src={movie.img}
                            alt={`Affiche du film ${movie.title}`}
                            loading="lazy"
                            draggable={false}
                            className="aspect-[2/3] w-full rounded-2xl object-cover shadow-xl"
                        />
                    </div>
                ))}

                {/* Espaceur droit : permet de centrer la dernière affiche */}
                <div className="w-[calc(50%-min(26vw,110px))] shrink-0" aria-hidden="true" />
            </div>
        </section>
    )
}

export default Carrousel
