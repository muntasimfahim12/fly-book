import Image from "next/image";

const Iata = () => {
    return (
        <div className="flex justify-center items-center py-8">
            <div
                className="
          relative w-44 h-44 md:w-44 md:h-44
          rounded-2xl
          bg-white
          flex items-center justify-center
        "
            >
                <Image
                    src="/hero/iata-logo.png"
                    alt="IATA Accredited Travel Agency"
                    fill
                    className="object-contain p-6"
                    priority
                />
            </div>
        </div>
    );
};

export default Iata;
