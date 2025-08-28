import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prénom, setPrénom] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          nom,
          prénom,
          roles: ["ROLE_USER"],
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const data = await res.json();
      console.log("Réponse API:", data);

      navigate("/");
    } catch (error) {
      console.error("Erreur fetch:", error);
      alert("Impossible de créer le compte !");
    }
  };
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
            Créez votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Adresse e-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={email} onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="prenom" className="block text-sm/6 font-medium text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="prenom"
                  name="prénom"
                  type="prénom"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={prénom} onChange={(e)=> setPrénom(e.target.value)}
                />
              </div>
            </div>
                        <div>
              <label htmlFor="nom" className="block text-sm/6 font-medium text-gray-900">
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="nom"
                  name="nom"
                  type="nom"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={nom} onChange={(e)=> setNom(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Mots de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6" value={password} onChange={(e)=> setPassword(e.target.value)}
                />
              </div>
            </div>
                <div>
              <label htmlFor="pseudo" className="block text-sm/6 font-medium text-gray-900">
                Vérifiez votre mots de passe
              </label> 
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                  value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}
                />
              </div> 
              <div>
                <input
                  type="hidden"
                  id="role"
                  name="roles"
                  value='["ROLE_USER"]'
                />
              </div>
            </div>
  <div className="flex justify-center">
    <button
      type="submit"
      className="rounded-md border-2 border-amber-50 w-[380px] h-[50px] relative group overflow-hidden transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
      >
      <div className="bg-rose-300 text-amber-50 w-full h-full flex flex-col justify-center">
        S'enregistrer
      </div>
      <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-100">&nbsp;</div>
    </button>  
  </div>
          </form>
        </div>
      </div>
    </>
  )
}