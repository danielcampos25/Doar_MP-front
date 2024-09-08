'use client';
import { SetStateAction, useState } from 'react';
import Header from '../../components/Header';
import DonationModal from '../../components/Donation-Modal';
import Image from "next/image";
import Search from '../../../public/Search.svg';
import Box from '../../../public/box.svg';

const Institutions = [
    { name: "Ajudar" },
    { name: "BrasilAjuda" },
    { name: "Coitados" }
].sort((a, b) => a.name.localeCompare(b.name));

export default function Feed() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInstitutions, setFilteredInstitutions] = useState(Institutions);
    const [isFocused, setIsFocused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState('');

    const handleSearchChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredInstitutions(
            Institutions.filter(inst => 
                inst.name.toLowerCase().includes(value.toLowerCase())
            )
        );
        if (!value) {
            setSelectedInstitution('');
        }
    };

    const handleInstitutionSelect = (name: SetStateAction<string>) => {
        setSearchTerm(name);
        setSelectedInstitution(name);
        setIsFocused(false);
    };

    const handleDonateClick = () => {
        if (selectedInstitution) {
            setIsModalOpen(true);
        } else {
            alert('Por favor, selecione uma instituição.');
        }
    };

    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-r from-lightBlue to-darkBlue items-center">
            <Header />
            <div className="flex-1 w-1/2 bg-white border-r-4 border-l-4 border-darkBlue items-center flex flex-col justify-evenly relative">
                <div className="relative w-3/4 z-10">
                    <div 
                        className="w-full h-14 border-4 border-darkBlue rounded-full flex items-center px-4"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    >
                        <Image src={Search} alt="search icon" width={36} height={36} />
                        <input
                            className="flex-grow outline-none text-darkBlue placeholder-darkBlue text-4xl px-2"
                            placeholder="Buscar Instituição"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setIsFocused(true)}
                        />
                    </div>
                    {isFocused && (
                        <ul className="absolute top-16 left-0 w-full bg-white border-4 border-darkBlue rounded-lg max-h-60 overflow-y-auto text-darkBlue">
                            {filteredInstitutions.length > 0 ? (
                                filteredInstitutions.map((inst, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-lightBlue cursor-pointer"
                                        onMouseDown={() => handleInstitutionSelect(inst.name)}
                                    >
                                        {inst.name}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-darkBlue">Nenhuma instituição encontrada</li>
                            )}
                        </ul>
                    )}
                </div>
                <button
                    className="bg-darkBlue w-[360px] h-[180px] flex items-center justify-center rounded-3xl transform transition-transform duration-300 hover:scale-110 z-0"
                    onClick={handleDonateClick}
                >
                    <h1 className="font-questrial text-8xl text-white w-[351px] h-[171px] flex items-center justify-center border-4 border-white rounded-3xl drop-shadow-2xl">Doar!</h1>
                </button>
                <Image src={Box} alt="box img" width={256} height={256} />
            </div>

            <DonationModal
                isOpen={isModalOpen}
                institution={selectedInstitution}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}
