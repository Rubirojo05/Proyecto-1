import React, { useState, useEffect } from 'react';

const Micomponente = () => {
    const [cuenta, setCuenta] = useState('');
    const pedirCuenta = async () => {
        try {
            const response = await fetch('http://localhost:1900/cuenta');
            if (!response.ok) {
                throw new Error('Error de respuesta');
            }
            setCuenta(`${response.body}`);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        pedirCuenta();
    }, []);


    return (
        <div className="text-white text-4xl bg-cyan-700 p-10 rounded-2xl border-white border-[3px]">
            Mi componente {cuenta}
        </div>
    )
}

export default Micomponente;