import Image from "next/image";

export default function ReturnButton() {
  return (
    <Image
      src={"/go-back.svg"}
      alt="return"
      width={100}
      height={100}
      className="transition-transform transform hover:scale-110 active:scale-95 cursor-pointer self-start mt-36 mr-10"
    />
  );
}
