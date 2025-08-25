import React, { useState } from "react";

export default function ForgotPassword () {

    const [email, setEmail] = useState("");

const handleSubmit = (e) => {
e.preventDefault();
};
    // ici, tu pourrais envoyer les infos au backend avec fetch ou axios
    // exemple :
    // fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, mdp })
    // });

    return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/img/ordi.webp"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Mots de passe oublié ?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Veuillez renseigner votre adresse e-mail :
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={email} onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className=" cursor-pointer flex w-full justify-center rounded-md bg-rose-200 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-rose-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
              >
                Demander une réinitialisation de son mots de passe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}