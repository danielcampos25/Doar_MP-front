interface HistoryItem {
  address: string;
  date: string;
  time: string;
}

interface DeliveryTimelineProps {
  history: HistoryItem[];
  finalDestination: string;
}

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({
  history,
  finalDestination,
}) => {
  const isCompleted = history[history.length - 1].address === finalDestination;

  return (
    <div className="relative mt-10">
      <div className="absolute left-10 top-5 h-full w-1 bg-gray-300"></div>
      {history.map((item, index) => (
        <div key={index} className="flex items-center mb-6">
          <div
            className={`w-6 h-6 rounded-full ${
              index === history.length - 1 && isCompleted
                ? "bg-darkBlue"
                : "bg-lightBlue"
            } border-4 border-white relative left-8`}
          ></div>
          <div className="ml-12">
            <p className="text-white text-xl">
              {item.date} às {item.time}
            </p>
            <p className="text-white text-lg">{item.address}</p>
          </div>
        </div>
      ))}
      {isCompleted && (
        <div className="absolute left-10 top-0 h-full w-1 bg-darkBlue"></div>
      )}
    </div>
  );
};

export default DeliveryTimeline;
