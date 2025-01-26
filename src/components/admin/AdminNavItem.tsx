import { IconType } from "react-icons";

interface AdminNavItemProps {
  selected: boolean;
  icon: IconType;
  title: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
  selected,
  icon: Icon,
  title,
}) => {
  return (
    <div
      className={`flex gap-1 p-2 items-center justify-center hover:text-slate-800 border-b-2 transition cursor-pointer ${
        selected
          ? "text-slate-800 border-b-slate-800"
          : "text-slate-500 border-transparent"
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {title}
      </div>
    </div>
  );
};

export default AdminNavItem;
