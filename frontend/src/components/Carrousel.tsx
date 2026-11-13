import { useRef, useEffect } from 'react'
import affiche1 from '../assets/Affiche1.jpg'
import affiche2 from '../assets/Affiche2.jpg'
import affiche3 from '../assets/Affiche3.jpg'
import affiche4 from '../assets/Affiche4.jpg'
import affiche5 from '../assets/Affiche5.jpg'
import affiche6 from '../assets/Affiche6.jpg'
import affiche7 from '../assets/Affiche7.jpg'
import affiche8 from '../assets/Affiche8.jpg'
import affiche9 from '../assets/Affiche9.jpg'
import affiche10 from '../assets/Affiche10.jpg'

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
    const dragState = useRef({
        isDown: false,
        hasDragged: false,
        startX: 0,
        scrollLeft: 0,
    })

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

    // Centre une affiche donnée dans le carrousel
    const scrollToSlide = (el: HTMLElement): void => {
        const track = trackRef.current
        if (!track) return
        const target = el.offsetLeft + el.offsetWidth / 2 - track.clientWidth / 2
        track.scrollTo({ left: target, behavior: 'smooth' })
    }

    // Aligne l'affiche la plus proche du centre à la fin d'un glisser souris
    const snapToClosestSlide = (): void => {
        const track = trackRef.current
        if (!track) return
        const center = track.scrollLeft + track.clientWidth / 2
        let closestEl: HTMLElement | null = null
        let minDistance = Infinity

        track.querySelectorAll<HTMLElement>('[data-slide]').forEach((el) => {
            const elCenter = el.offsetLeft + el.offsetWidth / 2
            const dist = Math.abs(center - elCenter)
            if (dist < minDistance) {
                minDistance = dist
                closestEl = el
            }
        })

        track.style.scrollSnapType = ''
        if (closestEl) {
            scrollToSlide(closestEl)
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
        const track = trackRef.current
        if (!track) return
        dragState.current = {
            isDown: true,
            hasDragged: false,
            startX: e.pageX,
            scrollLeft: track.scrollLeft,
        }
        track.style.scrollSnapType = 'none'
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        const track = trackRef.current
        if (!track || !dragState.current.isDown) return
        e.preventDefault()
        const walk = e.pageX - dragState.current.startX
        if (Math.abs(walk) > 5) {
            dragState.current.hasDragged = true
        }
        track.scrollLeft = dragState.current.scrollLeft - walk * 1.2
    }

    const handleMouseUpOrLeave = (): void => {
        if (!dragState.current.isDown) return
        dragState.current.isDown = false
        if (dragState.current.hasDragged) {
            snapToClosestSlide()
        } else if (trackRef.current) {
            trackRef.current.style.scrollSnapType = ''
        }
    }

    const handleSlideClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (dragState.current.hasDragged) return
        scrollToSlide(e.currentTarget)
    }

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        // Positionne le carrousel au milieu au chargement pour avoir des films des deux côtés
        const slides = track.querySelectorAll<HTMLElement>('[data-slide]')
        const middleSlide = slides[Math.floor(slides.length / 2)]
        if (middleSlide) {
            track.scrollLeft =
                middleSlide.offsetLeft + middleSlide.offsetWidth / 2 - track.clientWidth / 2
        }

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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="relative flex w-full cursor-grab select-none snap-x snap-mandatory items-center overflow-x-auto overflow-y-hidden active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {/* Espaceur gauche : permet de centrer la 1ère affiche */}
                <div className="w-[calc(50%-min(26vw,110px))] shrink-0" aria-hidden="true" />

                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        data-slide
                        onClick={handleSlideClick}
                        className="w-[52vw] max-w-[220px] shrink-0 cursor-pointer snap-center px-2 will-change-transform md:max-w-60"
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
