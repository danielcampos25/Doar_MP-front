interface HistoryItem {
  address: string;
  date: string;
  time: string;
}

interface DeliveryTimelineProps {
  history: HistoryItem[];
}

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ history }) => {
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
