import CheckIconOutline from "../icons/CheckIconOutline";
import XCircleIconOutline from "../icons/XCircleIconOutline";
import ExclamationIconOutline from "../icons/ExclamationIconOutline";
import InformationIconOutline from "../icons/InformationIconOutline";

const icons = {
  success: CheckIconOutline,
  error: XCircleIconOutline,
  warning: ExclamationIconOutline,
  info: InformationIconOutline,
};

const colors = {
  success: "text-green-500 border-green-500",
  error: "text-red-500 border-red-500",
  warning: "text-yellow-500 border-yellow-500",
  info: "text-blue-500 border-blue-500",
};

const Alert = ({
  variant = "outlined",
  severity = "info",
  children,
  onClose,
}) => {
  const Icon = icons[severity];
  const colorClass = colors[severity];

  return (
    <div
      className={`flex items-center text-lg p-4 border-l-4 ${
        variant === "outlined" ? "border" : ""
      } ${colorClass} bg-white rounded-md relative`}
    >
      <Icon className="h-6 w-6 mr-2" />
      <span>{children}</span>
      
    </div>
  );
};

export default Alert;
