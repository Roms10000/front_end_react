import Nav from "./Nav";
import Footer from "./Footer";
import ModalDevis from "./ModalDevis";
import { button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

export default function Dashboard ({Id}) {

    const [demandes, setDemandes] = useState([]);
    const [userRoles, setUserRoles] = useState([]);


  // Define fetchDemandes outside of useEffect so it can be passed as a prop
    const fetchDemandes = async () => {
        const userId = localStorage.getItem("id");
        const roleString = localStorage.getItem("roles");
        let roles = [];
        try {
            if (roleString && roleString !== "undefined") {
                roles = JSON.parse(roleString);
            }
        } catch (e) {
            console.error("Erreur lors de l'analyse des rôles depuis le localStorage :", e);
        }

        if (!userId || roles.length === 0) {
            console.log("Utilisateur non trouvable");
            return;
        }

        try {
            const url = `http://localhost:8000/api/backoffice/${userId}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Erreur fetch demandes");
            const data = await res.json();
            
            // If it returns an array of demands
            setDemandes(data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        const userId = localStorage.getItem("id");
        const roleString = localStorage.getItem("roles");
        let roles = [];
        try {
            if (roleString && roleString !== "undefined") {
                roles = JSON.parse(roleString);
            }
        } catch (e) {
            console.error("Erreur lors de l'analyse des rôles depuis le localStorage :", e);
        }
        setUserRoles(roles);

        // Call fetchDemandes when the component mounts
        fetchDemandes();
    }, []); // Empty dependency array ensures it runs only once


const isAdmin = userRoles.includes("ROLE_ADMIN");

return(
<div className="flex flex-col min-h-[130vh]">
<Nav />
 <main className="flex-grow">
    <div>
        <div className="flex ml-30 mt-10 underline">
            <h5 className=" flex mb-10  text-2xl font-bold tracking-tight text-gray-900 group-hover:text-white great-vibes-regular">Suivie des demandes</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="45" viewBox="0 0 128 128">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="96">🌸</text></svg>
        </div>
            <table className=" ml-18  justify-center w-400 border rounded-lg border-gray-900 text-sm text-gray-900">
                <thead className="bg-gray-200 text-gray-900">
                    <tr>
                        <th className="px-4 py-2 text-left">n° de demande</th>
                        <th className="px-4 py-2 text-left">Description de la demande</th>
                        {isAdmin && (
                            <>
                                <th className="px-4 py-2 text-left">Nom</th>
                                <th className="px-4 py-2 text-left">Prénom</th>
                            </>
                        )}
                        <th className="px-4 py-2 text-left">n° de devis</th>
                        <th className="px-4 py-2 text-left">Statut du devis</th>
                        <th className="px-4 py-2 text-left">Devis</th>
                        <th className="px-4 py-2 text-left">Facture</th>
                    </tr>
                </thead>
                <tbody>
                {demandes.map((demande) => (
                    <tr key={demande.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{demande.id}</td>
                        <td className="px-4 py-2">{demande.description}</td>
                        {isAdmin && (
                                <>
                                    <td className="px-4 py-2">{demande.nom}</td>
                                    <td className="px-4 py-2">{demande.prenom}</td>
                                </>
                            )}
                        <td className="px-4 py-2">{demande.numero!=null ? demande.numero : "--"}</td>
                        <td className="px-4 py-2">{demande.statut!=null ? demande.statut : "--"}</td>
                    <td className="px-4 py-2">
                    {demande.devis_id!=null ? (
                        <ModalDevis devisId={demande.devis_id} clientNom={demande.nom} clientPrenom={demande.prenom} onActionComplete={fetchDemandes}/>
                    ) : (
                        "--"
                    )}
                    </td>
                        <td className="px-4 py-2">
                        {demande.facture!=null ? (
                                <a
                                  key={demande.facture}
                                  href={`http://localhost:8000${demande.facture}`} // chemin vers le PDF
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-rose-200 underline"
                                >
                                  Voir la facture
                                </a>
                        ) : (
                          "--"
                        )}
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

