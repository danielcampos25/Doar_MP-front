"use client"; // Add this line at the top of your file

import { useState } from "react";
import Image from "next/image";

export default function Register() {
  // State to track the profile image
  const [profileImage, setProfileImage] = useState("/profilepic.svg");

  // State to track if the password is visible or not
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="bg-gradient-to-r from-lightBlue to-darkBlue h-screen w-screen flex">
      <div className="h-screen w-1/2 bg-white flex items-center flex-col">
        <h1 className="text-lightBlue font-questrial text-8xl pt-7">
          Cadastro
        </h1>
        <div className="bg-lightBlue h-4/5 w-4/6 mt-5 rounded-2xl flex items-center flex-col overflow-hidden">
          <div className="relative w-32 h-32 mt-5 rounded-full overflow-hidden">
            <label
              htmlFor="file-upload"
              className="rounded-full top-2 right-2 cursor-pointer"
            >
              <Image
                src={profileImage}
                alt="fill"
                objectFit="cover"
                height={140}
                width={140}
              />
            </label>
          </div>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <form action="/submit" method="POST" className="space-y-6 w-full">
            <div className="flex justify-start w-full h-[15%] px-12 flex-col">
              <label className="text-white font-questrial text-2xl">
                Nome Completo
              </label>
              <input
                className="w-full h-12 rounded-full px-4 text-xl mt-3"
                type="text"
                name="nomeCompleto"
                required
              />
            </div>
            <div className="flex justify-center w-full h-[15%] px-12 flex-col">
              <label className="text-white font-questrial text-2xl">
                Endereço
              </label>
              <input
                className="w-full h-12 rounded-full px-4 text-xl mt-3"
                type="text"
                name="endereco"
                required
              />
            </div>
            <div className="flex justify-center w-full h-[15%] px-12 flex-col">
              <label className="text-white font-questrial text-2xl">
                E-mail
              </label>
              <input
                className="w-full h-12 rounded-full px-4 text-xl mt-3"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="relative flex justify-center w-full h-[15%] px-12 flex-col">
              <label className="text-white font-questrial text-2xl">
                Senha
              </label>
              <div className="relative w-full mt-3">
                <input
                  className="w-full h-12 rounded-full px-4 text-xl"
                  type={passwordVisible ? "text" : "password"}
                  name="senha"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-darkBlue text-xl"
                >
                  {passwordVisible ? (
                    <Image
                      src="/hide.png"
                      alt="Hide password"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/show.png"
                      alt="Show password"
                      width={24}
                      height={24}
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <label
                htmlFor="item1"
                className="mr-4 text-white font-questrial text-[1.65rem]"
              >
                Sou uma instituição
              </label>
              <input
                type="checkbox"
                id="item1"
                name="instituicao"
                className="w-10 h-10 text-lightBlue bg-darkBlue rounded focus:ring-white font-questrial"
              />
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-white hover:bg-darkBlue text-lightBlue font-questrial py-2 px-6 rounded-full text-xl"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Image
          src={"/Doar.com 1.svg"}
          alt="logo"
          height={400}
          width={400}
          className="ml-72 mt-36"
        />
        <h1 className="text-white font-questrial text-9xl ml-52 mt-16">
          do ar.com
        </h1>
      </div>
    </div>
  );
}
