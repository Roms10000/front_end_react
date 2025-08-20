import React from "react";
import { useNavigate } from "react-router";
import Modal from "./Modal";
import Modal1 from "./Modal1";
import Nav from "./Nav";

export default function Home () {

const navigate = useNavigate();

const handleClick = async (e) => {
e.preventDefault();
navigate("/requestQuote");
}
    return (
    <>
        <Nav />
        <div className="grid grid-cols-2" >
            <div className="ml-5 text-wrap">
                <h1 className="mt-30 font-bold text-5xl flex justify-center">A quoi servons nous exactement ?</h1>
                <p className="mt-10 text-lg">Ce site permet de faire une demande de devis concernant des prestations sur une application ou un site web. Nous sommes des développeurs avec une grande expérience et nous avons déja eu quelques clients tous satisfait par notre travail :
                </p>
                <div className="flex mt-10 ml-20 gap-20">
                    <Modal />
                    <Modal1 />
                </div>
                <div className="flex items-start gap-50 mt-20">
                    <div className="text-lg">
                    <ul>Nous pouvons réaliser différentes prestations :</ul>
                    <li>Site vitrine</li>
                    <li>Site e-commerce</li>
                    <li>Maquette site internet</li>
                    <li>Dépannage site</li>
                    <li>Back end gestion base de données</li>
                    <li>Amélioration performance du site</li>
                    </div>
                    <button className="mt-15 text-white bg-rose-200 hover:bg-rose-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={handleClick}> 
                Faire une demande
                    </button>
                </div>
            </div>
            <div className="mt-30 flex justify-center">
            <p className="font-bold text-2xl">Contact</p>

            </div>
        </div>
    </>
    )
}