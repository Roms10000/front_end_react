import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router";

export default function Nav() {

  // Gère l'état de connexion et le nom de l'utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Ce hook s'exécute au premier chargement pour vérifier le localStorage
  useEffect(() => {
    
    const token = localStorage.getItem("authToken");
    const storedUserName = localStorage.getItem("userName");
    

    // Met à jour l'état si un token et un nom sont présents
    setIsLoggedIn(!!token);
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Gère la synchronisation entre les onglets
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("authToken");
      const updatedUser = localStorage.getItem("userName");

      setIsLoggedIn(!!updatedToken);
      setUserName(updatedUser || '');

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
      // L'appel API est fait uniquement si un token existe
      if (token) {
            try {
                await fetch("http://localhost:8000/api/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
          
        } catch (error) {
          console.error("Erreur lors du logout :", error);
        } 
      }
      // Le finally block garantit que les actions de déconnexion côté client
          // s'exécutent, même en cas d'échec de l'appel API.
      // Nettoyer le localStorage et mettre à jour l'état
      localStorage.clear();

      setIsLoggedIn(false);
      setUserName('');
      navigate("/login");
    
  };

  return (
        <nav className="border-gray-400 bg-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="./img/ordi.webp" className="h-8" alt="Your company" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap">Pdev</span>
            </Link>
            {isLoggedIn ? (
                <span className="block py-2 px-3 md:p-0 text-gray-900 font-medium rounded-sm md:hover:bg-transparent md:border-0 hover:text-rose-200">Bonjour, {userName}</span>
            ) : null }
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded={isMenuOpen}>
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button><div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:block lg:w-auto`} id="navbar-solid-bg">
              <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                  {isLoggedIn ? 
                              ( 
                                <>
                                    <li>
                                        <Link to="/dashboard" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-200">Dashboard</Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-200 cursor-pointer">
                                            Déconnexion
                                        </button>
                                    </li>
                                </>
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
  );
}