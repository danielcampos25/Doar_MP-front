'use client'
import { useState, useRef } from "react";
import Image from "next/image";
import logo from "../../../public/Doar.com 1.svg";
import pfp from "../../../public/pfp.svg";

export default function Login() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="h-screen flex">
            <div className="w-1/2 h-screen bg-gradient-to-r from-darkBlue to-lightBlue flex flex-col justify-center items-center">
                <Image src={logo} alt="Logo" width={400} height={400} />
                <h1 className="text-8xl text-white font-questrial">do ar.com</h1>
            </div>
            <div className="w-1/2 h-screen bg-white flex flex-col items-center justify-center">
                <h1 className="text-lightBlue text-8xl font-questrial">Login</h1>
                <div className="bg-lightBlue flex flex-col items-center justify-center w-[546px] h-[770px] rounded-2xl">
                    <div onClick={handleImageClick} className="cursor-pointer">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-[200px] h-[200px] rounded-full object-cover" />
                        ) : (
                            <Image src={pfp} alt="pfp" width={200} height={200} />
                        )}
                    </div>
                    <h1 onClick={handleImageClick} className="font-questrial text-white text-lg cursor-pointer">Escolher foto</h1>
                    <div>
                        <h1 className="font-questrial text-white text-xl">E-mail</h1>
                        <input className="bg-white w-[460px] h-[56px] rounded-full text-darkBlue text-2xl px-2 outline-none"/>
                    </div>
                    <div>
                        <h1 className="font-questrial text-white text-xl">Senha</h1>
                        <input className="bg-white w-[460px] h-[56px] rounded-full text-darkBlue text-2xl px-2 outline-none"/>
                    </div>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
}