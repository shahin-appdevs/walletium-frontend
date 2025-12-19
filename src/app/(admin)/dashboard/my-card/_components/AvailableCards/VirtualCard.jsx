import Image from "next/image";

export default function VirtualCard() {
  return (
    <div className="relative w-full md:w-[380px]  rounded-2xl border border-primary-300/40 dark:border-primary-800 bg-primary-50 dark:bg-primary-900 p-6 overflow-hidden">
      {/* Decorative gradient circle */}
      {/* <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-green-100 opacity-40" /> */}
      <div className="absolute top-0 left-0 h-full w-full rounded-2xl bg-primary-800 opacity-5" />
      <div className="absolute top-0 left-0 scale-120 bg-[url('/images/partials/card-bg.png')] bg-cover bg-center opacity-30 h-full w-full"></div>

      {/* Content */}
      <div className="relative z-10 space-y-2 md:space-y-4 ">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white font-bold text-xl">
            E
          </div> */}

          <Image
            src={"/images/logo/logo.png"}
            alt="Logo"
            height={50}
            width={50}
          />
          {/* <Tag color="red" className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500 inline-block" />
            <span> CLOSED</span>
          </Tag> */}
          <p className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
            <span className="text-green-600 font-medium"> OPEN</span>
          </p>
        </div>

        <div>
          {/* Card number */}
          <div className="text-base md:text-lg tracking-widest text-gray-800 font-medium dark:text-neutral-50">
            4288 36****** 7964
          </div>

          {/* Name */}
          <div className="text-sm text-neutral-600 dark:text-neutral-300 uppercase">
            MD ROKON
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
            0.00 <span className="text-sm">USD</span>
          </div>

          {/* <div>
            <Image
              src={"/images/logo/visa.png"}
              alt="Visa logo"
              height={0}
              width={100}
              className="w-[50px]"
            />
          </div> */}
          <div>
            <Image
              src={"/images/logo/master.svg"}
              alt="Visa logo"
              height={0}
              width={100}
              className="w-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
