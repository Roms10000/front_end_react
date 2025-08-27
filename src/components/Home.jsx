import { useNavigate } from "react-router";
import { FaInstagram,FaLinkedin, FaFacebook,FaArrowLeft } from "react-icons/fa";
import { EnvelopeIcon, PhoneIcon  } from '@heroicons/react/24/solid';
import Modal from "./Modal";
import Modal1 from "./Modal1";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Home () {

const navigate = useNavigate();

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
            <h1 className="mt-30 font-bold text-5xl flex justify-center great-vibes-regular">
              A quoi servons nous exactement ?
            </h1>
            <p className="mt-10 text-lg great-vibes-regular">
              Ce site permet de faire une demande de devis concernant des
              prestations sur une application ou un site web. Nous sommes des
              développeurs avec une grande expérience et nous avons déjà eu
              quelques clients tous satisfaits par notre travail :
            </p>

            <div className="flex mt-10 ml-20 gap-20">
              <Modal />
              <Modal1 />
            </div>

            <div className="flex items-start gap-50 mt-20">
              <div className="text-lg great-vibes-regular">
                <ul>Nous pouvons réaliser différentes prestations :</ul>
                <li>Site vitrine</li>
                <li>Site e-commerce</li>
                <li>Maquette site internet</li>
                <li>Dépannage site</li>
                <li>Back end gestion base de données</li>
                <li>Amélioration performance du site</li>
              </div>
                <div className="flex">
              <button
                className="cursor-pointer mt-15 text-white bg-rose-200 hover:bg-rose-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={handleClick}
              >
                Faire une demande
              </button>
              <FaArrowLeft className="text-gray-300 mt-17 ml-3 w-6 h-8 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Partie droite */}
          <span className="group max-w-sm p-6 xl:ml-70 lg:ml-30 md:ml-70 sm:ml-35 mt-40 border-b-1-black bg-white border border-gray-900 rounded-lg shadow-sm hover:bg-rose-200 ">
            <div className="flex justify-center ml-30">
              <h5 className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 group-hover:text-white great-vibes-regular">
                Contact
              </h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="45"
                viewBox="0 0 128 128"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontSize="96"
                >
                  🌸
                </text>
              </svg>
            </div>
            
            <div className="space-y-10 mt-12 flex-col great-vibes-regular">
              <p className="flex font-normal text-gray-700 group-hover:text-white">
                <EnvelopeIcon className="mr-2 text-[#ffccd3] group-hover:text-white h-7 w-7" />{" "}
                <a href="https://www.msn.com/fr-fr" target="_blank">
                  eMail
                </a>
              </p>
              <p className="flex font-normal text-gray-700 group-hover:text-white">
                <PhoneIcon className="mr-2 text-[#ffccd3] group-hover:text-white h-7 w-7" />
                <span className=""> 03.25.25.11.63</span>
              </p>
              <p className="flex font-normal text-gray-700 group-hover:text-white">
                <FaLinkedin
                  size={30}
                  className="mr-2 text-[#ffccd3] group-hover:text-white"
                />{" "}
                <a
                  href="https://www.linkedin.com/in/romain-richardon-4b8083245/"
                  target="_blank"
                >
                  LinkedIn
                </a>{" "}
              </p>
              <p className="flex font-normal text-gray-700 group-hover:text-white">
                <FaInstagram
                  size={30}
                  className="mr-2 text-[#ffccd3] group-hover:text-white"
                />
                <a
                  href="https://www.instagram.com/beyonce?igsh=MXRsajlseTRoYmNqdw=="
                  target="_blank"
                >
                  Instagram
                </a>{" "}
              </p>
              <p className="flex font-normal text-gray-700 group-hover:text-white">
                <FaFacebook
                  size={30}
                  className="mr-2 text-[#ffccd3] group-hover:text-white"
                />
                <a href="https://hazemgherissi.com/" target="_blank">
                  Facebook
                </a>
              </p>
            </div>
          </span>
        </div>
      </main>

      {/* Footer toujours en bas */}
      <Footer />
    </div>
  );
}