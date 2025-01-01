import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative bg-[url('/bg.jpg')] bg-no-repeat bg-cover bg-center w-full mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col md:flex-row gap-2 items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
            Summer Sale
          </h1>
          <p className="text-lg  md:text-xl text-slate-600 mb-2">
            Enjoy discounts on selected items
          </p>
          <p className="text-2xl md:text-5xl text-[#c7812b] font-bold">
            GET 50% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            alt="banner-image"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
