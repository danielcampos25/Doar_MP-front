import Image from "next/image";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-lightBlue to-darkBlue">
      <header className="w-full h-[204px] bg-softBlack bg-opacity-25 flex items-center">
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

      <main className="flex-grow flex items-center justify-between px-40">
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

      <footer className="absolute bottom-0 w-full h-[102px] bg-softGray bg-opacity-50 flex items-center">
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
