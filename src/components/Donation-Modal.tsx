'use client';
import React from 'react';
import Image from 'next/image';
import X from '../../public/X.svg';

interface DonationModalProps {
    isOpen: boolean;
    institution: string;
    onClose: () => void;
}

export default function DonationModal({ isOpen, institution, onClose }: DonationModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="relative bg-lightBlue w-3/4 h-3/4 border-4 border-white rounded-2xl flex flex-col p-8 z-50">
                    
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-75"
                    >
                        <Image src={X} alt="close icon" width={96} height={96} />
                    </button>

                    <h1 className="font-questrial text-7xl text-white mb-8 text-center">
                        Doando para: {institution}
                    </h1>

                    <div className="flex flex-col items-center mb-8">
                        <label
                            htmlFor="donation-title"
                            className="font-questrial text-4xl text-white mb-4"
                        >
                            Título da Doação:
                        </label>
                        <input
                            id="donation-title"
                            className="w-3/4 h-14 text-darkBlue text-3xl p-4 rounded-full border-4 border-darkBlue outline-none"
                            placeholder="Digite o título da doação"
                        />
                    </div>

                    <button
                        onClick={() => {/* Add the donation logic here */}}
                        className="mt-auto bg-white text-darkBlue font-questrial text-4xl px-8 py-4 rounded-full self-center border-darkBlue border-4"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </>
    );
}
