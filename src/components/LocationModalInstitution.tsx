import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function LocationModalInstitution({
  closeModal,
  donation,
}: {
  closeModal: () => void;
  donation: { id: number; title: string; finalDestination: string; createdAt: string };
}) {
  const [trackingData, setTrackingData] = useState<
    { id: number; localizacao: string; status: string; createdAt: string; updatedAt: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3001/tracking/donation/${donation.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTrackingData(response.data);
      } catch (err) {
        console.error("Error fetching tracking data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, [donation.id]);

  const handleConfirmReceipt = async () => {
    try {
      setIsConfirming(true);
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3001/donations/${donation.id}/entrega-concluida`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Recebimento confirmado com sucesso!");
      closeModal();
    } catch (err) {
      console.error("Error confirming receipt:", err);
      alert("Erro ao confirmar recebimento.");
    } finally {
      setIsConfirming(false);
    }
  };

  if (loading) {
    return <p>Carregando dados de rastreamento...</p>;
  }
  const lastTracking = trackingData[trackingData.length - 1];

  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-lightBlue rounded-3xl border-8 border-white h-4/5 w-5/6">
          <button
            onClick={closeModal}
            className="absolute top-15 right-44 p-2 rounded-full hover:bg-opacity-75"
          >
            <Image src={"/X.svg"} alt="close icon" width={96} height={96} />
          </button>
          <div className="py-14 px-44 flex flex-col items-center">
            <div className="flex flex-row items-center mb-10">
              <div className="mx-20">
                <h1 className="text-white font-questrial text-8xl mb-6">
                  {donation.title}
                </h1>
                <h2 className="text-white font-questrial text-6xl">
                  Enviada em {new Date(donation.createdAt).toLocaleDateString()}
                </h2>
              </div>
            </div>
            {lastTracking ? (
              <h3 className="text-white font-questrial text-5xl">
                Último Escaneamento: {new Date(lastTracking.updatedAt).toLocaleDateString()} às{" "}
                {new Date(lastTracking.updatedAt).toLocaleTimeString()} em {lastTracking.localizacao}{" "}
                (Status: {lastTracking.status})
              </h3>
            ) : (
              <h3 className="text-white font-questrial text-5xl">
                Nenhum rastreamento disponível
              </h3>
            )}
          </div>
          <div className="mx-20">
            <h3 className="text-white font-questrial text-5xl mb-5">
              Histórico de entrega
            </h3>
            <div className="overflow-y-auto max-h-48 flex flex-col">
              {trackingData.length > 0 ? (
                trackingData.map((tracking) => (
                  <div key={tracking.id} className="mb-4">
                    <p className="text-white">
                      <strong>Localização:</strong> {tracking.localizacao}
                    </p>
                    <p className="text-white">
                      <strong>Status:</strong> {tracking.status}
                    </p>
                    <p className="text-white">
                      <strong>Data:</strong> {new Date(tracking.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-white">Nenhum histórico de entrega.</p>
              )}
            </div>
          </div>
          <button
            onClick={handleConfirmReceipt}
            disabled={isConfirming}
            className={`font-questrial text-darkBlue bg-white border-4 border-darkBlue rounded-3xl text-4xl py-5 px-20 w-96 fixed bottom-40 right-1/4 transition-transform transform hover:scale-110 active:scale-95 cursor-pointer ${
              isConfirming ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isConfirming ? "Confirmando..." : "Confirmar Recebimento"}
          </button>
        </div>
      </div>
    </div>
  );
}
