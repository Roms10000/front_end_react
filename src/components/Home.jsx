import React from "react";
import { Link } from "react-router";
import Modal from "./Modal";
import Modal1 from "./Modal1";
import Nav from "./Nav";

export default function Home () {

    return (
    <>
        <Nav />
        <div className="grid grid-cols-2" >
            <div className="ml-5 text-wrap">
                <h1 className="mt-20 font-bold text-5xl flex justify-center">A quoi sert le site internet ?</h1>
                <p className="mt-10 text-lg">Ce site permet de faire une demande de devis concernant des prestations sur une application ou un site web. Nous sommes des développeurs avec une grande expérience et nous avons déja eu quelques clients tous satisfait par notre travail :
                </p>
                <div className="flex mt-10 ml-20 gap-20">
                    <Modal />
                    <Modal1 />
                </div>
                <div className="mt-10 text-lg">
                <ul>Nous pouvons réaliser différentes prestations :</ul>
                <li>Site vitrine</li>
                <li>Site e-commerce</li>
                <li>Maquette site internet</li>
                <li>Dépannage site</li>
                <li>Back end gestion d'éléments</li>
                <li></li>
                <li></li>
                </div>
            </div>
            <div className="mt-20 flex justify-center">
            <p className="font-bold text-2xl">Contact</p>

            </div>
        </div>
    </>
    )
}