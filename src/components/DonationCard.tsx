import Image from "next/image";

export default function DonationCard({ donationId }: { donationId: number }) {
  return (
    <div className="w-4/5 h-40 flex items-center bg-darkBlue justify-around rounded-3xl mb-20">
      <Image src={"/qrcode.svg"} alt="QRcode" height={85} width={85} />
      <button className="bg-lightBlue h-12 w-36 rounded-full border-[3px] border-white text-2xl transition-transform transform hover:scale-110 active:scale-95 cursor-pointer">
        Imprimir
      </button>
      <h1 className="font-questrial text-white text-6xl">
        Doação {donationId}
      </h1>
    </div>
  );
}
