import * as Icons from "lucide-react";

export default function LucideIcon({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
  ...props
}) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Lucide icon "${name}" does not exist.`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
