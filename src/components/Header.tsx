import Image from 'next/image';
import Logo from '../../public/Logo.svg';
import Link from 'next/link';

const user = {
    name: "Username",
    pfp: "/pfp.svg",
};

export default function Header() {
    return (
        <div className="h-52 w-screen bg-softBlack bg-opacity-25 px-40 flex items-center justify-between">
            <div className="flex items-center">
                <Image src={Logo} alt="Logo" />
                <h1 className="font-questrial text-9xl text-white pl-10">doar.com</h1>
            </div>
            <div className="flex items-center hover:bg-opacity-10 bg-softBlack bg-opacity-0 p-4 rounded-lg">
                <Link href="/User-Profile">
                    <h1 className="font-questrial text-4xl text-white pr-10 cursor-pointer">{user.name}</h1>
                </Link>
                <Link href="/User-Profile">
                    <Image src={user.pfp} alt="user pfp" width={112} height={112} className="cursor-pointer" />
                </Link>
            </div>
        </div>
    );
}
