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
        <div className="grid grid-cols-2 max-xl:grid-cols-1 ">
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
            <p className="mt-10  ml-10 text-lg great-vibes-regular">
Ce site permet de faire une demande de devis concernant des prestations sur une application ou un site web. Nous savons tout faire. Même si vous ne trouvez pas votre bonheur dans les prestations proposées, n’hésitez pas à nous contacter : l’informatique, ça nous connaît !
            </p>
            <div className="flex max-xl:flex-col max-xl:items-center gap-5 justify-center mt-20">
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
<div className="relative w-full mt-8 flex flex-col">
  {/* Image arbre */}
  <div className="flex justify-center">
  <img src="./img/arbre.webp" className="w-lg h-auto border border-white rounded-2xl"/>
</div>
  {/* Bloc Contact en overlay (items en ligne) */}
      <div className="absolute top-2 1400:left-70 1400:top-60 xl:top-55 xl:left-20 xl:text-sm lg:top-55 lg:left-65 md:top-18 425:top-18 425:left-10 375:top-8 md:left-40 max-lg:gap-8 max-lg:flex max-lg:flex-col xl:flex lg:flex justify-center space-x-4 sm:space-x-6 bg-white/30 px-4 py-2 rounded-xl great-vibes-regular text-[var(--color-bordeau)] text-sm" style={{background: '#ffffff30', padding: '5px 31px'}}>
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
            <div className="ml-0 1400:ml-40">
              <div className="mt-20 font-bold text-lg flex justify-center great-vibes-regular ">Les entreprises avec lesquels nous avons travaillés :</div>
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