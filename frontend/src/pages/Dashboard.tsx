import affiche1 from '../assets/Affiche1.jpg'
import affiche2 from '../assets/Affiche2.jpg'
import affiche3 from '../assets/Affiche3.jpg'
import affiche4 from '../assets/Affiche4.jpg'
import affiche5 from '../assets/Affiche5.jpg'
import affiche6 from '../assets/Affiche6.jpg'
import affiche7 from '../assets/Affiche7.jpg'

const watchLaterMovies = [
  { id: 1, title: 'Film 1', poster: affiche1 },
  { id: 2, title: 'Film 2', poster: affiche2 },
  { id: 3, title: 'Film 3', poster: affiche3 },
  { id: 4, title: 'Film 4', poster: affiche4 },
  { id: 5, title: 'Film 5', poster: affiche5 },
  { id: 6, title: 'Film 6', poster: affiche6 },
  { id: 7, title: 'Film 7', poster: affiche7 },
]

const Dashboard = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <section
        aria-labelledby="dashboard-heading"
        className="flex flex-col items-center justify-center gap-15 lg:gap-35"
      >
        <h1
          id="dashboard-heading"
          className="text-2xl font-bold text-[#EBB019] drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)] lg:text-4xl mt-5"
        >
          Bienvenue sur WatchItTonight
        </h1>
        <form
          aria-label="Rechercher un film par genre et par époque"
          className="mt-5 flex flex-col items-center gap-4"
        >
          <label
            htmlFor="search"
            className="text-lg font-bold text-[#EBB019] drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)] lg:text-2xl"
          >
            Choisis un genre de film :
          </label>
          <select
            id="search"
            name="search"
            aria-label="Choisir un genre de film"
            className="rounded-md border border-[#EBB019] bg-[#090C2C]/85 px-2 py-1 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
          >
            <option value="">-- Sélectionner un genre --</option>
            <option value="action" className="text-white">Action</option>
            <option value="comedy" className="text-white">Comédie</option>
            <option value="drama" className="text-white">Drame</option>
            <option value="horror" className="text-white">Horreur</option>
            <option value="romance" className="text-white">Romance</option>
            <option value="sci-fi" className="text-white">Science-fiction</option>
          </select>

          <label
            htmlFor="year"
            className="text-lg font-bold text-[#EBB019] drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)] lg:text-2xl"
          >
            Choisis une époque :
          </label>
          <select
            id="year"
            name="year"
            aria-label="Choisir une époque de sortie"
            className="rounded-md border border-[#EBB019] bg-[#090C2C]/85 px-2 py-1 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
          >
            <option value="">-- Toutes les époques --</option>
            <option value="2020-2026" className="text-white">Films récents (depuis 2020)</option>
            <option value="2010-2019" className="text-white">Années 2010</option>
            <option value="2000-2009" className="text-white">Années 2000</option>
            <option value="1990-1999" className="text-white">Années 90</option>
            <option value="1980-1989" className="text-white">Années 80</option>
            <option value="1900-1979" className="text-white">Classiques (avant 1980)</option>
          </select>

          <button
            type="submit"
            aria-label="Lancer la recherche de film"
            className="cursor-pointer rounded-md bg-[#EBB019] px-4 py-2 font-bold text-[#090C2C] transition-colors duration-200 hover:bg-[#D49A00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Valider
          </button>
        </form>
      </section>

      <section
        aria-labelledby="watch-later-heading"
        className="mt-10 flex w-full max-w-4xl flex-col items-center justify-center gap-4"
      >
        <h2 id="watch-later-heading" className="text-xl font-bold text-[#EBB019] lg:text-2xl">
          Les films à regarder plus tard
        </h2>
        <ul
          role="list"
          aria-labelledby="watch-later-heading"
          className="flex w-full items-start gap-6 overflow-x-auto pb-3"
        >
          {watchLaterMovies.map((movie) => (
            <li key={movie.id} className="w-40 shrink-0">
              <article
                aria-label={movie.title}
                className="flex flex-col items-center gap-2"
              >
                <figure className="h-60 w-full overflow-hidden rounded-md border border-[#EBB019] bg-[#090C2C]">
                  <img
                    src={movie.poster}
                    alt={`Affiche du film ${movie.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <button
                  type="button"
                  aria-label={`Marquer ${movie.title} comme déjà vu`}
                  className="w-full cursor-pointer rounded-md border border-[#EBB019] bg-[#090C2C] px-3 py-1.5 text-sm font-bold text-[#EBB019] transition-colors duration-200 hover:bg-[#EBB019] hover:text-[#090C2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Je l'ai vu
                </button>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="watched-heading"
        className="mt-10 flex w-full max-w-4xl flex-col items-center justify-center gap-4"
      >
        <h2 id="watched-heading" className="text-xl font-bold text-[#EBB019] lg:text-2xl">
          Les films déjà vus
        </h2>
        <ul
          role="list"
          aria-labelledby="watched-heading"
          className="flex w-full items-start gap-6 overflow-x-auto pb-3"
        >
          {watchLaterMovies.map((movie) => (
            <li key={movie.id} className="w-40 shrink-0">
              <article
                aria-label={movie.title}
                className="flex flex-col items-center gap-2"
              >
                <figure className="h-60 w-full overflow-hidden rounded-md border border-[#EBB019] bg-[#090C2C]">
                  <img
                    src={movie.poster}
                    alt={`Affiche du film ${movie.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <button
                  type="button"
                  aria-label={`Retirer ${movie.title} des films déjà vus`}
                  className="w-full cursor-pointer rounded-md border border-[#EBB019] bg-[#090C2C] px-3 py-1.5 text-sm font-bold text-[#EBB019] transition-colors duration-200 hover:bg-[#EBB019] hover:text-[#090C2C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  À revoir
                </button>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}


export default Dashboard
