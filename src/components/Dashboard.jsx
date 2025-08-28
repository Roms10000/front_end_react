import Nav from "./Nav";
import Footer from "./Footer";
import ModalDevis from "./ModalDevis";
import { Button, button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import ModalPayPal from "./ModalPayPal";
import { Link, useNavigate } from "react-router";

export default function Dashboard ({Id}) {



    const [demandes, setDemandes] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [factures, setFactures] = useState([]);
    const navigate = useNavigate();
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
        
        const url = `http://localhost:8000/api/backoffice/${userId}`;
        
            const res = await fetch(url);
            if (!res.ok) throw new Error("Erreur fetch demandes");
            const data = await res.json();
            
            setDemandes(data);
        } catch (error) {
            console.error(error);
        }
  };
      fetchDemandes();
  }, []);

const handleClick = async (e) => {
e.preventDefault();
navigate("/requestQuote");
}

const isAdmin = userRoles.includes("ROLE_ADMIN");
return(
<div className="flex flex-col min-h-[130vh]">
<Nav />
 <main className="flex-grow">
    <div>
        <div className="flex ml-50 mt-10">
          <h5 className="mb-10  text-2xl font-bold tracking-tight text-gray-900 group-hover:text-white great-vibes-regular underline">Suivie des demandes</h5>
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="45" viewBox="0 0 128 128">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="96">🌸</text></svg>
              <button
                onClick={handleClick}
                className="cursor-pointer  rounded-md border-2 border-amber-50 w-[150px] h-[50px] relative group overflow-hidden 
                transition-transform duration-300 ease-out hover:scale-110">
                <div className="bg-rose-300 text-amber-50 w-full h-full flex flex-col justify-center">
                Faire une demande
                </div>
                <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-40">&nbsp;</div>
              </button>
        </div>

        <div className="flex justify-center">
            <table className="w-400 border border-gray-900 text-sm text-gray-900">
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
                        <th className="px-4 py-2 text-left">Paypal/CB</th>
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
                        <ModalDevis devisId={demande.devis_id} clientNom={demande.nom} clientPrenom={demande.prenom} />
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
                                  className="text-rose-300 underline"
                                >
                                Voir la facture
                                </a>
                        ) : (
                        "--"
                        )}
                        </td>
                        <td className="px-4 py-2"><ModalPayPal factureId={demande.factureId} prixtotal={demande.total}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
    </div>
</main>
<Footer/>
</div>
    );
}

