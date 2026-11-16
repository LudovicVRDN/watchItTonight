const Registration = () => {
  return (
    <section
      aria-labelledby="register-heading"
      className="flex max-w-md flex-col gap-25 md:w-full lg:gap-40 mt-10"
    >
      <h1
        id="register-heading"
        className="mb-6 text-center text-4xl font-bold text-[#EBB019] drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)]"
      >
        S'inscrire
      </h1>
      <form
        aria-labelledby="register-heading"
        aria-label="Formulaire d'inscription"
        className="flex flex-col gap-4 text-[#EBB019]"
      >
        <label htmlFor="email" className="text-2xl font-bold drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)]">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          autoComplete="email"
          placeholder="exemple@email.com"
          className="rounded-md border border-[#EBB019] bg-[#090C2C]/85 px-2 py-1 md:h-15 md:w-full  text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
        />

        <label htmlFor="password" className="text-2xl font-bold drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)]">
          Mot de passe:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          aria-required="true"
          autoComplete="new-password"
          placeholder="Votre mot de passe"
          className="rounded-md border border-[#EBB019] bg-[#090C2C]/85 px-2 py-1 md:h-15 md:w-full  text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
        />

        <label htmlFor="confirmPassword" className="text-2xl font-bold drop-shadow-[0_2px_4px_rgba(9,12,44,0.9)]">
          Confirmer le mot de passe:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          aria-required="true"
          autoComplete="new-password"
          placeholder="Confirmez votre mot de passe"
          className="rounded-md border border-[#EBB019] bg-[#090C2C]/85 px-2 py-1 md:h-15 md:w-full  text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBB019]"
        />

        <button
          type="submit"
          aria-label="Créer mon compte"
          className="self-center rounded-md bg-[#EBB019] px-4 py-2 font-medium text-[#090C2C] transition-colors duration-300 hover:bg-[#D49E1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:w-full md:max-w-2/3 md:px-6 md:py-3 md:text-2xl mt-10"
        >
          S'inscrire
        </button>
      </form>
    </section>
  )
}

export default Registration
