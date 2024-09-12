"use client";
import React, { useState } from "react";
import Image from "next/image";
import X from "../../public/X.svg";
import axios from "axios";

/**
 * Interface que define os itens da doação.
 *
 * @interface Item
 * @property {string} name - Nome do item.
 * @property {number} quantity - Quantidade do item.
 */
interface Item {
  name: string;
  quantity: number;
}

/**
 * Interface que define as propriedades do modal de doação.
 *
 * @interface DonationModalProps
 * @property {boolean} isOpen - Indica se o modal está aberto.
 * @property {string} institution - Nome da instituição para a qual a doação é feita.
 * @property {number} selectedId - ID do destinatário da doação.
 * @property {() => void} onClose - Função chamada ao fechar o modal.
 */
interface DonationModalProps {
  isOpen: boolean;
  institution: string;
  selectedId: number;
  onClose: () => void;
}

/**
 * Componente do Modal de Doação.
 *
 * Exibe um modal que permite ao usuário criar uma doação para uma instituição especificada.
 *
 * @component
 * @param {DonationModalProps} props - Propriedades do componente.
 * @param {boolean} props.isOpen - Indica se o modal está aberto.
 * @param {string} props.institution - Nome da instituição para a qual a doação é feita.
 * @param {number} props.selectedId - ID do destinatário da doação.
 * @param {() => void} props.onClose - Função chamada ao fechar o modal.
 * @returns {JSX.Element} - Retorna o JSX do componente do modal de doação.
 */
export default function DonationModal({
  isOpen,
  institution,
  selectedId,
  onClose,
}: DonationModalProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  /**
   * Reseta o formulário de doação.
   *
   * Limpa os campos de título, descrição, itens e erro.
   */
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setItems([]);
    setCurrentItem("");
    setError("");
  };

  /**
   * Manipula o fechamento do modal.
   *
   * Reseta o formulário e chama a função de fechamento do modal.
   */
  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  /**
   * Manipula o envio do formulário de doação.
   *
   * Verifica se todos os campos estão preenchidos, obtém o token do usuário,
   * faz uma solicitação para criar a doação e lida com erros potenciais.
   */
  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      const userResponse = await axios.get("http://localhost:3001/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const usuarioID = userResponse.data.sub;

      if (!usuarioID) {
        setError("Não foi possível obter o ID do usuário.");
        return;
      }

      const donationData = {
        usuarioID,
        destinatarioID: selectedId,
        descricao: description,
        titulo: title,
        qtdItens: 0,
        QRCode: "aaaaaa",
        codigoRastreamento: "aaaaaaaaaa",
        entregue: false,
      };

      const response = await axios.post(
        "http://localhost:3001/donations",
        donationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(
        "Doação criada com sucesso! Você pode acessar seu qrcode em seu perfil."
      );

      resetForm();
    } catch (error) {
      console.error("Erro ao criar doação:", error);
      setError("Ocorreu um erro ao criar a doação. Tente novamente.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
        <div className="relative bg-lightBlue w-3/4 max-h-[764px] border-4 border-white rounded-2xl flex flex-col p-8 z-50 items-center overflow-y-auto">
          <button
            onClick={handleModalClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-75"
          >
            <Image src={X} alt="close icon" width={96} height={96} />
          </button>

          <h1 className="font-questrial text-7xl text-white mb-8 text-center">
            Doando para: {institution}
          </h1>
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
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
          {error && <div className="text-red-500 text-2xl mb-4">{error}</div>}
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
