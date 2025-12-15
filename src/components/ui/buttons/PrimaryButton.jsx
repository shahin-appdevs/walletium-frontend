import LucideIcon from "@/components/LucideIcon";
import React from "react";

const PrimaryButton = ({
  children = "Button",
  parentClass = "",
  icon = "",
  className,
  onClick,
  type = "button",
  iconSize = 20,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} group/primary-btn relative overflow-hidden rounded-xl px-5 py-2 text-white font-medium flex items-center justify-center`}
      {...props}
    >
      <span
        className={`
            absolute inset-0 w-[200%]
            bg-linear-to-r from-[#0EBE98] via-[#50C631] to-[#0EBE98]
            transform translate-x-0
            transition-transform duration-1000 ease-in-out
            group-hover/primary-btn:-translate-x-1/2
            `}
      ></span>

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <LucideIcon name={icon} size={iconSize} />}
      </span>
    </button>
  );
};

export default PrimaryButton;

// <div
//   className={`${parentClass} inline-block group/primary-btn relative  items-center justify-center overflow-hidden rounded-2xl`}
// >
//   <div className="absolute  group-hover/primary-btn:-translate-x-1/2 gap-2 bg-linear-to-r from-[#0EBE98]  via-[#50C631] to-[#0EBE98] transition-all duration-400  top-0 left-0  w-[200%] h-full"></div>
//   <button
//     onClick={onClick}
//     type={type}
//     className={`${className} flex gap-1  z-10! relative items-center! border text-white! font-medium px-5 py-2 rounded-xl  cursor-pointer`}
//     {...props}
//   >
//     <span>{children}</span>
//     <span>{icon && <LucideIcon name={icon} className="w-4 h-4" />}</span>
//   </button>
// </div>
