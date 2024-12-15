import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {

    return (
        <div className="fixed inset-0 bg-white/80 flex justify-center items-center z-50 transition-all duration-200">
            <div className="flex flex-col items-center space-y-2">
                <Loader2 className="animate-spin text-blue-600" size={70} strokeWidth={2} />
                <span className="text-2xl font-bold text-blue-600">Loading...</span>
            </div>
        </div>
    )
};

export default Loading;
