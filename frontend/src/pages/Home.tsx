import Carrousel from '../components/Carrousel'

const Home = () => {
    return (
        <div className="mt-10 flex w-full flex-col items-center gap-8 overflow-x-hidden md:mt-20 md:text-xl xl:mt-5">
            <section
                aria-labelledby="home-heading"
                aria-describedby="login-subtitle"
                className="mb-5 flex flex-col items-center justify-center gap-4"
            >
                <div className="drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)]">
                    <h1 id="home-heading" className="text-3xl font-semibold text-[#EBB019] md:text-4xl">
                        Bienvenue !
                    </h1>
                    <p id="login-subtitle" className="text-[#EBB019]">
                        Connexion:
                    </p>
                </div>
                <form
                    aria-label="Formulaire de connexion"
                    className="flex flex-col gap-4 text-[#EBB019]"
                >
                    <label htmlFor="username" className="drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)]">
                        Nom d'utilisateur:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        aria-required="true"
                        autoComplete="username"
                        placeholder="Nom d'utilisateur"
                        className="rounded-md border border-[#EBB019] bg-[#090C2C]/85 px-2 py-1 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
                    />
                    <label htmlFor="password" className="drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)]">
                        Mot de passe:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        aria-required="true"
                        autoComplete="current-password"
                        placeholder="Mot de passe"
                        className="rounded-md border border-[#EBB019] bg-[#090C2C]/85 px-2 py-1 text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
                    />
                    <button
                        type="submit"
                        aria-label="Se connecter à votre compte"
                        className="self-center rounded-md bg-[#EBB019] px-4 py-2 font-medium text-[#090C2C] transition-colors duration-300 hover:bg-[#D49E1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        Se connecter
                    </button>
                </form>
            </section>
            <Carrousel />
        </div>
    )
}

export default Home
