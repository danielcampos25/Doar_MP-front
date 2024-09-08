import Image from "next/image";

export default function LocationModalUser({
  closeModal,
  donationTitle,
}: {
  closeModal: () => void;
  donationTitle: string;
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
                  {donationTitle}
                </h1>
                <h2 className="text-white font-questrial text-6xl">
                  Enviada em dd/mm/yy
                </h2>
              </div>
            </div>
            <h3 className="text-white font-questrial text-5xl">
              Último Escaneamento: dd/mm/yy às HH:MM
            </h3>
          </div>
          <div className="mx-20">
            <h3 className="text-white font-questrial text-5xl">
              Histórico de entrega
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
