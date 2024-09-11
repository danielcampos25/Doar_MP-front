'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Rastreamento() {
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doacaoID, setDoacaoID] = useState(null);

  const router = useRouter();

  useEffect(() => {

    const doacaoIDFromUrl = new URLSearchParams(window.location.search).get('doacaoID');
    setDoacaoID(doacaoIDFromUrl);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!doacaoID) return;

    const fetchDonationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/donations/${doacaoID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
          },
        });
        setDonation(response.data);
        console.log('response data', response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationData();
  }, [doacaoID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    const token = localStorage.getItem('token');
    const location = event.target.location.value;
    const status = event.target.status.value;
    const image = event.target.image.files[0];

    formData.append('localizacao', location);
    formData.append('status', status);
    formData.append('fotoRastreamento', image);

    try {
      const response = await axios.post(`http://localhost:3001/tracking/donation/${doacaoID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Rastreamento enviado com sucesso:', response.data);
      alert("Rastreamento Enviado!")

    } catch (err) {
      console.error('Erro ao enviar rastreamento:', err);
      setError(err);
    }
  };

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  if (error) {
    return <div className="text-white">Erro ao carregar a doação: {error.message}</div>;
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
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 w-full mt-16">
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
