interface FooterListProps {
  children: React.ReactNode;
}
const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 gap-2">
      {children}
    </div>
  );
};

export default FooterList;
