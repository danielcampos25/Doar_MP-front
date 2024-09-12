// EU04: "Eu como usuário quero visualizar minhas doações"
// EU05: "Eu como usuário quero acompanhar o status da minha doação"
// EU06: "Eu como usuário quero ter um o qrcode das minhas doações"
// EU07: "Eu como usuário quero visualizar e imprimir um o qrcode das minhas doações"

/**
 * Componente de Perfil do Usuário.
 *
 * @module UserProfile
 * @returns {JSX.Element} - Retorna o JSX do componente de perfil de usuário.
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import ReturnButton from "@/components/Return-button";
import DonationCardUser from "@/components/DonationCardUser";
import LocationModalUser from "@/components/LocationModalUser";

/**
 * Função principal do componente de perfil do usuário.
 *
 * @returns {JSX.Element} - JSX do componente de perfil de usuário.
 */
export default function UserProfile() {
  /** @type {{ name: string, pfp: string }} - Estado que armazena os dados do usuário. */
  const [user, setUser] = useState<{ name: string; pfp: string }>({
    name: "",
    pfp: "/pfp.svg",
  });

  /** @type {boolean} - Estado que indica se a página está carregando. */
  const [loading, setLoading] = useState(true);

  /** @type {boolean} - Estado que controla a abertura do modal de localização. */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * @type {null | { id: number, title: string, history: { address: string, date: string, time: string }[], finalDestination: string }}
   * - Estado que armazena a doação selecionada para exibir no modal.
   */
  const [selectedDonation, setSelectedDonation] = useState<null | {
    id: number;
    title: string;
    history: { address: string; date: string; time: string }[];
    finalDestination: string;
  }>(null);

  /** @type {Array} - Estado que armazena as doações do usuário. */
  const [donations, setDonations] = useState([]);

  const { id } = useParams();
  const router = useRouter();

  /**
   * Função que gera a URL da imagem de perfil.
   *
   * @function myLoader
   * @param {object} src - O caminho da imagem.
   * @returns {string} - Retorna a URL completa da imagem.
   */
  const myLoader = ({ src }: { src: string }) => {
    if (src.startsWith("http") || src.startsWith("/")) {
      return src;
    }
    return `http://localhost:3001/uploads/upload-user-photo/${encodeURIComponent(
      src
    )}`;
  };

  /**
   * Hook de efeito para buscar dados do usuário e suas doações ao montar o componente.
   *
   * @async
   * @function fetchUserData
   * @throws {Error} - Lança erro se o usuário não estiver autenticado ou ocorrer falha no fetch.
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/Login");
          return;
        }

        const response = await axios.get("http://localhost:3001/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userId = response.data.sub;
        const response2 = await axios.get(
          `http://localhost:3001/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const realUserData = response2.data;

        const cleanedPhotoPath = realUserData.fotoPerfil.replace(
          /^.*[\\\/]/,
          ""
        );

        setUser({
          name: realUserData.nome,
          pfp: cleanedPhotoPath
            ? `http://localhost:3001/uploads/upload-user-photo/${cleanedPhotoPath}`
            : "/pfp.svg",
        });

        const donationResponse = await axios.get(
          `http://localhost:3001/donations/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDonations(donationResponse.data);
      } catch (err) {
        router.push("/Login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, router]);

  /**
   * Abre o modal de localização para a doação selecionada.
   *
   * @function openModal
   * @param {object} donation - Objeto contendo informações da doação selecionada.
   * @param {number} donation.id - ID da doação.
   * @param {string} donation.title - Título da doação.
   * @param {object[]} donation.history - Histórico de endereços da doação.
   * @param {string} donation.finalDestination - Destino final da doação.
   * @assert {number} donation.id - O ID da doação deve ser um número válido.
   * @assert {string} donation.title - O título da doação deve ser uma string válida.
   */
  const openModal = (donation: {
    id: number;
    title: string;
    history: { address: string; date: string; time: string }[];
    finalDestination: string;
  }) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  /**
   * Fecha o modal de localização.
   *
   * @function closeModal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-lightBlue to-darkBlue flex justify-center">
      <ReturnButton onClick={() => router.push("/Feed")} />
      <div className="w-3/5 h-screen">
        <div className="w-full h-96 bg-gradient-to-b from-lightBlue to-white flex items-center">
          <div className="px-20">
            <Image
              loader={myLoader}
              src={user.pfp}
              alt="user pfp"
              className="rounded-full"
              width={196}
              height={196}
            />
          </div>
          <h1 className="font-questrial text-white text-6xl pl-20">
            {user.name}
          </h1>
        </div>
        <div className="h-[33.8rem] bg-white flex-col flex items-center overflow-y-auto">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <DonationCardUser
                key={donation.id}
                donationTitle={donation.titulo}
                qrCodeUrl={`http://localhost:3001${donation.QRCode}`}
                onClick={() => openModal(donation)}
                entregue={donation.entregue}
              />
            ))
          ) : (
            <>
              <Image
                src={"/warning.svg"}
                alt="warning"
                width={330}
                height={330}
              />
              <h1 className="font-questrial text-black text-6xl pt-20">
                Você ainda não fez uma doação.
              </h1>
            </>
          )}
        </div>
      </div>
      {isModalOpen && selectedDonation && (
        <LocationModalUser
          closeModal={closeModal}
          donation={selectedDonation}
        />
      )}
    </div>
  );
}
