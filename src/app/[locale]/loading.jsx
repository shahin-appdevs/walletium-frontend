import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#0A0F1E]">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/images/logo/web_logo.webp"
          alt="Walletium"
          width={180}
          height={40}
          priority
          className="h-8 w-auto dark:brightness-0 dark:invert"
        />

        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-primary-100 dark:border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 animate-spin" />
        </div>
      </div>
    </div>
  );
}
