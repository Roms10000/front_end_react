import Nav from "./Nav";
import Footer from "./Footer";
import ModalDevis from "./ModalDevis";
import { button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

export default function Dashboard ({userId}) {

    const [demandes, setDemandes] = useState([]);
     const [devis, setDevis] = useState([]);
 
    const adaptDemandes = (data) => {
    console.log("Data reçue dans adaptDemandes :", data);
    return data.map((demande) => ({
      id: demande.id,
      description: demande.description
    }))
  }

const adaptDevis = (data) => {
  console.log("Data reçue dans adaptDevis :", data);
  return data.map((devi) => {
    // extraire l'ID à partir de l'URL de la demande (ex: ".../demandes/3")
    const demandeId = devi.demande ? parseInt(devi.demande.split("/").pop()) : null;

    return {
      id: devi.id,
      numero: devi.numero,
      statut: devi.statut,
      demandeId: demandeId,
      facture: devi.facture
    };
  });
};

  useEffect(() => {

 const fetchDemandes= async () => {
    try{
        const res = await fetch("http://localhost:8000/api/demandes");
        if (!res.ok) throw new Error("Erreur fetch demandes");
        const data = await res.json();

        console.log(data.member);
        setDemandes(adaptDemandes(data.member));
      } catch (error) {
        console.error(error);
      }
  };
      fetchDemandes();
  }, []);

useEffect(() => {

 const fetchDevis= async () => {
    try{
        const res = await fetch(`http://localhost:8000/api/devis/${userId}`);
        if (!res.ok) throw new Error("Erreur fetch devis");
        const data = await res.json();

        console.log(data.member);
        setDevis(adaptDevis(data.member));
      } catch (error) {
        console.error(error);
      }
  };
      fetchDevis();
  }, []);

// On crée un dictionnaire { demandeId: devis }
const devisByDemande = devis.reduce((acc, dv) => {
  acc[dv.demandeId] = dv;
  return acc;
}, {});

// Ensuite, on enrichit les demandes
const demandesAvecDevis = demandes.map((demande) => ({
  ...demande,
  devis: devisByDemande[demande.id] || null
}));

return(
<>
<Nav />
    <div>
        <span className=" border-b-1-black bg-white border border-gray-900 rounded-lg shadow-sm hover:bg-rose-200 ">
        <div className="flex ml-30 underline">
            <h5 className=" flex mb-2 text-2xl font-bold tracking-tight text-gray-900 group-hover:text-white great-vibes-regular">Suivie des demandes</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="45" viewBox="0 0 128 128">
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="96">🌸</text></svg>
        </div>
            <table class=" ml-35 mt-10 mb-120 w-400 border border-gray-900 text-sm text-gray-900">
                <thead class="bg-gray-200 text-gray-900">
                    <tr>
                        <th class="px-4 py-2 text-left">n° de demande</th>
                        <th class="px-4 py-2 text-left">Description de la demande</th>
                        <th class="px-4 py-2 text-left">n° de devis</th>
                        <th class="px-4 py-2 text-left">Statut du devis</th>
                        <th class="px-4 py-2 text-left">Devis</th>
                        <th class="px-4 py-2 text-left">Facture</th>
                    </tr>
                </thead>
                <tbody>
                {demandesAvecDevis.map((demande) => (
                    <tr key={demande.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{demande.id}</td>
                        <td className="px-4 py-2">{demande.description}</td>
                        <td className="px-4 py-2">{demande.devis ? demande.devis.numero : "--"}</td>
                        <td className="px-4 py-2">{demande.devis ? demande.devis.statut : "--"}</td>
                    <td className="px-4 py-2">
                    {demande.devis && demande.devis.id ? (
                        <ModalDevis devisId={demande.devis.id} />
                    ) : (
                        "--"
                    )}
                    </td>
                        <td className="px-4 py-2">
                        {demande.devis && demande.devis.facture ? (
                        <a href={demande.devis.facture} target="_blank" rel="noopener noreferrer" className="text-rose-200 underline">Voir facture</a>) : "--"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </span>
    </div>
<Footer/>
</>
    )
}

