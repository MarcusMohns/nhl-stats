import Image from "next/image";

const Spinner = () => {
  // todo deltee or keep
  return <Image src="/spinner.svg" alt="Loading..." className="animate-spin" />;
};

export default Spinner;
