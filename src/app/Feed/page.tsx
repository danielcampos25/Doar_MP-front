import Header from '../../components/Header';
import Image from "next/image";
import Search from '../../../public/Search.svg';
import Box from '../../../public/box.svg';

const Institutions = [
    { name: "Ajudar" },
    { name: "BrasilAjuda" },
    { name: "Coitados" }
];

export default function Feed() {
    return(
        <main className="min-h-screen flex flex-col bg-gradient-to-r from-lightBlue to-darkBlue items-center">
            <Header />
            <div className="flex-1 w-1/2 bg-white border-r-4 border-l-4 border-darkBlue items-center flex flex-col justify-evenly">
                <div className="w-3/4 h-14 border-4 border-darkBlue rounded-full flex items-center px-4">
                    <Image src={Search} alt="search icon" width={36} height={36} />
                    <input className="flex-grow outline-none text-darkBlue placeholder-darkBlue text-4xl px-2" placeholder="Buscar Instituição"></input>
                </div>
                <button className="bg-darkBlue w-[360px] h-[180px] flex items-center justify-center rounded-3xl transform transition-transform duration-300 hover:scale-110">
                    <h1 className="font-questrial text-8xl text-white w-[351px] h-[171px] flex items-center justify-center border-4 border-white rounded-3xl drop-shadow-2xl">Doar!</h1>
                </button>
                <Image src={Box} alt="box img" width={256} height={256} />
            </div>
        </main>
    );
}
