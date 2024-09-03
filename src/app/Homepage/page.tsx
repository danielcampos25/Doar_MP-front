import Image from "next/image";

export default function Homepage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-lightBlue to-darkBlue">
            <header className="w-full h-[204px] bg-softBlack bg-opacity-25 flex items-center">

                <div className="ml-40">
                    <Image src="/Doar-logo.svg" alt="Doar logo" width={102} height={102} />
                </div>

                <h1 className="font-questrial text-7xl ml-10">do ar.com</h1>

                <div className="ml-auto mr-40">
                    <button className="font-questrial text-2xl w-[170px] h-[77px] border-4 border-white rounded-full text-white">Entrar</button>
                </div>
            </header>
        </div>
    );
}
