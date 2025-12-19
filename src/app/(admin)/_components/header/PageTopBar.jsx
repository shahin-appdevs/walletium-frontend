import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Link from "next/link";
const PageTopBar = ({
  title,
  buttonTitle,
  onChange,
  onClick,
  icon,
  href = "/",
}) => {
  return (
    <div className="md:flex justify-center md:justify-between items-center space-y-4 md:space-y-0 py-3 md:py-4 ">
      {title && (
        <div>
          <h3 className="text-2xl font-medium">{title}</h3>
        </div>
      )}
      <div className="flex justify-center md:justify-start">
        {buttonTitle && (
          <Link href={href}>
            <PrimaryButton icon={icon} size="large" onClick={onClick}>
              {buttonTitle}
            </PrimaryButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageTopBar;
