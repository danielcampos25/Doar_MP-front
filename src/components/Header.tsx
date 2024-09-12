import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * Componente de cabeçalho para a aplicação.
 *
 * Exibe o logo da aplicação, o nome do usuário e a foto de perfil.
 * O conteúdo exibido depende do papel do usuário (instituição ou usuário).
 *
 * @component
 * @returns {JSX.Element} - Retorna o JSX do cabeçalho.
 */
export default function Header() {
  const [user, setUser] = useState<{ name: string; pfp: string; role: string }>(
    {
      name: "",
      pfp: "/pfp.svg",
      role: "",
    }
  );
  const router = useRouter();

  /**
   * Função para carregar a imagem do perfil com base na URL fornecida.
   *
   * @param {Object} param0 - Objeto com a propriedade `src`.
   * @param {string} param0.src - URL da imagem.
   * @returns {string} - URL completa da imagem.
   */
  const myLoader = ({ src }: { src: string }) => {
    if (src.startsWith("http") || src.startsWith("/")) {
      return src;
    }
    return `http://localhost:3001/uploads/upload-user-photo/${src}`;
  };

  /**
   * Efeito colateral que busca os dados do usuário quando o componente é montado.
   *
   * Obtém o token do armazenamento local e faz uma solicitação para obter as informações do usuário.
   * Dependendo do papel do usuário, busca dados específicos e atualiza o estado.
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await axios.get("http://localhost:3001/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = response.data.sub;
        const role = response.data.role;

        let realUserData;
        if (role === "user") {
          const response2 = await axios.get(
            `http://localhost:3001/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          realUserData = response2.data;

          const cleanedPhotoPath = realUserData.fotoPerfil.replace(
            /^.*[\\\/]/,
            ""
          );
          setUser({
            name: realUserData.nome,
            pfp: cleanedPhotoPath
              ? `http://localhost:3001/uploads/upload-user-photo/${cleanedPhotoPath}`
              : "/pfp.svg",
            role: "user",
          });
        } else {
          const response3 = await axios.get(
            `http://localhost:3001/instituicoes/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          realUserData = response3.data;

          const cleanedPhotoPath = realUserData.fotoPerfil.replace(
            /^.*[\\\/]/,
            ""
          );
          setUser({
            name: realUserData.razaoSocial,
            pfp: cleanedPhotoPath
              ? `http://localhost:3001/uploads/upload-institution-photo/${cleanedPhotoPath}`
              : "/pfp.svg",
            role: "institution",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/Login");
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div className="h-52 w-screen bg-softBlack bg-opacity-25 px-40 flex items-center justify-between">
      <div className="flex items-center">
        <Image src={Logo} alt="Logo" />
        <h1 className="font-questrial text-9xl text-white pl-10">doar.com</h1>
      </div>
      <div className="flex items-center hover:bg-opacity-10 bg-softBlack bg-opacity-0 p-4 rounded-lg">
        <Link
          href={
            user.role === "institution"
              ? "/Institution-Profile"
              : "/User-Profile"
          }
        >
          <h1 className="font-questrial text-4xl text-white pr-10 cursor-pointer">
            {user.name || "Loading..."}
          </h1>
        </Link>
        <Link
          href={
            user.role === "institution"
              ? "/Institution-Profile"
              : "/User-Profile"
          }
        >
          <Image
            loader={myLoader}
            src={user.pfp}
            alt="user pfp"
            width={160}
            height={160}
            className="cursor-pointer rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
