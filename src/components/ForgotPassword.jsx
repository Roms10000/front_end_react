import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

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
          <Link to="/">
          <img
            alt="Your Company"
            src="/img/ordi.webp"
            className="mx-auto h-10 w-auto"
          />
          </Link>
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
  className="rounded-md border-2 border-amber-50 w-[390px] h-[50px] relative group overflow-hidden 
             transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
>
  <div className="bg-rose-300 text-[var(--color-bordeau)] w-full h-full flex flex-col justify-center">
    Demander une réinitialisation de mots de passe
  </div>
  <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-110">&nbsp;</div>
</button> 
            </div>
          </form>
        </div>
      </div>
    </>
  )
}