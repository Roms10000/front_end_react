import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router";

export default function Nav() {

  // Utiliser useState pour gérer l'état de connexion.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect est nécessaire pour vérifier le token au chargement
  // et pour écouter les changements dans le localStorage.
  useEffect(() => {
    // Vérifie si un token est présent dans le localStorage
    const token = localStorage.getItem("authToken");
    // Met à jour l'état de connexion en fonction de la présence du token
    setIsLoggedIn(!!token);

    // Ajouter un écouteur d'événements pour réagir aux changements
    // de localStorage dans d'autres onglets ou composants.
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("authToken");
      setIsLoggedIn(!!updatedToken);
    };
    window.addEventListener('storage', handleStorageChange);

    // Nettoyer l'écouteur d'événements lors du démontage du composant.
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    // Utiliser la bonne clé pour récupérer le token
    const token = localStorage.getItem("authToken");

    // Vérifier l'existence du token avant de faire l'appel API.
    if (!token) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
    }

    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });
      // Le finally block garantit que les actions de déconnexion côté client
      // s'exécutent, même en cas d'échec de l'appel API.
    } catch (error) {
      console.error("Erreur lors du logout :", error);
    } finally {
      // Nettoyer le localStorage et mettre à jour l'état
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      // Utiliser useNavigate pour la navigation
      navigate("/login");
    }
  };

    return (
<nav className="border-gray-400 bg-gray-200">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="./img/ordi.webp" className="h-8" alt="Your company" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap">Pdev</span>
    </Link>
    <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
          {isLoggedIn ? 
                      (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-200">
                                Déconnexion
                            </button>
                        </li>
                      ) : 
                      (
                      <>
                          <li>
                          <Link to="/login" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-200">Connexion</Link>
                          </li>
                          <li>
                            <Link to="/register" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-200">Inscription</Link>
                          </li>
                      </>
                      )
          }
      </ul>
    </div>
  </div>
</nav>
    )
}