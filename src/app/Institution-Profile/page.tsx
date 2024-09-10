"use client";

import Image from "next/image";
import ReturnButton from "@/components/Return-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DonationCardUser from "@/components/DonationCardUser";
import LocationModalUser from "@/components/LocationModalUser";

interface Donation {
  id: number;
  estado: "recebida" | "enviada";
  title: string;
  firstAddress: string;
  finalDestination: string;
  history: { address: string; date: string; time: string }[];
}

interface InstitutionProfileProps {
  donations: Donation[];
}

export default function InstitutionProfile({
  donations = [
    {
      id: 1,
      estado: "enviada",
      title: "Doação 1",
      firstAddress: "Endereço 1",
      finalDestination: "Endereço final",
      history: [
        { address: "Endereço 1", date: "01/09/2023", time: "10:00" },
        { address: "Endereço 2", date: "02/09/2023", time: "12:30" },
        { address: "Endereço final", date: "03/09/2023", time: "14:15" },
      ],
    },
    {
      id: 2,
      estado: "recebida",
      title: "Doação 2",
      firstAddress: "Endereço A",
      finalDestination: "Endereço final",
      history: [
        { address: "Endereço A", date: "01/09/2023", time: "10:00" },
        { address: "Endereço B", date: "02/09/2023", time: "12:30" },
        { address: "Endereço C", date: "03/09/2023", time: "14:15" },
      ],
    },
    {
      id: 3,
      estado: "enviada",
      title: "Doação 3",
      firstAddress: "Endereço 1",
      finalDestination: "Endereço final",
      history: [
        { address: "Endereço 1", date: "01/09/2023", time: "10:00" },
        { address: "Endereço 2", date: "02/09/2023", time: "12:30" },
        { address: "Endereço 3", date: "03/09/2023", time: "14:15" },
        { address: "Endereço 4", date: "06/09/2023", time: "15:49" },
      ],
    },
    {
      id: 4,
      estado: "recebida",
      title: "Receba",
      firstAddress: "xique xique BA",
      finalDestination: "BSB",
      history: [
        { address: "BSB", date: "15/05/2024", time: "09:00" },
        { address: "Goiânia", date: "24/05/2024", time: "10:30" },
        { address: "fds", date: "26/07/2024", time: "15:47" },
      ],
    },
  ],
}: InstitutionProfileProps) {
  const [abaAtiva, setAbaAtiva] = useState<"recebida" | "enviada">("enviada");

  const filteredDonations = donations.filter(
    (donation) => donation.estado === abaAtiva
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDonation, setSelectedDonation] = useState<null | Donation>(
    null
  );

  const openModal = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDonation(null);
  };

  const router = useRouter();

  const handleReturnClick = () => {
    router.push("/Feed");
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-lightBlue to-darkBlue flex justify-center">
      <ReturnButton onClick={handleReturnClick} />
      <div className="w-3/5 h-screen">
        <div className="w-full h-96 bg-gradient-to-b from-lightBlue to-white flex items-center">
          <div className="px-20">
            <Image
              src={"/profile-image.svg"}
              alt="pfp"
              className="rounded-full"
              width={196}
              height={196}
            />
          </div>
          <h1 className="font-questrial text-white text-6xl pl-20">
            Instituição
          </h1>
        </div>
        <div className="bg-white w-full h-14 flex justify-around">
          <button
            onClick={() => setAbaAtiva("enviada")}
            className="focus:outline-none"
          >
            <h1
              className={`font-questrial text-darkBlue text-4xl cursor-pointer ${
                abaAtiva === "enviada" ? "underline" : ""
              } hover:underline`}
            >
              Enviadas
            </h1>
          </button>
          <button
            className={abaAtiva === "recebida" ? "underline" : ""}
            onClick={() => setAbaAtiva("recebida")}
          >
            <h1
              className={`font-questrial text-darkBlue text-4xl cursor-pointer ${
                abaAtiva === "recebida" ? "underline" : ""
              } hover:underline`}
            >
              Recebidas
            </h1>
          </button>
        </div>
        <div className="h-[30.33rem] bg-white flex-col flex items-center overflow-y-auto">
          {filteredDonations.length > 0 ? (
            filteredDonations.map((donation) => (
              <DonationCardUser
                key={donation.id}
                donationTitle={donation.title}
                onClick={() => openModal(donation)}
              />
            ))
          ) : abaAtiva === "recebida" ? (
            <>
              <Image
                src={"/warning.svg"}
                alt="warning"
                width={330}
                height={330}
              />
              <h1 className="font-questrial text-black text-6xl pt-20">
                Você ainda não recebeu uma doação.
              </h1>
            </>
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
