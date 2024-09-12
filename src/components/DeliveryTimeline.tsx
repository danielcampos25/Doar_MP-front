/**
 * Interface que define um item do histórico de entrega.
 *
 * @interface HistoryItem
 * @property {string} address - Endereço da entrega.
 * @property {string} date - Data da entrega.
 * @property {string} time - Hora da entrega.
 */
interface HistoryItem {
  address: string;
  date: string;
  time: string;
}

/**
 * Interface que define as propriedades do componente de linha do tempo de entrega.
 *
 * @interface DeliveryTimelineProps
 * @property {HistoryItem[]} history - Lista de itens de histórico de entrega.
 */
interface DeliveryTimelineProps {
  history: HistoryItem[];
}

/**
 * Componente de Linha do Tempo de Entrega.
 *
 * Exibe uma linha do tempo dos eventos de entrega com base em um histórico fornecido.
 *
 * @component
 * @param {DeliveryTimelineProps} props - Propriedades do componente.
 * @param {HistoryItem[]} props.history - Lista de itens de histórico de entrega.
 * @returns {JSX.Element} - Retorna o JSX do componente de linha do tempo de entrega.
 *
 * @throws {Error} - Lança erro se a propriedade `history` não for um array de objetos `HistoryItem`.
 */
const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ history }) => {
  // Verifica se o histórico é um array de objetos com as propriedades esperadas
  if (
    !Array.isArray(history) ||
    !history.every(
      (item) => "address" in item && "date" in item && "time" in item
    )
  ) {
    throw new Error(
      "Propriedade `history` deve ser um array de objetos `HistoryItem`."
    );
  }

  return (
    <div className="relative mt-10">
      {history.map((item, index) => (
        <div key={index} className="flex items-center mb-6">
          <div className="w-6 h-6 rounded-full bg-lightBlue border-4 border-white relative left-8"></div>
          <div className="ml-12">
            <p className="text-white text-xl">
              {item.date} às {item.time}
            </p>
            <p className="text-white text-lg">{item.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryTimeline;
