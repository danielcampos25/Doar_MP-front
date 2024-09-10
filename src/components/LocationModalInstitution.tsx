import Image from "next/image";
import DeliveryTimeline from "./DeliveryTimeline";

export default function LocationModalInstitution({
  closeModal,
  donation,
}: {
  closeModal: () => void;
  donation: {
    title: string;
    history: { address: string; date: string; time: string }[];
    finalDestination: string;
  };
}) {
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
              <Image
                src={"/qrcode.svg"}
                alt="QRcode"
                height={240}
                width={240}
              />
              <div className="mx-20">
                <h1 className="text-white font-questrial text-8xl mb-6">
                  {donation.title}
                </h1>
                <h2 className="text-white font-questrial text-6xl">
                  Enviada em {donation.history[0].date}
                </h2>
              </div>
            </div>
            <h3 className="text-white font-questrial text-5xl">
              Último Escaneamento:{" "}
              {donation.history[donation.history.length - 1].date} às{" "}
              {donation.history[donation.history.length - 1].time}
            </h3>
          </div>
          <div className="mx-20">
            <h3 className="text-white font-questrial text-5xl mb-5">
              Histórico de entrega
            </h3>
            <div className="overflow-y-auto max-h-48 flex">
              <DeliveryTimeline history={donation.history} />
              <button className="font-questrial text-darkBlue bg-white border-4 border-darkBlue rounded-3xl text-4xl py-5 px-20 w-96 fixed bottom-40 right-1/4 transition-transform transform hover:scale-110 active:scale-95 cursor-pointer">
                Confirmar Recebimento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
