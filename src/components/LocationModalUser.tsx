// EU05: "Eu como usuário quero acompanhar o status da minha doação"

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

/**
 * Componente de modal para exibir informações de rastreamento de uma doação para um usuário.
 *
 * Exibe os detalhes da doação e o histórico de rastreamento. Se a doação estiver entregue,
 * uma mensagem de confirmação será exibida. Caso contrário, o rastreamento da doação será mostrado.
 *
 * @component
 * @param {Object} props - Propriedades do componente.
 * @param {Object} props.donation - Dados da doação.
 * @param {number} props.donation.id - ID da doação.
 * @param {string} props.donation.title - Título da doação.
 * @param {boolean} props.donation.entregue - Indicador se a doação foi entregue.
 * @param {Function} props.closeModal - Função para fechar o modal.
 * @returns {JSX.Element} - Retorna o JSX do modal de rastreamento.
 */
export default function LocationModalUser({
  donation,
  closeModal,
}: {
  donation: { id: number; title: string; entregue: boolean };
  closeModal: () => void;
}) {
  const [trackingData, setTrackingData] = useState<
    { id: number; localizacao: string; status: string; createdAt: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  /**
   * Efeito colateral que busca os dados de rastreamento da doação quando o componente é montado.
   *
   * Obtém o token do armazenamento local e faz uma solicitação para obter os dados de rastreamento.
   * Atualiza o estado com os dados de rastreamento ou lida com erros.
   */
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
            <h2 className="text-2xl mb-4">
              Rastreamento da Doação: {donation.title}
            </h2>

            {trackingData.length > 0 ? (
              trackingData.map((tracking) => (
                <div key={tracking.id} className="mb-4">
                  <p>
                    <strong>Localização:</strong> {tracking.localizacao}
                  </p>
                  <p>
                    <strong>Status:</strong> {tracking.status}
                  </p>
                  <p>
                    <strong>Data:</strong>{" "}
                    {new Date(tracking.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>Nenhum rastreamento disponível para esta doação.</p>
            )}
          </>
        )}
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
