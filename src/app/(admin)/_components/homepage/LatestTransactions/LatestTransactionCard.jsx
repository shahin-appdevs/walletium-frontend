import React from "react";

const LatestTransactionCard = () => {
  return (
    <div>
      <h2>Card</h2>
    </div>
  );
};

export default LatestTransactionCard;

// import { useState } from "react";

// export default function LatestTransactionCard() {
//   const [showChild, setShowChild] = useState(false);

//   return (
//     <div
//       onClick={() => setShowChild(!showChild)}
//       className="w-full  cursor-pointer  mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6 md:p-8 transition-colors"
//     >
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-700/30 flex items-center justify-center">
//             <span className="text-teal-600 dark:text-teal-300 text-3xl">$</span>
//           </div>

//           <div>
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
//               Send Money to{" "}
//               <span className="text-orange-500 dark:text-orange-400">
//                 testusr2
//               </span>
//             </h2>

//             <div className="flex items-center gap-2 mt-1">
//               <span className="w-2 h-2 rounded-full bg-green-500"></span>
//               <p className="text-green-600 dark:text-green-400 font-medium">
//                 Success
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="text-left md:text-right">
//           <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
//             4.55 USD
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             500.00 BDT
//           </p>
//         </div>
//       </div>

//       {/* Details */}
//       <div
//         className={`mt-8 space-y-3 -translate-y-full duration-400 ${
//           showChild ? " translate-y-0" : ""
//         }`}
//       >
//         {[
//           { label: "Transaction ID", value: "SM87658186", icon: "৳" },
//           { label: "Exchange Rate", value: "1 BDT = 0.01 USD", icon: "⇄" },
//           { label: "Fees & Charge", value: "120.00 BDT", icon: "💳" },
//           { label: "Date", value: "2025-12-04 06:04:14", icon: "🕒" },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="bg-gray-100 dark:bg-gray-800 transition-colors rounded-xl p-4 flex items-center justify-between"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full border border-teal-500 dark:border-teal-400 flex items-center justify-center">
//                 <span className="text-teal-600 dark:text-teal-300 text-lg">
//                   {item.icon}
//                 </span>
//               </div>
//               <p className="text-gray-700 dark:text-gray-300 font-medium">
//                 {item.label}
//               </p>
//             </div>

//             <p className="text-gray-700 dark:text-gray-100 font-semibold">
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
