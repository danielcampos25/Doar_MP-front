"use client";

import Image from "next/image";
import ReturnButton from "@/components/Return-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Donation {
  id: number;
  estado: "recebida" | "enviada";
  tipo: string;
}

interface InstitutionProfileProps {
  donations: Donation[];
}

export default function InstitutionProfile({
  donations = [],
}: InstitutionProfileProps) {
  const [abaAtiva, setAbaAtiva] = useState<"recebida" | "enviada">("enviada");

  const filteredDonations = donations.filter(
    (donation) => donation.estado === abaAtiva
  );

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
        <div className="bg-white h-[30.3rem] w-full flex items-center flex-col pt-5">
          <Image src={"/warning.svg"} alt="warning" height={342} width={342} />
          {filteredDonations.length === 0 ? (
            abaAtiva === "recebida" ? (
              <h1 className="font-questrial text-6xl text-black pt-10">
                Você ainda não recebeu uma doação.
              </h1>
            ) : (
              <h1 className="font-questrial text-6xl text-black pt-10">
                Você ainda não fez uma doação.
              </h1>
            )
          ) : (
            <ul>
              {filteredDonations.map((donation) => (
                <li key={donation.id}>{donation.tipo}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
