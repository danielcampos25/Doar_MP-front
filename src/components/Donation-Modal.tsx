'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import X from '../../public/X.svg';

interface Item {
    name: string;
    quantity: number;
}

interface DonationModalProps {
    isOpen: boolean;
    institution: string;
    onClose: () => void;
}

export default function DonationModal({ isOpen, institution, onClose }: DonationModalProps) {
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

    const addItem = () => {
        if (currentItem.trim() === '') return;
        setItems([...items, { name: currentItem, quantity: 1 }]);
        setCurrentItem('');
    };

    const increaseQuantity = (index: number) => {
        const newItems = [...items];
        newItems[index].quantity += 1;
        setItems(newItems);
    };

    const decreaseQuantity = (index: number) => {
        const newItems = [...items];
        if (newItems[index].quantity > 1) {
            newItems[index].quantity -= 1;
        } else {
            newItems.splice(index, 1);
        }
        setItems(newItems);
    };

    const handleSubmit = () => {
        // Verificação para garantir que o título, itens e descrição não estejam vazios
        if (title.trim() === '' || items.length === 0 || description.trim() === '') {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // Se tudo estiver preenchido, remove a mensagem de erro
        setError('');
        // Aqui você pode adicionar a lógica para enviar os dados
        console.log('Enviado com sucesso!');
    };

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
                <div className="relative bg-lightBlue w-3/4 max-h-screen border-4 border-white rounded-2xl flex flex-col p-8 z-50 items-center overflow-y-auto">
                    
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

                    {/* Título "Itens a serem doados" */}
                    <div className="flex flex-col items-center w-full mb-4">
                        <label
                            htmlFor="donation-item"
                            className="font-questrial text-4xl text-white mb-4"
                        >
                            Itens a serem doados:
                        </label>
                    </div>

                    {/* Retângulo branco para os itens e input com borda azul escuro */}
                    <div className="flex flex-col items-center w-3/4 bg-white rounded-3xl p-4 mb-8 border-4 border-darkBlue">
                        {/* Área de itens */}
                        <div className="w-full">
                            {items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center mb-4">
                                    <span className="text-darkBlue text-2xl">{item.name}</span>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => decreaseQuantity(index)}
                                            className="bg-darkBlue text-white text-2xl w-8 h-8 rounded-full"
                                        >
                                            -
                                        </button>
                                        <span className="mx-4 text-darkBlue text-2xl">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(index)}
                                            className="bg-darkBlue text-white text-2xl w-8 h-8 rounded-full"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input para adicionar novo item */}
                        <input
                            id="donation-item"
                            value={currentItem}
                            onChange={(e) => setCurrentItem(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') addItem() }}
                            className="w-full h-14 text-darkBlue text-2xl p-4 rounded-full outline-none mt-1"
                            placeholder="Adicionar item (Digite aqui)"
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
                        <input
                            id="donation-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-3/4 h-14 text-darkBlue text-2xl p-4 rounded-full border-4 border-darkBlue outline-none"
                            placeholder="Digite a descrição da doação"
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
