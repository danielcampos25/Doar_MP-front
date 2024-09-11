import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function LocationModalUser({ donation, closeModal }: { donation: any, closeModal: () => void }) {
    const [trackingData, setTrackingData] = useState<any[]>([]); // Estado para armazenar os dados do rastreamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3001/tracking/donation/${donation.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTrackingData(response.data); // Armazena os dados do rastreamento no estado
            } catch (err) {
                console.error("Erro ao buscar os dados de rastreamento:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrackingData();
    }, [donation.id]);

    if (loading) {
        return <p>Carregando dados de rastreamento...</p>;
    }

    return (
        <div className="fixed inset-0 bg-softBlack bg-opacity-75 flex justify-center items-center">
            <div className="bg-lightBlue rounded-lg p-6 w-[600px] max-h-[600px] overflow-auto">
                {donation.entregue ? (
                    <h1 className="text-2xl mb-4">Doação entregue</h1>
                ) : (
                    <>
                        <h2 className="text-2xl mb-4">Rastreamento da Doação: {donation.title}</h2>
                        
                        {trackingData.length > 0 ? (
                            trackingData.map((tracking) => (
                                <div key={tracking.id} className="mb-4">
                                    <p><strong>Localização:</strong> {tracking.localizacao}</p>
                                    <p><strong>Status:</strong> {tracking.status}</p>
                                    <p><strong>Data:</strong> {new Date(tracking.createdAt).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum rastreamento disponível para esta doação.</p>
                        )}
                    </>
                )}
                <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                    Fechar
                </button>
            </div>
        </div>
    );
}