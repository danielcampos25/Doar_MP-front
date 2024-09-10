import Image from "next/image";
import { useRef } from "react";

export default function DonationCardUser({
  donationTitle,
  onClick,
}: {
  donationTitle: string;
  onClick: () => void;
}) {
  const qrCodeRef = useRef<HTMLImageElement>(null);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const img = qrCodeRef.current;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      context?.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.png";
      link.click();
    }
  };
  return (
    <div className="w-4/5 h-40 flex items-center bg-darkBlue justify-around rounded-3xl mb-20 py-16">
      <Image
        ref={qrCodeRef}
        src={"/qrcode.svg"}
        alt="QRcode"
        height={85}
        width={85}
      />
      <button
        onClick={handleDownload}
        className="bg-lightBlue h-12 w-36 rounded-full border-[3px] border-white text-2xl transition-transform transform hover:scale-110 active:scale-95 cursor-pointer"
      >
        Imprimir
      </button>
      <h1
        className="font-questrial text-white text-6xl hover:underline cursor-pointer"
        onClick={onClick}
      >
        {donationTitle}
      </h1>
    </div>
  );
}
