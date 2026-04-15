export default function CashbackCard() {
  return (
    <div className="w-full bg-[#022D25] rounded-2xl p-6 lg:p-8 text-white">
      {/* Text */}
      <h2 className="text-2xl font-semibold leading-snug">
        Get 10% Cash Back <br /> on Your next transaction
      </h2>

      {/* Button */}
      <button className="mt-4 bg-white/10 text-white px-4 py-1.5 rounded-lg text-sm">
        Transfer Money
      </button>

      {/* Slider Dots */}
      <div className="flex items-center gap-2  mt-5">
        <span className="w-2 h-2 rounded-full bg-white/40"></span>
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
        <span className="w-2 h-2 rounded-full bg-white/40"></span>
      </div>
    </div>
  );
}
