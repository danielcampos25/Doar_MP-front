import Image from "next/image";

export default function Register() {
  return (
    <div className=" bg-gradient-to-r from-lightBlue to-darkBlue h-screen w-screen flex">
      <div className=" h-screen w-1/2 bg-white flex items-center flex-col">
        <h1 className=" text-lightBlue font-questrial text-8xl pt-7">
          Cadastro
        </h1>
        <div className=" bg-lightBlue h-4/5 w-4/6 mt-5 rounded-2xl flex items-center flex-col">
          <Image
            src={"/profilepic.svg"}
            alt="profile"
            height={140}
            width={140}
            className="mt-5"
          />
          <Image
            src={"/Camera.svg"}
            alt="cam"
            height={48}
            width={48}
            className=" absolute top-64 left-[31.5rem]"
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
              ></input>
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
              ></input>
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
              ></input>
            </div>

            <div className="flex justify-center w-full h-[15%] px-12 flex-col">
              <label className="text-white font-questrial text-2xl">
                Senha
              </label>
              <input
                className="w-full h-12 rounded-full px-4 text-xl mt-3"
                type="password"
                name="senha"
                required
              ></input>
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
              ></input>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-white hover:bg-darkBlue text-lightBlue font-questrial py-2 px-6 rounded-full text-xl"
              >
                Enviar
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
        <h1 className=" text-white font-questrial text-9xl ml-52 mt-16">
          do ar.com
        </h1>
      </div>
    </div>
  );
}
