import Nav from "./Nav";
import Footer from "./Footer";
import ModalDevis from "./ModalDevis";
import { button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

export default function Dashboard ({Id}) {



    const [demandes, setDemandes] = useState([]);
    const [devis, setDevis] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
 
    const adaptDemandes = (data) => {
    //console.log("Data reçue dans adaptDemandes :", data);
    return data.map((demande) => ({
      id: demande.id,
      description: demande.description,
      nom: demande.nom,
      prenom: demande.prenom

    }))
  }

const adaptDevis = (data) => {
  //console.log("Data reçue dans adaptDevis :", data);
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

const userId = localStorage.getItem("id");
const roleString = localStorage.getItem("roles")
let roles = [];
    try {
      if (roleString && roleString !== "undefined") {
        roles = JSON.parse(roleString);
      }
    } catch (e) {
      console.error("Erreur lors de l'analyse des rôles depuis le localStorage :", e);
    }
    setUserRoles(roles);

    if (!userId || roles.length === 0) {
      console.log("Utilisateur non trouvable");
      return;
    }

 const fetchDemandes= async () => {
    try{
        const isAdmin = roles.includes("ROLE_ADMIN");
        const url = isAdmin
          ? "http://localhost:8000/api/demandes"
          : `http://localhost:8000/api/demandes?user=${userId}`;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Erreur fetch demandes");
            const data = await res.json();
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
        const res = await fetch("http://localhost:8000/api/devis/");
        if (!res.ok) throw new Error("Erreur fetch devis");
        const data = await res.json();

       // console.log(data.member);
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

const isAdmin = userRoles.includes("ROLE_ADMIN");
return(
<div className="flex flex-col min-h-[130vh]">
<Nav />
 <main className="flex-grow">
    <div>
        <div className="flex ml-30 mt-10 underline">
            <h5 className=" flex mb-10  text-2xl font-bold tracking-tight text-gray-900 group-hover:text-white great-vibes-regular">Suivie des demandes</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="45" viewBox="0 0 128 128">
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="96">🌸</text></svg>
        </div>
            <table class=" ml-18  justify-center w-400 border rounded-lg border-gray-900 text-sm text-gray-900">
                <thead class="bg-gray-200 text-gray-900">
                    <tr>
                        <th class="px-4 py-2 text-left">n° de demande</th>
                        <th class="px-4 py-2 text-left">Description de la demande</th>
                        {isAdmin && (
                            <>
                                <th className="px-4 py-2 text-left">Nom</th>
                                <th className="px-4 py-2 text-left">Prénom</th>
                            </>
                        )}
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
                        {isAdmin && (
                                <>
                                    <td className="px-4 py-2">{demande.nom}</td>
                                    <td className="px-4 py-2">{demande.prenom}</td>
                                </>
                            )}
                        <td className="px-4 py-2">{demande.devis ? demande.devis.numero : "--"}</td>
                        <td className="px-4 py-2">{demande.devis ? demande.devis.statut : "--"}</td>
                    <td className="px-4 py-2">
                    {demande.devis && demande.devis.id ? (
                        <ModalDevis devisId={demande.devis.id} clientNom={demande.nom} clientPrenom={demande.prenom} />
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
    </div>
</main>
<Footer/>
</div>
    );
}

