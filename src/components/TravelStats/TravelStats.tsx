import Image from "next/image";

const TravelStats = () => {
    const stats = [
        { value: "250M+", label: "Tickets Sold" },
        { value: "3000+", label: "Routes" },
        { value: "10M+", label: "Happy Users" },
    ];

    return (
        <section className="w-full bg-gray-50 py-16 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
                {/* Left Content */}
                <div className="flex-1 flex flex-col justify-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        All your <span className="text-green-600">travel options</span> in one place
                    </h2>

                    <p className="text-gray-600 text-base max-w-md leading-relaxed">
                        More than 1,000 trusted travel partners across trains, buses, flights, and launch, so you can focus on the journey.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-start sm:items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <p className="text-2xl sm:text-3xl font-extrabold text-green-600">
                                    {stat.value}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Illustration */}
                <div className="flex-1 relative h-[250px] md:h-[350px] w-full transition-transform duration-300 hover:scale-105">
                    <Image
                        src="/hero/tarvel.png"
                        alt="Travel Illustration"
                        fill
                        className="object-contain rounded-xl"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default TravelStats;
