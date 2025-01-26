interface NullDataProps {
  title: string;
}
const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className="w-full h-[50vh] text-xl md:text-2xl flex items-center justify-center">
      <p className="font-medium">{title}</p>
    </div>
  );
};

export default NullData;
