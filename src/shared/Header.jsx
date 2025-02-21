import { useShift } from "@/context/ShiftContext";
import Image from "next/image";

const Header = ({onClick}) => {
  const shift = useShift();

  const logo = "/images/logo.png";
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className=" grid grid-cols-2 bg-[url('/images/drinks.webp')] bg-center bg-cover bg-no-repeat pb-8 border-4 border-black shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px]">
      <Image src={logo} alt="logo" className="w-[420px] max-h-[180px] md:w-[300px] lg:w-[350px] xl:w-[420px]" width={400} height={400} onClick={onClick}/>
      <p className="text-white flex items-center text-center font-sourceSerif font-bold text-xl relative grid-area-[date] text-shadow-header md:justify-end md:text-2xl md:pr-12 lg:text-3xl xl:text-4xl">
        {currentDate} {shift}
      </p>
      <h1 className="text-white font-sourceSerif font-bold text-xl m-0 col-span-2 text-center text-shadow-header md:mt-4 md:text-3xl lg:text-5xl xl:text-6xl">
        Daily Verification of Responsible <br />
        Service of Alcohol Policy.
      </h1>
    </header>
  );
};

export default Header;
