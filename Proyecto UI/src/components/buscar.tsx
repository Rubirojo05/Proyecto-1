import React, { useState, useEffect } from 'react';

const Buscar = () => {
    const [ip, setIp] = useState('');
    const [placeholder, setPlaceholder] = useState('Cargando IP...');
    const [ipInfo, setIpInfo] = useState('');
    const [isValidIp, setIsValidIp] = useState(true);

    const pedirIp = async () => {
        console.log('Función pedirIp llamada');
        try {
            const response = await fetch('http://localhost:1900/ip');
            console.log('Respuesta recibida:', response);
            if (!response.ok) {
                throw new Error('Error de respuesta');
            }
            const ipAddress = await response.text();
            console.log('IP Address obtenida:', ipAddress);
            setIp(ipAddress);
            setPlaceholder(ipAddress);
        } catch (error) {
            console.error('Error obteniendo la IP:', error);
            setPlaceholder('Error obteniendo IP');
        }
    };

    const validateIp = (ip: string) => {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ip === '' || ipRegex.test(ip);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newIp = e.target.value;
        setIsValidIp(validateIp(newIp));
        setIp(newIp);
    };

    const fetchIpInfo = async () => {
        if (!isValidIp || ip === '') return;

        try {
            const response = await fetch(`http://localhost:1900/ipinfo?ip=${ip}`);
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            const data = await response.json();
            setIpInfo(data);
        } catch (error) {
            console.error('Error al obtener la información de IP:', error);
        }
    };

    useEffect(() => {
        console.log('useEffect ejecutado');
        pedirIp();
    }, []);

    return (
        <div>
            <div className="text-white text-4xl bg-cyan-700 p-10 rounded-2xl border-white border-[3px] flex items-center">
                <input
                    className="bg-transparent text-white text-2xl placeholder-white placeholder-opacity-50 outline-none border-b-2 border-white flex-grow py-2 px-3 mr-3"
                    type="text"
                    placeholder={placeholder}
                    value={ip}
                    onChange={handleInputChange}
                />
                <button
                    className="bg-white text-cyan-700 text-xl px-7 py-2 rounded-lg border border-white ml-7 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-110"
                    onClick={fetchIpInfo}
                    disabled={!isValidIp || ip === ''}
                >
                    Dame Información
                </button>
            </div>
            {!isValidIp && ip !== '' && (
                <p className="text-red-500 mt-2">Por favor, introduce una dirección IP válida.</p>
            )}
            <div className="p-6">
             <textarea
                className="bg-gray-800 text-white text-lg outline-none border  border-white rounded-lg p-2 resize-none w-full max-w-full h-80 overflow-auto"
                value={typeof ipInfo === 'string' ? ipInfo : JSON.stringify(ipInfo, null, 2)}
                readOnly
                placeholder='Aquí saldrá la información IP'
            />   
            </div>
            
        </div>
    );
};

export default Buscar;
