import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
      <div className="animate-pulse flex flex-col items-center space-y-2">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
