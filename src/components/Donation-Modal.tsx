'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import X from '../../public/X.svg';
import axios from 'axios';

interface Item {
    name: string;
    quantity: number;
}

interface DonationModalProps {
    isOpen: boolean;
    institution: string;
    selectedId: number; // Recebe o ID da instituição
    onClose: () => void;
}

export default function DonationModal({ isOpen, institution, selectedId, onClose }: DonationModalProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [currentItem, setCurrentItem] = useState<string>('');
    const [title, setTitle] = useState<string>(''); // Estado para armazenar o título
    const [description, setDescription] = useState<string>(''); // Estado para armazenar a descrição
    const [error, setError] = useState<string>(''); // Estado para armazenar a mensagem de erro

    // Função para resetar o formulário quando o modal for fechado
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setItems([]);
        setCurrentItem('');
        setError(''); // Limpar a mensagem de erro
    };

    const handleModalClose = () => {
        resetForm();  // Reseta o formulário ao fechar o modal
        onClose();    // Fecha o modal
    };

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (title.trim() === '' || description.trim() === '') {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        setError('');
    
        const token = localStorage.getItem('token');
        console.log('Token:', token);
    
        if (!token) {
            setError('Usuário não autenticado.');
            return;
        }
    
        try {
            // Obter o ID do usuário autenticado
            const userResponse = await axios.get('http://localhost:3001/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('User Response:', userResponse.data);
            const usuarioID = userResponse.data.sub;
            console.log('User ID:', usuarioID)
    
            if (!usuarioID) {
                setError('Não foi possível obter o ID do usuário.');
                return;
            }

            console.log(selectedId)
  
            const donationData = {
                usuarioID,
                destinatarioID: selectedId,
                descricao: description,
                titulo: title,
                qtdItens: 0,
                QRCode: 'aaaaaa', // Aqui você pode gerar o QRCode posteriormente
                codigoRastreamento: 'aaaaaaaaaa', // Implementar lógica de rastreamento
                entregue: false,
            };
    
            // Enviar os dados para o backend
            const response = await axios.post('http://localhost:3001/donations', donationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Doação criada com sucesso:', response.data);
            alert('Doação criada com sucesso! Você pode acessar seu qrcode em seu perfil.')
    
            // Limpar o formulário após o sucesso
            resetForm();
            // Exibir QR code em um toast ou realizar outra ação aqui
        } catch (error) {
            console.error('Erro ao criar doação:', error);
            setError('Ocorreu um erro ao criar a doação. Tente novamente.');
        }
    };
    
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
                <div className="relative bg-lightBlue w-3/4 max-h-[764px] border-4 border-white rounded-2xl flex flex-col p-8 z-50 items-center overflow-y-auto">
                    
                    {/* Botão de Fechar */}
                    <button
                        onClick={handleModalClose} // Chama a função que reseta o formulário e fecha o modal
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-75"
                    >
                        <Image src={X} alt="close icon" width={96} height={96} />
                    </button>

                    <h1 className="font-questrial text-7xl text-white mb-8 text-center">
                        Doando para: {institution}
                    </h1>

                    {/* Título da Doação */}
                    <div className="flex flex-col items-center w-full mb-8">
                        <label
                            htmlFor="donation-title"
                            className="font-questrial text-4xl text-white mb-4"
                        >
                            Título da Doação:
                        </label>
                        <input
                            id="donation-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-3/4 h-14 text-darkBlue text-3xl p-4 rounded-full border-4 border-darkBlue outline-none"
                            placeholder="Digite o título da doação"
                        />
                    </div>

                    {/* Campo de Descrição */}
                    <div className="flex flex-col items-center w-full mb-8">
                        <label
                            htmlFor="donation-description"
                            className="font-questrial text-4xl text-white mb-4"
                        >
                            Descrição:
                        </label>
                        <textarea
                            id="donation-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-3/4 text-darkBlue text-2xl p-4 rounded-2xl border-4 border-darkBlue outline-none resize-none"
                            placeholder="Descreva os itens a serem doados. Você não poderá alterar isso futuramente."
                            rows={1} // Set initial height
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto'; // Reset height
                                target.style.height = `${target.scrollHeight}px`; // Adjust height based on content
                            }}
                        />
                    </div>

                    {/* Exibir mensagem de erro, se houver */}
                    {error && (
                        <div className="text-red-500 text-2xl mb-4">
                            {error}
                        </div>
                    )}

                    {/* Botão Enviar */}
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-white text-darkBlue font-questrial text-4xl px-8 py-4 rounded-full border-darkBlue border-4"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </>
    );
}
