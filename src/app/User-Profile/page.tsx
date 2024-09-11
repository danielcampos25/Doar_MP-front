"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import ReturnButton from '@/components/Return-button';
import DonationCardUser from '@/components/DonationCardUser';
import LocationModalUser from '@/components/LocationModalUser';

export default function UserProfile() {
    const [user, setUser] = useState<{ name: string; pfp: string }>({
        name: '',
        pfp: '/pfp.svg', // Default image while loading
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

    const { id } = useParams(); // Captures the ID from the URL
    const router = useRouter();

    const myLoader = ({ src }: { src: string }) => {
        // If the src starts with 'http' or '/' assume it's an external or local path, otherwise construct the full URL
        if (src.startsWith('http') || src.startsWith('/')) {
            return src;
        }
        return `http://localhost:3001/uploads/upload-user-photo/${encodeURIComponent(src)}`;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/Login');
                    return;
                }

                const response = await axios.get('http://localhost:3001/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userId = response.data.sub;
                const response2 = await axios.get(`http://localhost:3001/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const realUserData = response2.data;

                // Clean the photo path to ensure it's in the correct format
                const cleanedPhotoPath = realUserData.fotoPerfil.replace(/^.*[\\\/]/, '');

                setUser({
                    name: realUserData.nome,
                    pfp: cleanedPhotoPath ? `http://localhost:3001/uploads/upload-user-photo/${cleanedPhotoPath}` : '/pfp.svg',
                });

                // Fetch donations
                const donationResponse = await axios.get(`http://localhost:3001/donations/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setDonations(donationResponse.data); // Set the donations fetched from the backend
            } catch (err) {
                router.push('/Login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, router]);

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
                            loader={myLoader} // Use custom loader
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
                                qrCodeUrl={`http://localhost:3001${donation.QRCode}`} // URL of the QR Code
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
