"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import ReturnButton from '@/components/Return-button';
import DonationCardUser from '@/components/DonationCardUser';
import LocationModalInstitution from '@/components/LocationModalInstitution';

export default function InstitutionProfile() {
    const [institution, setInstitution] = useState<{ name: string; pfp: string }>({
        name: '',
        pfp: '/pfp.svg',
    });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState<null | {
        id: number;
        title: string;
        history: { address: string; date: string; time: string }[];
        finalDestination: string;
    }>(null);
    const [donations, setDonations] = useState([]);

    const router = useRouter();

    const myLoader = ({ src }: { src: string }) => {

        if (src.startsWith('http') || src.startsWith('/')) {
            return src;
        }
        return `http://localhost:3001/uploads/upload-institution-photo/${encodeURIComponent(src)}`;
    };

    useEffect(() => {
        const fetchInstitutionData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/Login');
                    return;
                }

                const response = await axios.get('http://localhost:3001/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const institutionId = response.data.sub;
                const institutionResponse = await axios.get(`http://localhost:3001/instituicoes/${institutionId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const institutionData = institutionResponse.data;

                const cleanedPhotoPath = institutionData.fotoPerfil.replace(/^.*[\\\/]/, '');

                setInstitution({
                    name: institutionData.razaoSocial,
                    pfp: cleanedPhotoPath ? `http://localhost:3001/uploads/upload-institution-photo/${cleanedPhotoPath}` : '/pfp.svg',
                });

                const donationResponse = await axios.get(`http://localhost:3001/instituicoes/${institutionId}/doacoes`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const pendingDonations = donationResponse.data.filter((donation: any) => !donation.entregue);

                setDonations(pendingDonations);
            } catch (err) {
                router.push('/Login');
            } finally {
                setLoading(false);
            }
        };

        fetchInstitutionData();
    }, [router]);

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
                            src={institution.pfp}
                            alt="institution pfp"
                            className="rounded-full"
                            width={196}
                            height={196}
                        />
                    </div>
                    <h1 className="font-questrial text-white text-6xl pl-20">
                        {institution.name}
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
                                Você ainda não recebeu uma doação.
                            </h1>
                        </>
                    )}
                </div>
            </div>
            {isModalOpen && selectedDonation && (
                <LocationModalInstitution
                    closeModal={closeModal}
                    donation={selectedDonation}
                />
            )}
        </div>
    );
}
