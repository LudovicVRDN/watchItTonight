import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import type { Movie, TmdbDiscoverResponse } from '../types/movie'

const fetchRandomMovies = async (): Promise<Movie[]> => {
    const randomPage = Math.floor(Math.random() * 10) + 1

    try {
        // 1. On stocke le résultat dans la variable "response"
        const response = await axios.get<TmdbDiscoverResponse>(
            `https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=${randomPage}&vote_count.gte=10`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                },
            }
        )

        // 2. On récupère les films ayant une affiche et on élimine tout doublon (id ou affiche identique)
        const seenIds = new Set<number>()
        const seenPosters = new Set<string>()
        const movies = response.data.results.filter((movie) => {
            if (!movie.poster_path) return false
            if (seenIds.has(movie.id) || seenPosters.has(movie.poster_path)) return false
            seenIds.add(movie.id)
            seenPosters.add(movie.poster_path)
            return true
        })
        console.log('Random movies fetched:', movies)

        // 3. On retourne les films
        return movies
    } catch (error) {
        console.error('Error fetching random movies:', error)
        throw error
    }
}

const Carrousel = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const trackRef = useRef<HTMLDivElement>(null)
    const dragState = useRef({
        isDown: false,
        hasDragged: false,
        startX: 0,
        scrollLeft: 0,
    })

    // Récupération des films depuis TMDB au montage du composant
    useEffect(() => {
        const getMovies = async (): Promise<void> => {
            try {
                const randomMovies = await fetchRandomMovies()
                setMovies(randomMovies)
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }

        getMovies()
    }, [])

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

    const handleSlideKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            scrollToSlide(e.currentTarget)
        }
    }

    const handleTrackKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        const track = trackRef.current
        if (!track) return
        if (e.key === 'ArrowRight') {
            e.preventDefault()
            track.scrollBy({ left: 240, behavior: 'smooth' })
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            track.scrollBy({ left: -240, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const track = trackRef.current
        if (!track || movies.length === 0) return

        // Positionne le carrousel au milieu dès que les films sont chargés
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
    }, [movies])

    return (
        // Pas de padding vertical : aucune hauteur "morte" sous les affiches
        <section
            aria-roledescription="carrousel"
            aria-label="Films populaires à découvrir"
            className="w-full"
        >
            <div
                ref={trackRef}
                role="region"
                aria-label="Liste des affiches de films, utilisez les flèches gauche et droite pour faire défiler"
                aria-live="polite"
                aria-busy={movies.length === 0}
                tabIndex={0}
                onKeyDown={handleTrackKeyDown}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="relative flex w-full cursor-grab select-none snap-x snap-mandatory items-center overflow-x-auto overflow-y-hidden rounded-lg active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019] scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
                {/* Espaceur gauche : permet de centrer la 1ère affiche */}
                <div className="w-[calc(50%-min(26vw,110px))] shrink-0" aria-hidden="true" />

                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        data-slide
                        role="group"
                        aria-roledescription="diapositive"
                        aria-label={`Film ${index + 1} sur ${movies.length} : ${movie.title}`}
                        tabIndex={0}
                        onClick={handleSlideClick}
                        onKeyDown={handleSlideKeyDown}
                        className="w-[52vw] max-w-55 shrink-0 cursor-pointer snap-center rounded-2xl px-2 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019] md:max-w-60"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`Affiche du film ${movie.title}`}
                            loading="lazy"
                            draggable={false}
                            className="aspect-2/3 w-full rounded-2xl object-cover shadow-xl"
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
