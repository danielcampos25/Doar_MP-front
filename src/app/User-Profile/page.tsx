import Image from "next/image";
import ReturnButton from "@/components/Return-button";

export default function UserProfile() {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-lightBlue to-darkBlue flex justify-center">
      <ReturnButton />
      <div className="w-3/5 h-screen">
        <div className="w-full h-96 bg-gradient-to-b from-lightBlue to-white flex items-center">
          <div className="px-20">
            <Image
              src={"/profile-image.svg"}
              alt="pfp"
              className="rounded-full"
              width={196}
              height={196}
            />
            <Image
              src={"/camera-icon.svg"}
              alt="icon"
              className="absolute top-60 left-[42.8rem]"
              width={48}
              height={48}
            />
          </div>
          <h1 className="font-questrial text-white text-6xl pl-20">Username</h1>
        </div>
        <div className="h-[33.8rem] bg-white flex-col flex items-center overflow-y-auto">
          <Image src={"/warning.svg"} alt="warning" width={330} height={330} />
          <h1 className="font-questrial text-black text-6xl pt-20">
            Você ainda não fez uma doação.
          </h1>
        </div>
      </div>
    </div>
  );
}
