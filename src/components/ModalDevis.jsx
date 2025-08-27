import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Composant de modal pour afficher un devis complet en se connectant à un backend Symfony (API Platform).
export default function ModalDevis({devisId, clientNom, clientPrenom,}) {
  const [showModal, setShowModal] = useState(false);
  const [devisData, setDevisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionDone, setActionDone] = useState(false);

  const API_URL = `http://localhost:8000/api/devis/${devisId}`;
  

  const developpeurData = {
    nom: "Pdev",
    adresse: "32 rue des tulipes, 85092 , Fontenay-le-comte",
    email: "Pdev@contact.com",
    telephone: "03.25.25.11.63",
  };

  useEffect(() => {
    const fetchDevisData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}. L'URL demandée ne renvoie pas une réponse valide.`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/ld+json")) {
          throw new TypeError("L'API n'a pas renvoyé de JSON. Elle a peut-être renvoyé du HTML (une page d'erreur ou d'administration).");
        }
        
        const apiData = await response.json();
        
        if (apiData=== 0) {
          throw new Error("La collection de devis est vide.");
        }


        const firstDevis = apiData;
        const formattedData = {
          developpeur: developpeurData,
          // L'objet client est maintenant extrait de l'API de devis
          client: firstDevis.demande.client,
          devis: {
            numero: firstDevis.numero,
            date: firstDevis.date_devis,
            prestations: firstDevis.devisPrestations,
            total: firstDevis.total,
            statut: firstDevis.statut
          },
        };

        setDevisData(formattedData);
      } catch (e) {
        console.error("Erreur lors de la récupération des données : ", e);
        setError(`Erreur lors de la récupération des données : ${e.message}. Veuillez vérifier que l'URL ${API_URL} est correcte et qu'elle renvoie une réponse JSON valide depuis votre serveur Symfony.`);
      } finally {
        setLoading(false);
      }
    };

    fetchDevisData();
  }, []);


  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  
  const handleStatutAccept = async (e) => {
    e.preventDefault();
     try {
      const response = await fetch(`http://localhost:8000/api/devis/${devisId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        "Accept": "application/ld+json",
      },
      body: JSON.stringify({
        statut: "Accepter",
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`);
    }

    alert("Le devis a été accepté et son statut mis à jour !");
    setActionDone(true); 
    setShowModal(false);

    setTimeout(() => {
    window.location.reload();
    }, 1000);

  } catch (err) {
    console.error("Erreur lors de la mise à jour du statut :", err);
    alert("Impossible de mettre à jour le statut du devis.");
  }
};

 const handleStatutCancel = async (e) => {
    e.preventDefault();
     try {
      const response = await fetch(`http://localhost:8000/api/devis/${devisId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/merge-patch+json",
        "Accept": "application/ld+json",
      },
      body: JSON.stringify({
        statut: "Refuser",
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status}`);
    }

    alert("Le devis a été refusé et son statut mis à jour !");
    setActionDone(true);
    setShowModal(false);


    setTimeout(() => {
    window.location.reload();
    }, 1000);

  } catch (err) {
    console.error("Erreur lors de la mise à jour du statut :", err);
    alert("Impossible de mettre à jour le statut du devis.");
  }
};

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  text-white text-xl">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  text-red-400 text-xl text-center p-4">
        {error}
      </div>
    );
  }
  
  const data = devisData;

  if (!data || !data.devis || !data.devis.prestations) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center  text-white text-xl">
        Aucune donnée de devis ou de prestations trouvée.
      </div>
    );
  }

const ModalContent = () => (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow-2xl p-6">
          <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Devis</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
              onClick={handleToggleModal}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Fermer la modal</span>
            </button>
          </div>
          <div className="flex justify-between mb-6">
            <div className="text-gray-600 dark:text-gray-400">
              <p className="font-semibold text-gray-900 dark:text-white">{data.developpeur?.nom}</p>
              <p>{data.developpeur?.adresse}</p>
              <p>{data.developpeur?.email}</p>
              <p>{data.developpeur?.telephone}</p>
              <p className="mt-4">Date : <span className="font-bold">{data.devis?.date_devis ? new Date(data.devis.date_devis).toLocaleDateString('fr-FR') : ''}</span></p>
              <p>N° Devis : <span className="font-bold">DEV{data.devis?.numero}</span></p>
            </div>
            <div className="text-right text-gray-600">
              <p className="font-semibold text-gray-900">Client</p>
              <p>{data.client?.prenom} {data.client?.nom}</p>
              <p>{clientNom} {clientPrenom}</p>
            </div>
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg mb-6">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-900 uppercase bg-rose-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">Prestation</th>
                  <th scope="col" className="px-6 py-3">Quantité</th>
                  <th scope="col" className="px-6 py-3">Prix Unitaire</th>
                  <th scope="col" className="px-6 py-3">Sous-total</th>
                </tr>
              </thead>
              <tbody>
                {data.devis.prestations.map((prestationItem, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{prestationItem.prestation.nom}</td>
                    <td className="px-6 py-4">{prestationItem.quantity}</td>
                    <td className="px-6 py-4">{prestationItem.prestation.pu ? parseFloat(prestationItem.prestation.pu).toFixed(2) : '0.00'} €</td>
                    <td className="px-6 py-4">{prestationItem.soustotal ? parseFloat(prestationItem.soustotal).toFixed(2) : '0.00'} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Total : {data.devis?.total ? parseFloat(data.devis.total).toFixed(2) : '0.00'} €</span>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <div className='flex'>
              <button onClick={handleStatutCancel} disabled={data.devis.statut === "Refuser" || data.devis.statut === "Accepter"} type="submit" className={`text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md hover:shadow-lg cursor-pointer ${data.devis.statut === "Refuser" || data.devis.statut === "Accepter" ? "opacity-50 cursor-not-allowed"
      : ""}`}>Refuser</button>
            </div>
            <div className='flex justify-end'>
              <button onClick={handleStatutAccept} disabled={data.devis.statut === "Refuser" || data.devis.statut === "Accepter"} type="submit" className={` text-white bg-green-300 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md hover:shadow-lg cursor-pointer  ${data.devis.statut === "Refuser" || devisData.statut === "Accepter" ? "opacity-50 cursor-not-allowed": ""}`}>Accepter</button>
            </div>
          </div>
            <p className="mt-6 text-center text-gray-500 dark:text-gray-400">Merci pour votre confiance. Veuillez nous contacter pour toute question.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <a
        onClick={handleToggleModal}
      className="text-rose-300 underline cursor-pointer"
      >
        Voir le devis
      </a>

      {/* Rendre la modale via un portail si showModal est true */}
      {showModal && createPortal(<ModalContent />, document.body)}
    </>
  );
}