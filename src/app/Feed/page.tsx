"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../components/Header";
import DonationModal from "../../components/Donation-Modal";
import Image from "next/image";
import Search from "../../../public/Search.svg";
import Box from "../../../public/box.svg";

/**
 * Componente principal da tela de Feed de Instituições.
 *
 * @component
 */
export default function Feed() {
  const [searchTerm, setSearchTerm] =
    useState(""); /**< Estado para termo de busca. */
  const [filteredInstitutions, setFilteredInstitutions] = useState(
    []
  ); /**< Estado para lista de instituições filtradas. */
  const [isFocused, setIsFocused] =
    useState(false); /**< Estado para controle de foco no input de busca. */
  const [isModalOpen, setIsModalOpen] =
    useState(false); /**< Estado para controlar a abertura do modal. */
  const [selectedInstitution, setSelectedInstitution] = useState({
    name: "",
    id: null,
  }); /**< Estado para a instituição selecionada. */
  const router = useRouter();

  /**
   * Hook para buscar instituições na API ao carregar o componente.
   * Verifica se o token está presente e redireciona para login se não estiver.
   *
   * @returns {void}
   */
  useEffect(() => {
    const fetchInstitutions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/Login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/instituicoes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const institutions = response.data.map(
          (inst: { id: number; razaoSocial: string }) => ({
            institutionId: inst.id,
            name: inst.razaoSocial,
          })
        );
        setFilteredInstitutions(institutions);
      } catch (error) {
        console.error("Error fetching institutions:", error);
        if (error.response && error.response.status === 401) {
          router.push("/Login");
        }
      }
    };

    fetchInstitutions();
  }, [router]);

  /**
   * Manipula mudanças no campo de busca e atualiza a lista de instituições filtradas.
   *
   * @param {Object} e - Evento de mudança.
   * @returns {void}
   *
   * @pre O valor `e.target.value` deve ser uma string.
   * @post O estado `filteredInstitutions` será atualizado com base no termo de busca.
   */
  const handleSearchChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredInstitutions(
      filteredInstitutions.filter((inst) =>
        inst.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    if (!value) {
      setSelectedInstitution({ name: "", id: null });
    }
  };

  /**
   * Seleciona uma instituição com base no nome e atualiza o estado.
   *
   * @param {string} name - Nome da instituição selecionada.
   * @returns {void}
   *
   * @pre O nome deve ser uma string existente na lista de instituições filtradas.
   * @post O estado `selectedInstitution` será atualizado.
   */
  const handleInstitutionSelect = (name: string) => {
    const institution = filteredInstitutions.find((inst) => inst.name === name);
    setSearchTerm(name);
    setSelectedInstitution({
      name,
      id: institution ? institution.institutionId : null,
    });
    setIsFocused(false);
  };

  /**
   * Abre o modal de doação se uma instituição estiver selecionada.
   * Caso contrário, alerta o usuário.
   *
   * @returns {void}
   *
   * @pre Uma instituição deve estar selecionada.
   * @post O modal de doação será aberto se uma instituição for selecionada.
   */
  const handleDonateClick = () => {
    if (selectedInstitution.id !== null) {
      setIsModalOpen(true);
    } else {
      alert("Por favor, selecione uma instituição.");
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
                <li className="px-4 py-2 text-darkBlue">
                  Nenhuma instituição encontrada
                </li>
              )}
            </ul>
          )}
        </div>
        <button
          className="bg-darkBlue w-[360px] h-[180px] flex items-center justify-center rounded-3xl transform transition-transform duration-300 hover:scale-110 z-0"
          onClick={handleDonateClick}
        >
          <h1 className="font-questrial text-8xl text-white w-[351px] h-[171px] flex items-center justify-center border-4 border-white rounded-3xl drop-shadow-2xl">
            Doar!
          </h1>
        </button>
        <Image src={Box} alt="box img" width={256} height={256} />
      </div>

      <DonationModal
        isOpen={isModalOpen}
        institution={selectedInstitution.name}
        selectedId={selectedInstitution.id}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
