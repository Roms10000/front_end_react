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
        <div className="grid grid-cols-2 max-lg:grid-cols-1 ">
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
              Ce site permet de faire une demande de devis concernant des
              prestations sur une application ou un site web. Nous savons tous faire , meme si vous ne trouvez pas votre bonheur dans les prestations proposés hésiter pas à nous contacter , l'informatique ca nous connait !
            </p>
            <div className="flex gap-5 mt-10">
                <a class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Réalisation de site complet</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">Nous pouvons vous éditer un site vitrine ou un site e-commerce.</p>
                <button type="button" className="bg-gray-200 mt-2 p-2">A partir de 500€</button>
                </a>
                <a class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dépannage de votre site</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">Si vous avez nimporte qu'elle bug, apellez nous !</p>
                <button type="button" className="bg-gray-200 mt-2 p-2">A partir de 600€</button>
                </a>
                <a class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Réalisation d'une maquette</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">Nous pouvons vous éditer une simple maquette de site</p>
                <button type="button" className="bg-gray-200 mt-2 p-2">A partir de 300€</button>
                </a>
            </div>
                <div className="flex justify-center">
              <button
              onClick={handleClick}
                className="cursor-pointer mt-15 rounded-md border-2 border-amber-50 w-[150px] h-[50px] relative group overflow-hidden 
                transition-transform duration-300 ease-out hover:scale-110">
                <div className="bg-rose-300 text-amber-50 w-full h-full flex flex-col justify-center">
                Faire une demande
                </div>
                <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-40">&nbsp;</div>
              </button>
              <FaArrowLeft className="text-gray-300 mt-17 ml-3 w-6 h-13 animate-bounce" />
              </div>
          </div>

{/* Partie droite */}
<div className="relative w-[700px] h-[400px] mt-20 ml-30">
  {/* Image arbre */}
  <img src="./img/arbre.webp" className="w-6xl h-100 border border-white rounded-2xl" />

  {/* Bloc Contact en overlay (items en ligne) */}
  <div className="absolute top-60 left-12 flex space-x-6 great-vibes-regular text-[var(--color-bordeau)] text-2xl"></div>
      <div className="absolute top-75 left-0 flex space-x-6 great-vibes-regular text-[var(--color-bordeau)]" style={{background: '#ffffff30', padding: '5px 48px'}}>
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
            <FaInstagram size={24} className="mr-2 text-[var(--color-bordeau)]" />
            <a href="https://www.instagram.com/beyonce" target="_blank">Instagram</a>
          </p>
          <p className="flex items-center">
            <FaFacebook size={24} className="mr-2 text-[var(--color-bordeau)]" />
            <a href="https://hazemgherissi.com/" target="_blank">Facebook</a>
            </p>
            </div>
            <div className="mt-10 font-bold text-lg flex justify-center great-vibes-regular">Les entreprises avec lesquels nous avons travaillés :</div>
              <div className="flex ">
                <div className="ml-55 mt-6">
                  <img src="./img/riz.webp" className=" h-20 "/>
                </div>
                <div className=" ml-20 mt-6">
                  <img src="./img/dorcel.webp" className=" h-20  "/>
                </div>
              </div>
            <div className="mt-10 font-bold text-lg flex justify-center great-vibes-regular">Leurs avis :</div>
            <div className="flex mt-10 ml-50 gap-20">
              <Modal />
              <Modal1 />
            </div>
          </div>
        </div>
      </main>
      {/* Footer toujours en bas */}
  <Footer />
</div>
  );
}