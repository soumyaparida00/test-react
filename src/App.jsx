import React, { useState, useEffect } from "react";
import { loadHyper } from "@juspay-tech/hyper-js";
import { HyperElements } from "@juspay-tech/react-hyper-js";
import './App.css';
import CheckoutForm from "./CheckoutForm";

const hyperPromise = loadHyper("pk_snd_2c6133900e0f41e3abefbd63d1090ca4");

function App() {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    fetch("/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    }).then((res) => res.json())
      .then((data) => {
        setOptions({
          clientSecret: data.client_secret,
          appearance: {
            theme: "midnight"
          }
        })
      })
  }, [])

  return (
    <div className="app">
      {options && (
        <HyperElements options={options} hyper={hyperPromise}>
          <CheckoutForm return_url={`${window.location.origin}/completion`} />
        </HyperElements>
      )}
    </div>
  );
}

export default App;
