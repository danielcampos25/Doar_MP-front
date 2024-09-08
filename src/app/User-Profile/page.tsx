"use client";

import Image from "next/image";
import ReturnButton from "@/components/Return-button";
import DonationCardUser from "@/components/DonationCardUser";
import LocationModalUser from "@/components/LocationModalUser";
import { useState } from "react";
import { useRouter } from "next/navigation";

const donations = [
  {
    id: 1,
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
];

export default function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedDonation, setSelectedDonation] = useState<null | {
    id: number;
    title: string;
    history: { address: string; date: string; time: string }[];
    finalDestination: string;
  }>(null);

  const openModal = (donation: {
    id: number;
    title: string;
    history: { address: string; date: string; time: string }[];
    finalDestination: string;
  }) => {
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
          <h1 className="font-questrial text-white text-6xl pl-20">Username</h1>
        </div>
        <div className="h-[33.8rem] bg-white flex-col flex items-center overflow-y-auto">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <DonationCardUser
                key={donation.id}
                donationTitle={donation.title}
                onClick={() => openModal(donation)}
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
