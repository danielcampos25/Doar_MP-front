import logo from "../../../public/Doar.com 1.svg";
import Image from "next/image";

export default function Login() {
    return(
        <div className="h-screen flex">
            <div className="w-1/2 h-screen bg-gradient-to-r from-darkBlue to-lightBlue flex flex-col justify-center items-center">
                <Image src={logo} alt="Logo" width={400} height={400} />
                <h1 className="text-9xl text-white font-questrial">do ar.com</h1>
            </div>
            <div className="w-1/2 h-screen bg-white">

            </div>
        </div>
    );
}