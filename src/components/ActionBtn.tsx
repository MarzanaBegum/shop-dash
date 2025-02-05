import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center w-[40px] h-[30px] border border-slate-400 text-slate-700 rounded cursor-pointer ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
    >
      <Icon size={18} />
    </button>
  );
};

export default ActionBtn;
