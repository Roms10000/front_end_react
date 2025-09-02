import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useState } from 'react';

export default function Checkout({ prixtotal, handlePaiementTrue }) {

    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }
    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: prixtotal,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`La transaction a bien été effectuée par ${name}`);
            handlePaiementTrue();
            // handleClosePayement();
            
        });
    }

    return (
    <section className="checkout">
        {isPending ? <p>LOADING...</p> : (
            <>
                <select value={currency} onChange={onCurrencyChange}>
                    <option value="USD">💵 USD</option>
                    <option value="EUR">💶 Euro</option>
                </select>
                <PayPalButtons 
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                />
            </>
            )
            }
    </section>
    );
}