import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import ForgotPassword from "./ForgotPassword";


export default function Login () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  
      try {
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            if (res.status === 401) {
              alert("Email ou mot de passe incorrect.");
            }
            throw new Error(errorData.message || "Erreur serveur");
        }
        
        const data = await res.json();


        // Stocker le token ET le nom de l'utilisateur et 'id' dans le localStorage
        if (data.token && data.id && data.user && data.user.roles) {
          const fullName = `${data.user.prénom} ${data.user.nom}`;
          localStorage.setItem("authToken", data.token); 
          localStorage.setItem("id", data.id);
          localStorage.setItem("userLastname", data.user.nom); 
          localStorage.setItem("userFirstname", data.user.prénom);
          localStorage.setItem("userName", fullName);     
          localStorage.setItem("roles", JSON.stringify(data.user.roles)); // Convertir le tableau  roles en chaîne JSON
        

          navigate("/");
        } 
        
        else {
          // Gère les cas où le token ou le nom d'utilisateur ou l'ID manquent dans la réponse, bien que le res.ok soit true
          throw new Error("Token ou nom utilisateur non reçus");
        }
      } catch (err) {
        console.error("Erreur fetch:", err);
        setError(err.message);
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
            Connectez-vous à votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={email} onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Mots de passe
                </label>
                <div className="text-sm">
                  <Link to="/forgotPassword" className="font-semibold text-rose-200 hover:text-rose-300">
                    Mots de passe oublié ?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6" value={password} onChange={(e)=> setPassword(e.target.value)}
                />
              </div>
            </div>
 
  <div className="flex justify-center">
    <button
      type="submit"
      className="rounded-md border-2 border-amber-50 w-[380px] h-[50px] relative group overflow-hidden transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
      >
      <div className="bg-rose-300 text-[var(--color-bordeau)] w-full h-full flex flex-col justify-center">
        Se connecter
      </div>
      <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-100">&nbsp;</div>
    </button>  
  </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Pas encore membre ?{' '}
            <Link to="/register" className="font-semibold text-rose-200 hover:text-rose-300">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}