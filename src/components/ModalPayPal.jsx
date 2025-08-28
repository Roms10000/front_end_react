import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from './Checkout';
import React, { useState } from 'react';

export default function ModalPayPal({prixtotal, factureId}) {

    const initialOptions = {
        "client-id": "AbylGC1pTGAgkg1JkQcXBOmx8YsDr7ia64zCWZRz4tuMgxgwyTRUKagsY5MncAcygtkbbP3URuPXfPSA",
        currency: "EUR",
        intent: "capture",
    };

    const [showPayement, setShowPayement] = useState(false);

    const handleClosePayement = () => setShowPayement(false);
    
    const handlePaiementTrue = async (e) => {
            try {
                const response = await fetch(`http://localhost:8000/api/factures/${factureId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    "Accept": "application/ld+json",
                },
                body: JSON.stringify({
                    paiement: true,
                }),
                });
                parent.location="http://localhost:5173/dashboard";
            } catch (err) {
            alert("Impossible de mettre à jour le statut de la facture.");
            }
    };

    return <>
        <button onClick={() => setShowPayement(true)} className="block cursor-pointer text-white bg-rose-200 hover:bg-green-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
        Payer
        </button>

        {/* <!-- Main modal --> */}
        {showPayement && (
            <div className="flex overflow-y-auto overflow-x-hidden fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Paiement PayPal
                            </h3>
                            <button onClick={handleClosePayement} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                ✕
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5 space-y-4">
                            <PayPalScriptProvider options={initialOptions}>
                                <Checkout handlePaiementTrue={handlePaiementTrue} prixtotal={prixtotal} handleClosePayement={handleClosePayement} />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
}