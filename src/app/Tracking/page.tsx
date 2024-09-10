import Image from "next/image";

export default function Register() {
  return (
    <div className="bg-gradient-to-r from-lightBlue to-darkBlue items-center justify-center h-screen w-screen flex">
      <div className=" bg-lightBlue h-3/4 w-2/3 border-8 border-white rounded-3xl">
        <Image
          src={"/X.svg"}
          alt="exit"
          height={96}
          width={96}
          className="mr-10 mt-8 absolute right-80"
        />
        <h1 className="text-white font-questrial text-8xl mt-8 ml-16">
          Doação 1
        </h1>
        <h1 className="text-white font-questrial text-4xl mt-4 ml-16">
          Enviada em dd/mm/yy
        </h1>
        <form action="/submit" method="POST" className="space-y-6 w-full mt-16">
          <div className="flex justify-start w-full h-[15%] px-12 flex-col">
            <label className="text-white font-questrial text-3xl">
              Localização Atual
            </label>
            <input
              className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
              type="text"
              name="location"
              required
            />
          </div>
          <div className="flex justify-center w-full h-[15%] px-12 flex-col">
            <label className="text-white font-questrial text-3xl">
              Andamento da Entrega
            </label>
            <input
              className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
              type="text"
              name=""
              required
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-white hover:bg-darkBlue text-darkBlue border-darkBlue hover:text-white hover:border-white mt-14 border-4 font-questrial py-3 px-8 rounded-full text-2xl"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
