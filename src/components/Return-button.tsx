import Image from "next/image";
import { useRouter } from "next/router";

/**
 * Componente de botão para retornar à página anterior.
 *
 * Exibe um ícone de seta para retornar à página anterior e chama uma função de retorno
 * quando o ícone é clicado.
 *
 * @component
 * @param {Object} props - Propriedades do componente.
 * @param {Function} props.onClick - Função a ser chamada quando o botão é clicado.
 * @returns {JSX.Element} - Retorna o JSX do botão de retorno.
 */
export default function ReturnButton({ onClick }: ReturnButtonProps) {
  return (
    <Image
      src={"/go-back.svg"}
      alt="return"
      width={100}
      height={100}
      className="transition-transform transform hover:scale-110 active:scale-95 cursor-pointer self-start mt-36 mr-10"
      onClick={onClick}
    />
  );
}

/**
 * Tipagem das propriedades do componente ReturnButton.
 *
 * @typedef {Object} ReturnButtonProps
 * @property {Function} onClick - Função a ser chamada quando o botão é clicado.
 */
interface ReturnButtonProps {
  onClick: () => void;
}
