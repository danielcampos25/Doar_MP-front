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
