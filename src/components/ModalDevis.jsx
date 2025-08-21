import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Composant de modal pour afficher un devis complet en se connectant à un backend Symfony (API Platform).
export default function ModalDevis({devisId}) {
  const [showModal, setShowModal] = useState(false);
  const [devisData, setDevisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        console.log(apiData);
        if (apiData=== 0) {
          throw new Error("La collection de devis est vide.");
        }


        const firstDevis = apiData;
        console.log("Données du premier devis :", firstDevis);
        const formattedData = {
          developpeur: developpeurData,
          // L'objet client est maintenant extrait de l'API de devis
          client: firstDevis.demande.client,
          devis: {
            numero: firstDevis.numero,
            date: firstDevis.date,
            prestations: firstDevis.devisPrestations,
            total: firstDevis.total,
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
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
              <p className="mt-4">Date : <span className="font-bold">{data.devis?.date}</span></p>
              <p>N° Devis : <span className="font-bold">{data.devis?.numero}</span></p>
            </div>
            <div className="text-right text-gray-600">
              <p className="font-semibold text-gray-900">Client</p>
              <p>{data.client?.prenom} {data.client?.nom}</p>
            </div>
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg mb-6">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-rose-200 hover:bg-rose-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Prestation</th>
                  <th scope="col" className="px-6 py-3">Quantité</th>
                  <th scope="col" className="px-6 py-3">Prix Unitaire</th>
                  <th scope="col" className="px-6 py-3">Sous-total</th>
                </tr>
              </thead>
              <tbody>
                {data.devis.prestations.map((prestationItem, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{prestationItem.prestation.nom}</td>
                    <td className="px-6 py-4">{prestationItem.quantity}</td>
                    <td className="px-6 py-4">{prestationItem.prestation.pu ? parseFloat(prestationItem.prestation.pu).toFixed(2) : '0.00'} €</td>
                    <td className="px-6 py-4">{prestationItem.soustotal ? parseFloat(prestationItem.soustotal).toFixed(2) : '0.00'} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-600">
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Total : {data.devis?.total ? parseFloat(data.devis.total).toFixed(2) : '0.00'} €</span>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
            <p>Merci pour votre confiance. Veuillez nous contacter pour toute question.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={handleToggleModal}
        className="inline-flex items-center justify-center text-white bg-rose-200 hover:bg-rose-300 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          <path fillRule="evenodd" d="M.661 8.163A1.5 1.5 0 012 6.848a8.5 8.5 0 0116.035 0 1.5 1.5 0 011.339 1.315v3.174a1.5 1.5 0 01-1.339 1.315H2a1.5 1.5 0 01-1.339-1.315V8.163zM10 10.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" clipRule="evenodd" />
        </svg>
        Voir le devis
      </button>

      {/* Rendre la modale via un portail si showModal est true */}
      {showModal && createPortal(<ModalContent />, document.body)}
    </>
  );
}