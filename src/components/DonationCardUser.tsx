import Image from "next/image";
import { useRef } from "react";

export default function DonationCardUser({
  donationTitle,
  qrCodeUrl,
  onClick,
}: {
  donationTitle: string;
  qrCodeUrl: string;
  onClick: () => void;
}) {
  // Função de loader ajustada para evitar duplicação de caminho
  const myLoader = ({ src }: { src: string }) => {
    // Verifica se o src já tem o caminho completo
    if (src.startsWith("http")) {
      return src; // Retorna o caminho completo se já estiver presente
    }
    // Caso contrário, concatena o caminho base
    return `http://localhost:3001/uploads/upload-qrcode/${src}`;
  };

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
      <div className="relative h-[85px] w-[85px]">
        <Image
          ref={qrCodeRef as React.LegacyRef<HTMLImageElement>} // Corrige o tipo de ref para Next.js
          loader={myLoader}  // Passa a função de loader
          src={qrCodeUrl}  // Certifique-se de que o src é apenas o nome do arquivo ou o caminho relativo
          alt="QR Code"
          fill  // Preenche a div pai, garantindo o layout responsivo
          style={{ objectFit: "contain" }}  // Garante que a imagem do QR Code mantenha a proporção
        />
      </div>
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
