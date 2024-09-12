import Image from "next/image";
import { useRef } from "react";

/**
 * Componente que representa um cartão de doação para o usuário.
 *
 * Exibe um cartão com título da doação, um QR Code e um botão para imprimir o QR Code.
 *
 * @component
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.donationTitle - Título da doação exibido no cartão.
 * @param {string} props.qrCodeUrl - URL do QR Code a ser exibido.
 * @param {() => void} props.onClick - Função chamada ao clicar no título da doação.
 * @param {boolean} props.entregue - Indica se a doação foi entregue.
 * @returns {JSX.Element} - Retorna o JSX do cartão de doação.
 */
export default function DonationCardUser({
  donationTitle,
  qrCodeUrl,
  onClick,
  entregue,
}: {
  donationTitle: string;
  qrCodeUrl: string;
  onClick: () => void;
  entregue: boolean;
}) {
  /**
   * Função para carregar a imagem do QR Code com base na URL fornecida.
   *
   * @param {Object} param0 - Objeto com a propriedade `src`.
   * @param {string} param0.src - URL da imagem.
   * @returns {string} - URL completa da imagem.
   */
  const myLoader = ({ src }: { src: string }) => {
    console.log(src);
    if (src.startsWith("http")) {
      return src;
    }
    return `http://localhost:3001/uploads/upload-qrcode/${src}`;
  };

  const qrCodeRef = useRef<HTMLImageElement>(null);

  /**
   * Manipula o download do QR Code ao clicar no botão.
   *
   * Abre uma nova janela com o QR Code e inicia a impressão.
   */
  const handleDownload = () => {
    if (qrCodeRef.current) {
      const img = qrCodeRef.current;
      const imgUrl = img.src;

      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(
          `<img src="${imgUrl}" style="width:25%;height:auto;">`
        );
        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
      }
    }
  };

  return (
    <div
      className={`w-4/5 h-40 flex items-center justify-around rounded-3xl mb-20 py-16 ${
        entregue ? "bg-green-500" : "bg-darkBlue"
      }`}
    >
      <div className="relative h-[85px] w-[85px]">
        <Image
          ref={qrCodeRef as React.LegacyRef<HTMLImageElement>}
          loader={myLoader}
          src={qrCodeUrl}
          alt="QR Code"
          fill
          style={{ objectFit: "contain" }}
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
