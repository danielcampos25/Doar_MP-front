/**
 * Componente de Rastreamento para exibir e enviar informações de rastreamento de doações.
 *
 * @module Rastreamento
 * @returns {JSX.Element} - Retorna o JSX do componente Rastreamento.
 */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

/**
 * Função principal do componente Rastreamento.
 *
 * @returns {JSX.Element} - Elemento JSX que renderiza a página de rastreamento.
 */
export default function Rastreamento() {
  /** @type {object | null} donation - Estado que armazena os dados da doação. */
  const [donation, setDonation] = useState(null);

  /** @type {boolean} loading - Estado que indica se os dados estão carregando. */
  const [loading, setLoading] = useState(true);

  /** @type {object | null} error - Estado que armazena os erros ocorridos. */
  const [error, setError] = useState(null);

  /** @type {string | null} doacaoID - Estado que armazena o ID da doação a ser rastreada. */
  const [doacaoID, setDoacaoID] = useState(null);

  const router = useRouter();

  useEffect(() => {
    /**
     * Extrai o ID da doação da URL.
     * @assert {string|null} doacaoIDFromUrl - Deve ser um string válido ou null.
     */
    const doacaoIDFromUrl = new URLSearchParams(window.location.search).get(
      "doacaoID"
    );
    setDoacaoID(doacaoIDFromUrl);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    /** @assert {string|null} doacaoID - O ID da doação deve ser fornecido antes de buscar os dados. */
    if (!doacaoID) return;

    /**
     * Função que busca os dados da doação do backend.
     *
     * @async
     * @function fetchDonationData
     * @throws {Error} - Lança um erro caso não consiga buscar os dados da doação.
     */
    const fetchDonationData = async () => {
      try {
        setLoading(true);

        /**
         * @assert {string|null} token - O token de autenticação deve estar presente.
         */
        const response = await axios.get(
          `http://localhost:3001/donations/${doacaoID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        /**
         * Define os dados da doação no estado.
         * @param {object} response.data - Dados retornados da API.
         */
        setDonation(response.data);
        console.log("response data", response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationData();
  }, [doacaoID]);

  /**
   * Função que envia o rastreamento de uma doação.
   *
   * @param {Event} event - O evento de submit do formulário.
   * @async
   * @function handleSubmit
   * @throws {Error} - Lança um erro caso o envio falhe.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /** Cria um objeto FormData para enviar os dados do formulário. */
    const formData = new FormData();
    const token = localStorage.getItem("token");

    /**
     * @assert {string} location - Localização fornecida no formulário.
     * @assert {string} status - Status fornecido no formulário.
     * @assert {File} image - Arquivo de imagem fornecido no formulário.
     */
    const location = event.target.location.value;
    const status = event.target.status.value;
    const image = event.target.image.files[0];

    formData.append("localizacao", location);
    formData.append("status", status);
    formData.append("fotoRastreamento", image);

    try {
      const response = await axios.post(
        `http://localhost:3001/tracking/donation/${doacaoID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Rastreamento enviado com sucesso:", response.data);
      alert("Rastreamento Enviado!");
    } catch (err) {
      console.error("Erro ao enviar rastreamento:", err);
      setError(err);
    }
  };

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="text-white">
        Erro ao carregar a doação: {error.message}
      </div>
    );
  }

  if (!donation) {
    return <div className="text-white">Doação não encontrada</div>;
  }

  return (
    <div className="bg-gradient-to-r from-lightBlue to-darkBlue items-center justify-center h-screen w-screen flex">
      <div className="bg-lightBlue h-3/4 w-2/3 border-8 border-white rounded-3xl">
        <Image
          src={"/X.svg"}
          alt="exit"
          height={96}
          width={96}
          className="mr-10 mt-8 absolute right-80"
        />
        <h1 className="text-white font-questrial text-8xl mt-8 ml-16">
          {donation.titulo}
        </h1>
        <h1 className="text-white font-questrial text-4xl mt-4 ml-16">
          Enviada em {new Date(donation.createdAt).toLocaleDateString()}
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6 w-full mt-16"
        >
          <div className="flex justify-start w-full h-[15%] px-12 flex-col">
            <label className="text-white font-questrial text-3xl">
              Localização Atual
            </label>
            <input
              className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
              type="text"
              name="location"
              required
            />
          </div>
          <div className="flex justify-center w-full h-[15%] px-12 flex-col">
            <label className="text-white font-questrial text-3xl">
              Andamento da Entrega
            </label>
            <input
              className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
              type="text"
              name="status"
              required
            />
          </div>
          <div className="flex justify-center w-full h-[15%] px-12 flex-col">
            <label className="text-white font-questrial text-3xl">
              Enviar Imagem
            </label>
            <input
              className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
              type="file"
              name="image"
              accept="image/*"
              required
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-white hover:bg-darkBlue text-darkBlue border-darkBlue hover:text-white hover:border-white mt-14 border-4 font-questrial py-3 px-8 rounded-full text-2xl"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
