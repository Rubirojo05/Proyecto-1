import React, { useState, useEffect } from 'react';

const Micomponente2 = () => {
    const [cuenta2, setCuenta2] = useState('');
    const pedirCuenta = async () => {
        try {
            const response = await fetch('http://localhost:1900/random');
            if (!response.ok) {
                throw new Error('Error de respuesta');
            }
            setCuenta2(`${await response.text()}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        pedirCuenta();
    }, []);


    return (
        <div className="text-white text-4xl bg-cyan-700 p-10 rounded-2xl border-white border-[3px]">
            Count of Clients: {cuenta2}
        </div>
    )
}

export default Micomponente2;