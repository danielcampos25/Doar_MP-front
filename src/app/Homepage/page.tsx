import Image from "next/image";

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-lightBlue to-darkBlue">
      <header className="fixed top-0 w-full h-[204px] bg-softBlack bg-opacity-25 flex items-center">
        <div className="ml-40">
          <Image
            src="/Doar-logo.svg"
            alt="Doar logo"
            width={102}
            height={102}
          />
        </div>
        <h1 className="font-questrial text-7xl ml-10">do ar.com</h1>
        <div className="ml-auto mr-40">
          <button className="font-questrial text-2xl w-[170px] h-[77px] border-4 border-white rounded-full text-white">
            Entrar
          </button>
        </div>
      </header>

      <main className="mt-[204px] mb-20 flex-grow flex items-center justify-between px-40">
        <div className="text-white font-questrial text-7xl max-w-[650px] max-h-[592px]">
          <p>Doar nunca foi tão fácil e seguro.</p>
        </div>

        <div className="relative w-[500px] h-[600px] mt-5 mr-4">
          <div className="absolute top-0 right-0">
            <Image src="/Map-homepage.svg" alt="Map" width={381} height={418} />
          </div>
          <div className=" absolute right-0 bottom-4">
            <Image src="/Box-homepage.svg" alt="Box" width={153} height={164} />
          </div>
          <div className="absolute bottom-16 left-0">
            <Image
              src="/Truck-homepage.svg"
              alt="Truck"
              width={332}
              height={325}
            />
          </div>
        </div>
      </main>

      <section className="py-20 bg-gradient-to-r from-lightBlue to-darkBlue">
        <div className="text-left ml-40 mt-20 text-white font-questrial text-4xl mb-8">
          <p>Acompanhe nossas estatísticas!</p>
        </div>
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-40 text-white">
          <div className="p-8 rounded-lg shadow-lg text-center border-4 border-white">
            <h3 className="text-2xl font-bold mb-4">Doadores Cadastrados</h3>
            <p className="text-4xl">1.456.999</p>
          </div>
          <div className="p-8 rounded-lg shadow-lg text-center border-4 border-white">
            <h3 className="text-2xl font-bold mb-4">
              Instituições Cadastradas
            </h3>
            <p className="text-4xl">2.000</p>
          </div>
          <div className="p-8 rounded-lg shadow-lg text-center border-4 border-white">
            <h3 className="text-2xl font-bold mb-4">Doações Entregues</h3>
            <p className="text-4xl">20.895.661</p>
          </div>
          <div className="p-8 rounded-lg shadow-lg text-center border-4 border-white">
            <h3 className="text-2xl font-bold mb-4">Doações em Andamento</h3>
            <p className="text-4xl">12.345.987</p>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 w-full h-[102px] bg-softGray bg-opacity-50 flex items-center">
        <h2 className="font-questrial text-2xl ml-36 text-softBlack">
          do_ar2024@gmail.com
        </h2>

        <div className="flex ml-auto mr-40 space-x-8">
          <Image
            src="/Whatsapp-logo.svg"
            alt="Whatsapp logo"
            width={61}
            height={61}
          />
          <Image
            src="/Facebook-logo.svg"
            alt="Facebook logo"
            width={61}
            height={61}
          />
          <Image
            src="/Instagram-logo.svg"
            alt="Instagram logo"
            width={61}
            height={61}
          />
        </div>
      </footer>
    </div>
  );
}
