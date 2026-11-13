import Carrousel from '../components/Carrousel'

const Home = () => {
    return (
        <div className="flex w-full flex-col items-center gap-8 overflow-x-hidden mt-10  md:mt-20 md:text-xl xl:mt-5  ">
            <section className="flex flex-col items-center justify-center gap-4 mb-5">
                <div>
                    <h1 className="text-3xl text-[#EBB019] md:text-4xl">Bienvenue !</h1>
                    <p className="text-[#EBB019]">Connexion:</p>
                </div>
                <form className="flex flex-col gap-4 text-[#EBB019]">
                    <label htmlFor="username">Nom d'utilisateur:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nom d'utilisateur"
                        className="rounded-md border border-[#EBB019] bg-[#090C2C]/70 p-1 text-slate-300 placeholder:text-slate-300"
                    />
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                        className="rounded-md border border-[#EBB019] bg-[#090C2C]/70 p-1 text-slate-300 placeholder:text-slate-300"
                    />
                    <button type="submit" className="self-center rounded-md bg-[#EBB019] text-[#090C2C] hover:bg-[#D49E1A] py-2 px-4 transition-colors duration-300">
                        Se connecter
                    </button>
                </form>
            </section>
            <Carrousel />
        </div>
    )
}

export default Home
