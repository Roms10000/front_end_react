import { useNavigate } from "react-router";
import React, {useState, useEffect} from "react";
import { FaInstagram,FaLinkedin, FaFacebook,FaArrowLeft } from "react-icons/fa";
import { EnvelopeIcon, PhoneIcon  } from '@heroicons/react/24/solid';
import Modal from "./Modal";
import Modal1 from "./Modal1";
import Nav from "./Nav";
import Footer from "./Footer";


export default function Home () {

const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token"); // ou id, roles, etc.
  if (token) {
    setIsLoggedIn(true);
  }
}, []);

const handleClick = async (e) => {
e.preventDefault();

  navigate("/requestQuote");


}
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Nav />

      {/* Contenu principal */}
      <main className="flex-grow">
        <div className="grid grid-cols-[60%_40%] max-1400:grid-cols-1 ">
          {/* Partie gauche */}
          <div className="ml-5 text-wrap">
            <div id="container">
              Obtenez votre
              <div id="flip">
                <div><div>moderne</div></div>
                <div><div>responsive</div></div>
                <div><div>performant</div></div>
              </div>
              Site internet
            </div>
            <h2 className="mt-10 font-bold text-4xl flex justify-center great-vibes-regular">
              A quoi servons nous exactement ?
            </h2>
            <p className="mt-10 ml-10 425:ml-0 text-lg great-vibes-regular">
Ce site permet de faire une demande de devis concernant des prestations sur une application ou un site web. Nous savons tout faire. Même si vous ne trouvez pas votre bonheur dans les prestations proposées, n’hésitez pas à nous contacter : l’informatique, ça nous connaît !
            </p>
            <div className="flex max-2xl:flex-col max-2xl:items-center gap-5 justify-center mt-20">
<div className="card min-w-70">
  <div className="content">
    <div className="front">
      <h1 className="underline text-2xl font-bold mt-2">Realisation de site</h1>
      <p className="mt-2">Que ce soit pour de sites e-commerce, site vitrine ...</p>
    </div>
    <div className="back1">
      <h1 className="mt-2 text-2xl underline">Tarif</h1>
      <p className="mt-5">A partir de 300€ /jours</p>
    </div>
  </div>
</div>
<div className="card min-w-70">
  <div className="content">
    <div className="front">
      <h1 className="underline text-2xl font-bold mt-2">Dépannage</h1>
      <p className="mt-2">Si vous rencontrez un bug quelconque</p>
    </div>
    <div className="back2 min-w-70">
      <h1 className="mt-2 text-2xl underline">Tarif</h1>
      <p className="mt-5">A partir de 100€ /jours</p>
    </div>
  </div>
</div>
<div className="card min-w-70">
  <div className="content">
    <div className="front">
      <h1 className="underline text-2xl font-bold mt-2">Maquettage</h1>
      <p className="mt-2">Si vous voulez simplement une maquette de site</p>
    </div>
    <div className="back">
      <h1 className="mt-2 text-2xl underline">Tarif</h1>
      <p className="mt-5">150€ la maquette</p>
    </div>
  </div>
</div>
            </div>
                <div className="flex justify-center">
              <button
              onClick={handleClick}
                className="cursor-pointer mt-15 rounded-md border-2 border-amber-50 w-[150px] h-[50px] relative group overflow-hidden 
                transition-transform duration-300 ease-out hover:scale-110">
                <div className="bg-rose-300 text-[var(--color-bordeau)] w-full h-full flex flex-col justify-center">
                Faire une demande
                </div>
                <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-40">&nbsp;</div>
              </button>
              <FaArrowLeft className="text-gray-300 mt-17 ml-3 w-6 h-13 animate-bounce" />
              </div>
          </div>

{/* Partie droite */}
<div className="relative w-full mt-8 flex flex-col items-center">
  {/* Bloc Contact en overlay (items en ligne) */}
    <div className="flex items-end min-md:justify-center rounded-xl"
    style={{
    backgroundImage: `url("./img/arbre.webp")`,
    backgroundSize: "cover",     // pour que l'image couvre tout le div
    backgroundPosition: "center", // pour centrer l'image
    backgroundRepeat: "no-repeat", // pour ne pas répéter l'image
    width: "95%",               // largeur
    height: "400px",             // hauteur
  }}>
        <div className="flex max-md:flex-col max-md:w-50 min-md:w-250 justify-between mb-20 mx-2 px-5 py-1 gap-10 bg-white/30 rounded-xl great-vibes-regular text-[var(--color-bordeau)] text-sm" style={{background: '#ffffff30'}}>
            <p className="flex items-center">
              <EnvelopeIcon className="mr-2 h-6 w-6 text-[var(--color-bordeau)]" />
              <a href="https://www.msn.com/fr-fr" target="_blank">eMail</a>
            </p>
            <p className="flex items-center">
              <PhoneIcon className="mr-2 h-6 w-6 text-[var(--color-bordeau)]" />
              <span>03.25.25.11.63</span>
            </p>
            <p className="flex items-center">
              <FaLinkedin size={24} className="mr-2 text-[var(--color-bordeau)]" />
              <a href="https://www.linkedin.com/in/romain-richardon-4b8083245/" target="_blank">LinkedIn</a>
            </p>
            <p className="flex items-center">
              <FaFacebook size={24} className="mr-2 text-[var(--color-bordeau)]" />
              <a href="https://hazemgherissi.com/" target="_blank">Facebook</a>
              </p>
              </div>

            </div>
            <div className="flex flex-col justify-center">
              <div className="mt-20 font-bold text-lg flex justify-center great-vibes-regular">Les entreprises avec lesquels nous avons travaillés :</div>
                <div className="flex flex-wrap justify-center gap-10 mt-6">
                  <div className="flex flex-col items-center">
                    <img src="./img/chevalriz.png" className="h-20"/>
                    
                    <Modal />
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="./img/company.webp" className="h-20"/>
                    <Modal1 />
                  </div>
                </div>
              </div>
              </div>
        </div>
      </main>
      {/* Footer toujours en bas */}
  <Footer />
</div>
  );
}