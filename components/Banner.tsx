import Image from "next/image";

export default function Banner() {
    return (
        <div className="w-full h-20 bg-gradient-to-tr from-[#12999f] to-[#47b2b7] flex items-center px-6 py-4 gap-4">
            <Image
                src="/favicon_white.png"
                alt="ShelterConnect Logo"
                width={60}
                height={60}
                className="w-[60px] h-auto max-w-[80px] object-contain"
                priority
            />
            <h1 className="text-white text-2xl font-semibold">ShelterConnect</h1>
        </div>
    );
}
