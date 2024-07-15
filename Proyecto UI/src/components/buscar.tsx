import React, { useState, useEffect } from 'react';

const Buscar = () => {
    const [ip, setIp] = useState('');

    const pedirIp = async () => {
        try {
            const response = await fetch('http://localhost:1900/ip');
            if (!response.ok) {
                throw new Error('Error de respuesta');
            }
            setIp(await response.text());
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        pedirIp();
    }, []);

    return (
        <div className="text-white text-4xl bg-cyan-700 p-10 rounded-2xl border-white border-[3px] flex items-center">
            <input
                className="bg-transparent text-white text-2xl placeholder-white placeholder-opacity-50 outline-none border-b-2 border-white flex-grow py-2 px-3 mr-3"
                type="text"
                placeholder={ip ? ip : 'Ingrese su IP'}
            />
            <button
                className="bg-white text-cyan-700 text-xl px-7 py-2 rounded-lg border border-white ml-7 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-110 "
            >
                Give me info
            </button>
        </div>



    )
}

export default Buscar;